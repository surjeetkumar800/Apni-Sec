import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db";
import { rateLimitMiddleware } from "./middlewares/RateLimitMiddleware";

import authRoutes from "./routes/auth.routes";
import issueRoutes from "./routes/issue.routes";
import userRoutes from "./routes/user.routes";
import dashboardRoutes from "./routes/dashboard.routes";

import { env } from "./config/env";

const app = express();

/* ================= ALLOWED ORIGINS ================= */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://apni-sec.vercel.app",
  "https://apni-sec-w75x.vercel.app",
  "https://apni-sec-2.onrender.com"
];

/* ================= MIDDLEWARES ================= */
app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server / Postman / curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimitMiddleware);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to ApniSec Backend 🚀",
    status: "Server is running",
    version: "1.0.0",
    environment: env.NODE_ENV,
  });
});

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ================= SERVER START ================= */
const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
}

startServer();
