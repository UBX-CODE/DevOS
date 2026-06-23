"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().min(10),
    status: zod_1.z.enum([
        "PLANNED",
        "IN_PROGRESS",
        "COMPLETED",
    ]).optional(),
    priority: zod_1.z.enum([
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL"
    ]).optional(),
    githubUrl: zod_1.z.string().optional(),
    liveUrl: zod_1.z.string().optional(),
});
