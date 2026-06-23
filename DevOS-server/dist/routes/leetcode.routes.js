"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leetcode_controller_1 = require("../controllers/leetcode.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/profile", auth_middleware_1.authMiddleware, leetcode_controller_1.getLeetcodeProfile);
exports.default = router;
