import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();    
mongoose.connect(process.env.MONGO_URL as string);

//user schema
const UserSchema = new Schema({
    userName: {type: String, required: true},
    password: String
})

export const  UserModel =model("User", UserSchema);

//content schema
const ContentSchema = new Schema({
    title : String,
    link : String,
    tags:  [{type: mongoose.Types.ObjectId, ref:"Tag"}],
    type : String,
    userId: {type: mongoose.Types.ObjectId, ref: "User", required:true},
});


export const ContentModel = model("Content", ContentSchema);

 
//Links Schema

const LinkSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User", required:true, unique:true},
    hash : String
});

export const LinkModel = model("Links", LinkSchema);