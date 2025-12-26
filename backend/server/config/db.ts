import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
}
