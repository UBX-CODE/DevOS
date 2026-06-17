import { z } from "zod";

export const createTaskSchema =
  z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    projectId: z.string(),
    status: z.enum(["TODO","IN_PROGRESS","DONE",]).optional(),
    priority: z.enum(["LOW","MEDIUM","HIGH","CRITICAL",]).optional(),
  });