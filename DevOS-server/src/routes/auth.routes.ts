import { Router } from "express";
import { registerUser, loginUser, updateProfile ,getProfile} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", authMiddleware, updateProfile);
router.get("/me", authMiddleware, getProfile);

export default router;