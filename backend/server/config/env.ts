import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Environment variable ${key} is missing`);
  }
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  DATABASE_URL: required("DATABASE_URL"),

  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN || "1d") as string | number,

  CLIENT_URL: required("CLIENT_URL"), // ✅ ADD THIS

  RESEND_API_KEY: required("RESEND_API_KEY"),
  FROM_EMAIL: required("FROM_EMAIL"),
} as const;
