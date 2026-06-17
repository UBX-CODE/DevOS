import{Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request,res: Response,next:NextFunction) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }
        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                success: false,
                message: "token missing"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: string;
        };

        req.user = {userId: decoded.userId} ;
        next(); 
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }
};