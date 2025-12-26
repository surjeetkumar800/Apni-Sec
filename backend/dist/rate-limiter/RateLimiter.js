"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
class RateLimiter {
    constructor(maxRequests, windowMs) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.store = new Map();
    }
    check(key) {
        const now = Date.now();
        const entry = this.store.get(key);
        if (!entry || now > entry.resetTime) {
            const resetTime = now + this.windowMs;
            this.store.set(key, { count: 1, resetTime });
            return {
                allowed: true,
                remaining: this.maxRequests - 1,
                resetTime,
            };
        }
        if (entry.count >= this.maxRequests) {
            return {
                allowed: false,
                remaining: 0,
                resetTime: entry.resetTime,
            };
        }
        entry.count += 1;
        this.store.set(key, entry);
        return {
            allowed: true,
            remaining: this.maxRequests - entry.count,
            resetTime: entry.resetTime,
        };
    }
}
exports.RateLimiter = RateLimiter;
