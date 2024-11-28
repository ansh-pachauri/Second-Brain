import express from "express";
import {z} from "zod";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";

import {jwtSecret} from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./random";


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
// userMiddleware,

app.post("/api/v1/content",userMiddleware, async (req, res) =>{
   const link = req.body.link;
   const type=  req.body.type;
   console.log(link, type);
   
   await ContentModel.create({
    link,
    type,
    // title : req.body.title,
    //@ts-ignore    
    userId:req.userId,
    tags: []
});


res.json({message : "content created"});


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
app.post("/api/v1/brain/share",userMiddleware, async  (req, res) =>{
    const share = req.body.share;
    if(share){
        const existingShareLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if(existingShareLink){
            res.json({
                hash: existingShareLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            //@ts-ignore
            userId:req.userId,  
            hash:hash
        })

        res.json({hash})
    }else{
        await LinkModel.deleteOne({
            //@ts-ignore
            userId:req.userId
        });
        res.json({message: "share link deleted"})   
    }


})

app.get("/api/v1/brain/:shareLink",userMiddleware, async (req, res) =>{
   const hash =  req.params.shareLink;
   const link = await LinkModel.findOne({
            hash
   });
   if(!link){
    res.json({
        message: "link not found incorrest input"
    })
    return;
   }
   const content = await ContentModel.find({
    userId: link.userId
   })
   console.log(link);

   const user = await UserModel.findOne({
        _id: link.userId
   })
   if (!user) {
    res.status(411).json({
        message: "user not found, error should ideally not happen"
    })
    return;
}

res.json({
    userName: user.userName,
    content: content
})
})

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})