"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const RateLimiter_1 = require("../rate-limiter/RateLimiter");
const limiter = new RateLimiter_1.RateLimiter(100, 15 * 60 * 1000); // 100 req / 15 min
const rateLimitMiddleware = (req, res, next) => {
    const key = req.ip || "unknown";
    const result = limiter.check(key);
    res.setHeader("X-RateLimit-Limit", "100");
    res.setHeader("X-RateLimit-Remaining", result.remaining.toString());
    res.setHeader("X-RateLimit-Reset", Math.floor(result.resetTime / 1000).toString());
    if (!result.allowed) {
        return res.status(429).json({
            success: false,
            message: "Too many requests. Please try again later.",
        });
    }
    next();
};
exports.rateLimitMiddleware = rateLimitMiddleware;
