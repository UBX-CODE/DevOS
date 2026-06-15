import { Request, Response } from "express";
import {registerSchema} from "../validations/auth.validation";
import {hashPassword} from "../services/auth.service";
import {User} from "../models/User";

export const registerUser = async(req: Request, res:Response) => {
    try{
        const validatedData = registerSchema.parse(req.body);
        const existingUser = await User.findOne({email: validatedData.email});

        if(existingUser){
            return res.status(409).json({
                success: false,
                message:"User already exists",
            });
        };
        const hashedPassword = await hashPassword(validatedData.password);

        const user = await User.create({
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message:"User registered successfully",
            data:{
                name:user.name,
                email:user.email,
                _id: user._id,
            },
        });
    }catch(error){
        res.status(400).json({
            success:false,
            message: "VALIDATION FAILED",
            error,
        });
    }
};