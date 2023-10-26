import mongoose from "mongoose";

//schema (User-Model)

const UsersSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
    
});

const userModel=mongoose.model("User", UsersSchema);

export default userModel;