"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const passport_1 = __importDefault(require("passport"));
const generateToken_1 = require("../utils/generateToken");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.registerUser);
router.post("/login", auth_controller_1.loginUser);
router.put("/profile", auth_middleware_1.authMiddleware, auth_controller_1.updateProfile);
router.get("/me", auth_middleware_1.authMiddleware, auth_controller_1.getProfile);
router.get("/google", passport_1.default.authenticate("google", {
    scope: [
        "profile",
        "email",
    ],
}));
router.get("/google/callback", passport_1.default.authenticate("google", {
    session: false,
    failureRedirect: "/login",
}), async (req, res) => {
    const token = (0, generateToken_1.generateToken)(req.user._id);
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
});
exports.default = router;
