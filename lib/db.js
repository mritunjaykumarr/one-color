import mongoose from "mongoose";

/* Cached Mongoose connection (survives hot reloads and warm serverless instances). */
const cached = globalThis.__ocMongo || (globalThis.__ocMongo = { conn: null, promise: null });

export function dbConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectDB() {
  if (!dbConfigured()) return null;
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
        sanitizeFilter: true,
      })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
