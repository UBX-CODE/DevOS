import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {getGithubProfile, getGithubRepos} from "../controllers/github.controller";

const router = Router();

router.get("/profile", authMiddleware, getGithubProfile);
router.get("/repos", authMiddleware, getGithubRepos);

export default router;