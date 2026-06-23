import {Router} from "express";

import { getLeetcodeProfile } from "../controllers/leetcode.controller"
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router();

router.get("/profile", authMiddleware, getLeetcodeProfile);

export default router;