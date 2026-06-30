import{Request, Response} from "express";

import axios from "axios";
import {User} from "../models/User";

export const getLeetcodeProfile = async(req:Request, res:Response) => {
    try{
        const user = await User.findById(req.user?.userId);
        if(!user?.leetcodeUsername){
            return res.status(404).json({
                success: false,
                message: "Leetcode username not found",
            });
        }
        const query = {
            query: `query userProfile($username: String!) {
            matchedUser(username: $username) {
            username 
            submitStats{
            acSubmissionNum {
            difficulty
            count
            }}
            userCalendar {
            submissionCalendar
            }}}`,
            variables: {
                username: user.leetcodeUsername,
            },
        };
        const response = await axios.post("https://leetcode.com/graphql", query);

        return res.status(200).json({
            success: true,
            leetcode: response.data.data.matchedUser,
        });
    }catch(error: any){
        console.log(error.response?.data);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}