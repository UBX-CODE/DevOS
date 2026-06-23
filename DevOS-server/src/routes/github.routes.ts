import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {getGithubProfile} from "../controllers/github.controller";

const router = Router();

router.get("/profile", authMiddleware, getGithubProfile);

export default router;