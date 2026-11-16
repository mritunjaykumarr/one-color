import { guard, cleanEmail, cleanText, json, HttpError } from "../../../../lib/security";
import { connectDB, dbConfigured } from "../../../../lib/db";
import Subscriber from "../../../../models/Subscriber";
import { getProduct } from "../../../../data/products";

const SOURCES = new Set(["footer", "home", "blog", "notify"]);

export async function POST(req) {
  try {
    const body = await guard(req, "subscribe", { limit: 5, windowMs: 60_000 });
    const email = cleanEmail(body.email);
    if (!email) throw new HttpError(400, "Please enter a valid email address.");
    const source = SOURCES.has(body.source) ? body.source : "footer";
    const slug = cleanText(body.product, 80);
    const product = source === "notify" && getProduct(slug) ? slug : null;

    if (!dbConfigured()) {
      if (process.env.NODE_ENV === "production") throw new HttpError(503, "Sign-ups are briefly unavailable. Please try again soon.");
      return json(200, { ok: true });
    }
    await connectDB();
    await Subscriber.updateOne({ email, product }, { $setOnInsert: { email, source, product } }, { upsert: true });
    return json(200, { ok: true });
  } catch (err) {
    if (err instanceof HttpError) return err.status === 200 ? json(200, { ok: true }) : json(err.status, { error: err.message });
    console.error("subscribe failed", err?.code || err?.name);
    return json(500, { error: "Something went wrong. Please try again." });
  }
}
