"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubRepos = exports.getGithubProfile = void 0;
const axios_1 = __importDefault(require("axios"));
const User_1 = require("../models/User");
const getGithubProfile = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user?.userId);
        if (!user?.githubUsername) {
            return res.status(404).json({
                success: false,
                message: "Github username not found"
            });
        }
        const response = await axios_1.default.get(`https://api.github.com/users/${user.githubUsername}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: "application/vnd.github+json"
            }
        });
        return res.status(200).json({
            success: true,
            github: response.data
        });
    }
    catch (error) {
        console.log("GitHub Error:");
        console.log(error.response?.data);
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getGithubProfile = getGithubProfile;
const getGithubRepos = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user?.userId);
        if (!user?.githubUsername) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const response = await axios_1.default.get(`https://api.github.com/users/${user.githubUsername}/repos`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: "application/vnd.github+json"
            }
        });
        return res.status(200).json({
            success: true,
            repos: response.data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getGithubRepos = getGithubRepos;
