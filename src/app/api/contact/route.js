import { guard, cleanEmail, cleanText, json, HttpError } from "../../../../lib/security";
import { connectDB, dbConfigured } from "../../../../lib/db";
import ContactMessage from "../../../../models/ContactMessage";

const TOPICS = new Set(["order", "shade", "product", "returns", "other"]);
const PHONE_RE = /^[+\d][\d\s-]{6,18}$/;

export async function POST(req) {
  try {
    const body = await guard(req, "contact", { limit: 3, windowMs: 10 * 60_000 });
    const name = cleanText(body.name, 80);
    const email = cleanEmail(body.email);
    const phoneRaw = cleanText(body.phone, 20);
    const message = cleanText(body.message, 2000);
    const topic = TOPICS.has(body.topic) ? body.topic : "other";
    const orderId = cleanText(body.orderId, 30).replace(/[^A-Za-z0-9#-]/g, "");

    const errors = {};
    if (name.length < 2) errors.name = "Please tell us your name.";
    if (!email) errors.email = "Please enter a valid email.";
    if (phoneRaw && !PHONE_RE.test(phoneRaw)) errors.phone = "Please enter a valid phone number.";
    if (message.length < 10) errors.message = "Please add a little more detail (10+ characters).";
    if (Object.keys(errors).length) return json(400, { error: "Please check the highlighted fields.", fields: errors });

    if (!dbConfigured()) {
      if (process.env.NODE_ENV === "production") throw new HttpError(503, "Our inbox is briefly unavailable. Please email us directly.");
      return json(200, { ok: true });
    }
    await connectDB();
    await ContactMessage.create({ name, email, phone: phoneRaw, topic, orderId, message });
    return json(200, { ok: true });
  } catch (err) {
    if (err instanceof HttpError) return err.status === 200 ? json(200, { ok: true }) : json(err.status, { error: err.message });
    console.error("contact failed", err?.code || err?.name);
    return json(500, { error: "Something went wrong. Please try again." });
  }
}
