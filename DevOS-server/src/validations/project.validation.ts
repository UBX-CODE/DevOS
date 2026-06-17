import {z} from "zod";

export const createProjectSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    status:z.enum([
        "PLANNED",
        "IN_PROGRESS",
        "COMPLETED",
    ]).optional(),
    priority:z.enum([
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL"
    ]).optional(),
    githubUrl:z.string().optional(),
    liveUrl: z.string().optional(),
});