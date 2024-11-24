import express from "express";
import {z} from "zod";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "./db";

//jwt password
const jwtSecret = "132352alsmd";


const app = express(); 
app.use(express.json());    

//making the routes
app.post("/api/v1/signup", async (req, res) =>{
    const  userName = req.body.userName;
    const password =req.body.password;

    try{
        await UserModel.create({
            userName: userName,
            password: password
        })
    
        res.json({
            message: "user created successfully"
        })
    }
    catch(e){
        res.status(411).json({
            message : "User already exist"
        })
    }
  
})

app.post("/api/v1/signin", async (req, res) =>{
    const userName = req.body.userName;
    const password = req.body.password;
    try{
        const exist = await UserModel.findOne({
            userName,
            password
        })
    
        if(exist){
            const token = jwt.sign({
                id:exist._id
            },jwtSecret)
    
            res.json({
                token
            })
        }
        else{
            res.status(403).json({
                message : "Incorrect Credentials"
            })
        }
    }catch{
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
    
})

app.get("/api/v1/signup",  (req, res) =>{

})

app.delete("/api/v1/content",  (req, res) =>{

})
app.post("/api/v1/brain/share",  (req, res) =>{

})

app.get("/api/v1/brain/:shareLink",  (req, res) =>{

})

app.listen(3000);
