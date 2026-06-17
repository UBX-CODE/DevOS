import {Request,Response} from "express";
import {Project} from "../models/Project";
import {createProjectSchema} from "../validations/project.validation";

export const createProject = async (req:Request, res:Response) => {
    try{
        const validatedData = createProjectSchema.parse(req.body);

        const project = await Project.create({
            ...validatedData,
            userId: req.user?.userId,
        });

        return res.status(201).json({
            success: true,
            project,
        });
    }catch(error: any){
        return res.status(400).json({
            success: false,
            message: error.message,
        });    
    }
}

export const getMyProjects = async(req:Request , res:Response) => {
    try{
        const projects = await Project.find({
            userId: req.user?.userId,
        });

        return res.status(200).json({
            success: true,
            count: projects.length,
            projects,
        });
    }catch(error:any){
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProjectById = async(req:Request, res:Response) => {
    try{
        const {id} = req.params;
        const project = await Project.findOne({
            _id: id,
            userId: req.user?.userId
        });
        if(!project) {
            return res.status(404).json({
                success:false,
                message: "Project not found",
            });
        }
        return res.status(200).json({
            success: true,
            project,
        });
    }catch(error:any){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const updateProject = async (res:Response, req:Request) => {
    try{
        const {id} = req.params;
        const updatedProject = await Project.findOneAndUpdate({
            _id: id,
            userId: req.user?.userId,
        },
    req.body,
    {
        new:true,
    });

    if(!updatedProject){
        return res.status(404).json({
            success:false,
            message:"Project not found",
        });
    }
    return res.status(200).json({
        success:true,
        project:updatedProject,
    });
    }catch(error:any){
        return res.status(400).json({
            success:false,
            message: error.message,
        });
    }
};

export const deleteProject = async(req:Request , res:Response) => {
    try{
        const {id} = req.params;
        const deletedProject = await Project.findOneAndDelete({
            _id: id,
            userId: req.user?.userId,
        });
        if(!deletedProject){
            return res.status(404).json({
                success:false,
                message: "Project not found",
            });
        }
        return res.status(200).json({
            success: true,
            message:"Project deleted successfully",
        });
    }catch(error:any){
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
