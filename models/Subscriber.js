import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 254 },
    source: { type: String, enum: ["footer", "home", "blog", "notify"], default: "footer" },
    // for "notify me" on coming-soon shades
    product: { type: String, maxlength: 80, default: null },
    consentAt: { type: Date, default: Date.now },
  },
  { timestamps: true, strict: "throw" }
);

// one newsletter row per email, plus one "notify me" row per email + shade
SubscriberSchema.index({ email: 1, product: 1 }, { unique: true });

export default mongoose.models.Subscriber || mongoose.model("Subscriber", SubscriberSchema);
