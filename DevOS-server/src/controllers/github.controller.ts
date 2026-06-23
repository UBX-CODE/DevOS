import {Request,Response} from "express";
import axios from "axios";

import{User} from "../models/User";

export const getGithubProfile = async (req: Request, res: Response) => {
    try{
        const user = await User.findById(req.user?.userId);

        if(!user?.githubUsername) {
            return res.status(404).json({
                success:false,
                message: "Github username not found"
            });
        }
        const response = await axios.get(`https://api.github.com/users/${user.githubUsername}`);
        return res.status(200).json({
            success:true,
            github: response.data
        });
        
    }catch(error:any){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};