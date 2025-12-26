import { Request, Response, NextFunction } from "express";
import { RateLimiter } from "../rate-limiter/RateLimiter";

const limiter = new RateLimiter(100, 15 * 60 * 1000); // 100 req / 15 min

export const rateLimitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.ip || "unknown";

  const result = limiter.check(key);

  res.setHeader("X-RateLimit-Limit", "100");
  res.setHeader("X-RateLimit-Remaining", result.remaining.toString());
  res.setHeader(
    "X-RateLimit-Reset",
    Math.floor(result.resetTime / 1000).toString()
  );

  if (!result.allowed) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  }

  next();
};
