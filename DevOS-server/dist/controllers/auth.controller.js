"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.updateProfile = exports.loginUser = exports.registerUser = void 0;
const auth_validation_1 = require("../validations/auth.validation");
const auth_service_1 = require("../services/auth.service");
const User_1 = require("../models/User");
const jwt_service_1 = require("../services/jwt.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerUser = async (req, res) => {
    try {
        const validatedData = auth_validation_1.registerSchema.parse(req.body);
        const existingUser = await User_1.User.findOne({ email: validatedData.email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }
        ;
        const hashedPassword = await (0, auth_service_1.hashPassword)(validatedData.password);
        const user = await User_1.User.create({
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
            githubUsername: validatedData.githubUsername,
            leetcodeUsername: validatedData.leetcodeUsername,
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                name: user.name,
                email: user.email,
                _id: user._id,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "VALIDATION FAILED",
            error,
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const validatedData = auth_validation_1.loginSchema.parse(req.body);
        const user = await User_1.User.findOne({ email: validatedData.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        ;
        const isPasswordValid = await bcryptjs_1.default.compare(validatedData.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        ;
        const token = (0, jwt_service_1.generateToken)(user._id.toString());
        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.loginUser = loginUser;
const updateProfile = async (req, res) => {
    try {
        const user = await User_1.User.findByIdAndUpdate(req.user?.userId, {
            name: req.body.name,
            githubUsername: req.body.githubUsername,
            leetcodeUsername: req.body.leetcodeUsername,
        }, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateProfile = updateProfile;
const getProfile = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user?.userId).select("-password");
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getProfile = getProfile;
