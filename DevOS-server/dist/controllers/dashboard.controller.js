"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const Project_1 = require("../models/Project");
const Task_1 = require("../models/Task");
const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const totalProjects = await Project_1.Project.countDocuments({
            userId,
        });
        const totalTasks = await Task_1.Task.countDocuments({
            userId,
        });
        const completedTasks = await Task_1.Task.countDocuments({
            userId,
            status: "DONE",
        });
        const pendingTasks = await Task_1.Task.countDocuments({
            userId,
            status: {
                $ne: "DONE", //not equal
            }
        });
        const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
        return res.status(200).json({
            success: true,
            stats: {
                totalProjects,
                totalTasks,
                completedTasks,
                pendingTasks,
                completionRate,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getDashboardStats = getDashboardStats;
