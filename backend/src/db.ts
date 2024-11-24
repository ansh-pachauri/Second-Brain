import mongoose, { model, Schema } from "mongoose";

mongoose.connect("url")

const UserSchema = new Schema({
    userName: {type: String, required: true},
    password: String
})

export const  UserModel =model("User", UserSchema);

const ContentSchema = new Schema({
    title : String,
    links : String,
    tags:  [{type: mongoose.Types.ObjectId, ref:"Tag"}],
    userId: {type: mongoose.Types.ObjectId, ref: "User", required:true},
});


export const ContentModel = model("Content", ContentSchema);