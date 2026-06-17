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