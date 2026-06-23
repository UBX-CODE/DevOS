"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [
            "PLANNED",
            "IN_PROGRESS",
            "COMPLETED",
        ],
        default: "PLANNED",
    },
    priority: {
        type: String,
        enum: [
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL"
        ],
        default: "MEDIUM",
    },
    githubUrl: {
        type: String,
    },
    liveUrl: {
        type: String,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
exports.Project = mongoose_1.default.model("Project", projectSchema);
