"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getMyTasks = exports.getProjectTask = exports.createTask = void 0;
const Task_1 = require("../models/Task");
const Project_1 = require("../models/Project");
const task_validation_1 = require("../validations/task.validation");
const createTask = async (req, res) => {
    try {
        const validatedData = task_validation_1.createTaskSchema.parse(req.body);
        const project = await Project_1.Project.findOne({
            _id: validatedData.projectId,
            userId: req.user?.userId
        });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        const task = await Task_1.Task.create({
            ...validatedData,
            userId: req.user?.userId,
        });
        return res.status(201).json({
            success: true,
            task,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createTask = createTask;
const getProjectTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project_1.Project.findOne({
            _id: projectId,
            userId: req.user?.userId,
        });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        const tasks = await Task_1.Task.find({
            projectId,
        });
        return res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getProjectTask = getProjectTask;
const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task_1.Task.find({
            userId: req.user?.userId,
        });
        return res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getMyTasks = getMyTasks;
const updateTask = async (req, res) => {
    try {
        const task = await Task_1.Task.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user?.userId,
        }, req.body, {
            new: true,
        });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        return res.status(200).json({
            success: true,
            task,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const task = await Task_1.Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user?.userId,
        });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteTask = deleteTask;
