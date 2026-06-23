"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
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
        enum: ["TODO", "IN_PROGRESS", "DONE",],
        default: "TODO",
    },
    priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL",],
        default: "MEDIUM",
    },
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
exports.Task = mongoose_1.default.model("Task", taskSchema);
