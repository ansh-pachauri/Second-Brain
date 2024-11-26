import { NextFunction, Request,Response } from "express";
import {jwtSecret} from "./config";
import  jwt from "jsonwebtoken";

export const userMiddleware =(req:Request,res:Response, next:NextFunction)=>{
    const header= req.headers["authorization"];
    const decode = jwt.verify(header as string, jwtSecret );

    if(decode){
        //@ts-ignore
        req.userId =decode.id;
        next();

    }else{
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}