import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 254 },
    phone: { type: String, trim: true, maxlength: 20, default: "" },
    topic: { type: String, enum: ["order", "shade", "product", "returns", "other"], default: "other" },
    orderId: { type: String, trim: true, maxlength: 30, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: { type: String, enum: ["new", "open", "closed"], default: "new" },
  },
  { timestamps: true, strict: "throw" }
);

export default mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactMessageSchema);
