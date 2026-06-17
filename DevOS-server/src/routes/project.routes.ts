import {Router} from "express";

import {createProject,getMyProjects,getProjectById,updateProject,deleteProject} from "../controllers/project.controller"
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router();

router.post("/",authMiddleware,createProject);
router.get("/",authMiddleware,getMyProjects);
router.get("/:id",authMiddleware,getProjectById);
router.put("/:id",authMiddleware,updateProject);
router.delete("/:id",authMiddleware,deleteProject);

export default router;