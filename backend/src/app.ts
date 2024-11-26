import express from "express";
import {z} from "zod";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";

import {jwtSecret} from "./config";
import { userMiddleware } from "./middleware";


const app = express(); 
app.use(express.json());    

//making the routes
app.post("/api/v1/signup", async (req, res) =>{
    const requireBody =  z.object({
        userName: z.string().min(3).max(20),
        password: z.string().min(3).max(20).trim()
    });

    //parsing the body 
    const parseBody = requireBody.safeParse(req.body);
    if (!parseBody.success) {
        res.json({
            message : "Formate is incorrect"
        })
        return;
    }
     

    const  userName = req.body.userName;
    const password =req.body.password;

    try{
        const user = await UserModel.create({userName,password});
        if(user){
            res.status(200).json({
                message : "User crated succefully"
            });
        }
        
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
            console.log(token);
            
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

app.post("/api/v1/content",userMiddleware, async (req, res) =>{
   const link = req.body.link;
   const type=  req.body.type;
   try{
    await ContentModel.create({
        link,
        type,
        title : req.body.title,
        //@ts-ignore 
        userId:req.user._id,
        tags: []
    });
    res.json({message : "content created"});
   }
   catch(err){
    res.json({message : "Content is not created"})
   }
})

app.get("/api/v1/content",userMiddleware, async (req, res) =>{
    //@ts-ignore
    const userId= req.userId;
    const content = await ContentModel.find({
        userId:userId,
    }).populate("userId", "username")  //for getting the whole data of userId

    res.json({
        content
    })
 })
 

app.delete("/api/v1/content",userMiddleware,async  (req, res) =>{
    const contentId= req.body.contentId;
    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message: "deleted"
    })

})
app.post("/api/v1/brain/share",  (req, res) =>{
    const id = req.body.userId;

})

app.get("/api/v1/brain/:shareLink", async (req, res) =>{
    const userId = req.body.userId;
    const content = {
        title: req.query.title,
        links: req.query.links,
        type: req.query.type,
        tags: req.query.tags,
        id: req.query.id
    }

    try{
        const shareLink = await LinkModel.create({
            userId: userId,
            content: content
        })
    }catch{
        res.json({message : "Link is not created"})
    }
})

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})