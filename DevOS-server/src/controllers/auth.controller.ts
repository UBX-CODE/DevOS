import { Request, Response } from "express";
import {registerSchema ,loginSchema} from "../validations/auth.validation";
import {hashPassword} from "../services/auth.service";
import {User} from "../models/User";
import { generateToken } from "../services/jwt.service";
import bcrypt from "bcryptjs";

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
            githubUsername: validatedData.githubUsername,
            leetcodeUsername: validatedData.leetcodeUsername,
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

export const loginUser = async(req: Request, res: Response) => {
    try{
        const validatedData = loginSchema.parse(req.body);

        const user = await User.findOne({email: validatedData.email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        };

        const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        };
        const token = generateToken(user._id.toString());

        return res.status(200).json({
            success:true,
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch(error:any){
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProfile =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const user =
        await User.findByIdAndUpdate(
          req.user?.userId,
          {
            name: req.body.name,
            githubUsername:
              req.body.githubUsername,

            leetcodeUsername:
              req.body.leetcodeUsername,
          },
          {
            new: true,
          }
        );

      return res.status(200).json({
        success: true,
        user,
      });

    } catch (error: any) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
};