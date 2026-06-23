"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeetcodeProfile = void 0;
const axios_1 = __importDefault(require("axios"));
const User_1 = require("../models/User");
const getLeetcodeProfile = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user?.userId);
        if (!user?.leetcodeUsername) {
            return res.status(404).json({
                success: false,
                message: "Leetcode username not found",
            });
        }
        const query = {
            query: `query userProfile($username: String!) {
            matchedUser(username: $username) {
            username 
            submitStats{
            acSubmissionNum {
            difficulty
            count
            }}}}`,
            variables: {
                username: user.leetcodeUsername,
            },
        };
        const response = await axios_1.default.post("https://leetcode.com/graphql", query);
        return res.status(200).json({
            success: true,
            leetcode: response.data.data.matchedUser,
        });
    }
    catch (error) {
        console.log(error.response?.data);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getLeetcodeProfile = getLeetcodeProfile;
