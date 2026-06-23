"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const github_controller_1 = require("../controllers/github.controller");
const router = (0, express_1.Router)();
router.get("/profile", auth_middleware_1.authMiddleware, github_controller_1.getGithubProfile);
router.get("/repos", auth_middleware_1.authMiddleware, github_controller_1.getGithubRepos);
exports.default = router;
