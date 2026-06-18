import { Router } from "express";
import {createTask,getProjectTask,getMyTasks,updateTask,deleteTask} from "../controllers/task.controller";
import {authMiddleware,} from "../middleware/auth.middleware";

const router = Router();

router.post("/",authMiddleware,createTask);
router.get("/:projectId/tasks",authMiddleware,getProjectTask);
router.get("/",authMiddleware,getMyTasks);
router.patch("/:id",authMiddleware,updateTask);
router.delete("/:id",authMiddleware,deleteTask);


export default router;