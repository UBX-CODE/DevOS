import { Request, Response } from "express";
import { Task } from "../models/Task";
import { Project } from "../models/Project";
import {createTaskSchema} from "../validations/task.validation";

export const createTask = async (req: Request,res: Response) => {
  try {
    const validatedData =createTaskSchema.parse(req.body);
    const project =await Project.findOne({
        _id: validatedData.projectId, 
        userId: req.user?.userId
    });
    if (!project) {
      return res.status(404).json({
        success: false,
        message:"Project not found",
      });
    }
    const task =await Task.create({
        ...validatedData,
        userId:req.user?.userId,
    });

    return res.status(201).json({
      success: true,
      task,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:error.message,
    });
  }
};

export const getProjectTask = async( req:Request,res:Response) => {
  try{
    const {projectId} = req.params;
    const project = await Project.findOne({
      _id: projectId,
      userId: req.user?.userId,
    });
    if(!project){
      return res.status(404).json({
        success:false,
        message: "Project not found",
      });
    }
    const tasks = await Task.find({
      projectId,
    });
    return res.status(200).json({
      success:true,
      count: tasks.length,
      tasks,
    });
  }catch(error:any){
  return res.status(500).json({
    success: false,
    message: error.message,
  })
  }
};

export const getMyTasks = async (req: Request,res:Response) => {
  try{
    const tasks = await Task.find({
      userId: req.user?.userId,
    });
    return res.status(200).json({
      success:true,
      count: tasks.length,
      tasks,
    });
  }catch(error:any){
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

export const updateTask = async (req: Request,res: Response) => {
  try {
    const task = await Task.findOneAndUpdate({
        _id: req.params.id,
        userId: req.user?.userId,
    },
    req.body,
    {
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

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTask = async (req: Request,res: Response) => {
  try {
    const task = await Task.findOneAndDelete({
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
      message:"Task deleted successfully",
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};