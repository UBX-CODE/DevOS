import { Request, Response } from "express";
import  Workflow from "../models/Workflow";

export const createWorkflow = async (req: Request, res: Response) => {
    try {
        const { projectId, name, nodes, edges,} = req.body;
        const workflow = await Workflow.create({
            projectId, userId: req.user?.userId, name, nodes, edges
        });
        return res.status(201).json({success: true,workflow});

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getWorkflow = async (req: Request, res: Response) => {
    try {
        const projectId = req.params.projectId as string;
        let workflow = await Workflow.findOne({
            projectId,
            userId: req.user?.userId
        })

        if(!workflow){
            workflow = await Workflow.create({
                projectId,
                userId: req.user?.userId as string,
                name: "untitled Wrolflow",
                nodes: [],
                edges: [],
            });
        }
        
        return res.status(200).json({
            success: true,
            workflow,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateWorkflow = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, nodes, edges } = req.body;
        
        const workflow = await Workflow.findOneAndUpdate(
            { _id: id, userId: req.user?.userId },
            { name, nodes, edges },
            { new: true }
        );

        if (!workflow) {
            return res.status(404).json({
                success: false,
                message: "Workflow not found",
            });
        }

        return res.status(200).json({
            success: true,
            workflow,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteWorkflow = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const workflow = await Workflow.findOneAndDelete({
            _id: id,
            userId: req.user?.userId,
        });
        if (!workflow) {
            return res.status(404).json({
                success: false,
                message: "Workflow not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Workflow deleted successfully",
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
