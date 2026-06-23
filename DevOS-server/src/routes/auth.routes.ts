import { Router } from "express";
import { registerUser, loginUser, updateProfile ,getProfile} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import passport from "passport";
import { generateToken }
from "../utils/generateToken";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", authMiddleware, updateProfile);
router.get("/me", authMiddleware, getProfile);
router.get("/google",passport.authenticate("google",{
      scope:["profile","email"],
}));

router.get(
  "/google/callback",

  passport.authenticate(
    "google",
    {
      session: false,
      failureRedirect:
        "/login",
    }
  ),

  async (req: any, res) => {

    const token =
      generateToken(
        req.user._id
      );

    res.redirect(
      `https://dev-os-iota.vercel.app/oauth-success?token=${token}`
    );

  }
);

export default router;