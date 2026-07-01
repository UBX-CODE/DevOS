import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
    createWorkflow,
    getWorkflow,
    updateWorkflow,
    deleteWorkflow,
} from "../controllers/workflow.controller";

const router = Router();

router.post("/", authMiddleware, createWorkflow);

router.get("/:projectId", authMiddleware, getWorkflow);

router.put("/:id", authMiddleware, updateWorkflow);

router.delete("/:id", authMiddleware, deleteWorkflow);

export default router;