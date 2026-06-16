import {Router} from "express";
import {registerUser, loginUser} from "../controllers/auth.controller";
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, (req,res) => {
    res.json({
        success:true,
        message: "protected route accessed"
    })
    
})

export default router;