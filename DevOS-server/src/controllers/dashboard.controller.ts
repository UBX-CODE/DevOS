import{Request, Response} from "express";

import {Project} from "../models/Project";
import {Task} from "../models/Task";

export const getDashboardStats = async (req:Request, res: Response) => {
    try{
        const userId = req.user?.userId;

        const totalProjects = await Project.countDocuments({
            userId,
        });

        const totalTasks = await Task.countDocuments({
            userId,
        });

        const completedTasks = await Task.countDocuments({
          userId,
          status: "DONE",
        });

        const pendingTasks = await Task.countDocuments({
            userId,
            status:{
                $ne: "DONE",    //not equal
            }
        });
        const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

        return res.status(200).json({
            success:true,
            stats:{
                totalProjects,
                totalTasks,
                completedTasks,
                pendingTasks,
                completionRate,
            },
        });
    }catch(error:any){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};