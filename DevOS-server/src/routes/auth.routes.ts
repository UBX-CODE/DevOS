import { Router } from "express";
import { registerUser, loginUser, updateProfile } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", authMiddleware, updateProfile);
router.get("/me", authMiddleware, (req, res) => {
    res.json({
        user: req.user,
    });
});

export default router;