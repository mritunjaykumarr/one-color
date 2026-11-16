/*
  Request hardening for public form endpoints.
  - same-origin check (blocks cross-site form posts / CSRF)
  - JSON-only, size-capped bodies
  - per-IP sliding-window rate limit (per instance; put Vercel WAF rate limiting in front in production)
  - strict field validation, no HTML ever stored or echoed
*/

const buckets = new Map();
const MAX_BODY = 8 * 1024;

export function clientIp(req) {
  const fwd = req.headers.get("x-forwarded-for") || "";
  return (fwd.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim().slice(0, 64);
}

export function rateLimit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return true;
}

export function sameOrigin(req) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function readJson(req) {
  const type = req.headers.get("content-type") || "";
  if (!type.includes("application/json")) throw new HttpError(415, "Unsupported content type.");
  const len = Number(req.headers.get("content-length") || 0);
  if (len > MAX_BODY) throw new HttpError(413, "Request too large.");
  const text = await req.text();
  if (text.length > MAX_BODY) throw new HttpError(413, "Request too large.");
  try {
    const data = JSON.parse(text);
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error();
    return data;
  } catch {
    throw new HttpError(400, "Invalid request.");
  }
}

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

export function cleanText(v, max) {
  if (typeof v !== "string") return "";
  // strip control chars and angle brackets; we never render stored input as HTML
  return v.replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export function cleanEmail(v) {
  const e = typeof v === "string" ? v.trim().toLowerCase().slice(0, 254) : "";
  return EMAIL_RE.test(e) ? e : null;
}

export function json(status, body) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/* Common guard: origin + rate limit + honeypot. Returns parsed body or throws HttpError. */
export async function guard(req, scope, limits) {
  if (!sameOrigin(req)) throw new HttpError(403, "Forbidden.");
  if (!rateLimit(`${scope}:${clientIp(req)}`, limits)) throw new HttpError(429, "Too many requests. Please try again in a minute.");
  const body = await readJson(req);
  if (typeof body.company === "string" && body.company.length > 0) {
    // honeypot tripped — pretend success so bots learn nothing
    throw new HttpError(200, "ok");
  }
  return body;
}
