"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const RateLimitMiddleware_1 = require("./middlewares/RateLimitMiddleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const issue_routes_1 = __importDefault(require("./routes/issue.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const env_1 = require("./config/env");
const app = (0, express_1.default)();
/* ================= MIDDLEWARES ================= */
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// 🔥 Global rate limiter
app.use(RateLimitMiddleware_1.rateLimitMiddleware);
/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to ApniSec Backend 🚀",
        status: "Server is running",
        version: "1.0.0",
        environment: env_1.env.NODE_ENV,
    });
});
/* ================= ROUTES ================= */
app.use("/api/auth", auth_routes_1.default);
app.use("/api/issues", issue_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
/* ================= SERVER START ================= */
const PORT = Number(process.env.PORT) || 5000;
async function startServer() {
    try {
        await (0, db_1.connectDB)(); // ✅ FIX HERE
        app.listen(PORT, () => {
            console.log(`🚀 Backend running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server", error);
        process.exit(1);
    }
}
startServer();
