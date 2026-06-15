import { Request, Response } from "express";

export const registerUser = async(req: Request, res:Response) => {
    try{
        const{name, email, password} = req.body;
        res.status(201).json({
            success: true,
            data: {
                name,
                email,
            },
            message: "User registered succssfully",
        });
    }catch{
        res.status(500).json({
            success:false,
            message: "Something went wrong",
        });
    }
}