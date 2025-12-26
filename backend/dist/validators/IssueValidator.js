"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIssueSchema = void 0;
const zod_1 = require("zod");
exports.createIssueSchema = zod_1.z.object({
    type: zod_1.z.enum(["Cloud Security", "Red Team Assessment", "VAPT"]),
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().min(5),
    priority: zod_1.z.enum(["low", "medium", "high"]).optional(),
    status: zod_1.z.enum(["open", "in-progress", "resolved", "closed"]).optional(),
});
