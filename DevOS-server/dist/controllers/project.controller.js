"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getMyProjects = exports.createProject = void 0;
const Project_1 = require("../models/Project");
const project_validation_1 = require("../validations/project.validation");
const createProject = async (req, res) => {
    try {
        const validatedData = project_validation_1.createProjectSchema.parse(req.body);
        const project = await Project_1.Project.create({
            ...validatedData,
            userId: req.user?.userId,
        });
        return res.status(201).json({
            success: true,
            project,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createProject = createProject;
const getMyProjects = async (req, res) => {
    try {
        const projects = await Project_1.Project.find({
            userId: req.user?.userId,
        });
        return res.status(200).json({
            success: true,
            count: projects.length,
            projects,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getMyProjects = getMyProjects;
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project_1.Project.findOne({
            _id: id,
            userId: req.user?.userId
        });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        return res.status(200).json({
            success: true,
            project,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getProjectById = getProjectById;
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProject = await Project_1.Project.findOneAndUpdate({
            _id: id,
            userId: req.user?.userId,
        }, req.body, {
            new: true,
        });
        if (!updatedProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        return res.status(200).json({
            success: true,
            project: updatedProject,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project_1.Project.findOneAndDelete({
            _id: id,
            userId: req.user?.userId,
        });
        if (!deletedProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteProject = deleteProject;
