import mongoose, { model, Schema } from "mongoose";

mongoose.connect("mongodb+srv://admin:V6GJrhxOWBpCB2Gb@cluster0.hnft8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test");

//user schema
const UserSchema = new Schema({
    userName: {type: String, required: true},
    password: String
})

export const  UserModel =model("User", UserSchema);

//content schema
const ContentSchema = new Schema({
    title : String,
    links : String,
    tags:  [{type: mongoose.Types.ObjectId, ref:"Tag"}],
    userId: {type: mongoose.Types.ObjectId, ref: "User", required:true},
});


export const ContentModel = model("Content", ContentSchema);

//tags schema
const TagSchema = new Schema({
    title : String,
    userId: [{ type: mongoose.Types.ObjectId, required:true}]
});

export const TagModel = model("Tag", TagSchema);

//Links Schema

const LinkSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User", required:true},
    hash : String
});

export const LinkModel = model("Links", LinkSchema);