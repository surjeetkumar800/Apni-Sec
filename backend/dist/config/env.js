"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(process.cwd(), ".env"),
});
function required(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`❌ Environment variable ${key} is missing`);
    }
    return value;
}
exports.env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    DATABASE_URL: required("DATABASE_URL"),
    JWT_SECRET: required("JWT_SECRET"),
    JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN || "1d"),
    CLIENT_URL: required("CLIENT_URL"), // ✅ ADD THIS
    RESEND_API_KEY: required("RESEND_API_KEY"),
    FROM_EMAIL: required("FROM_EMAIL"),
};
