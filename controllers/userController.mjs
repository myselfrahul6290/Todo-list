import { json } from "express";
import userModel from "../model/userModel.mjs";
import bcrypt from "bcryptjs";

export const getAllUser=async(req, res)=>{
    let userData;
    try{
        userData=await userModel.find();
    }catch(err){console.log(err);}

    if(!userData){
        return res.status(404).json({"message":"No Data Found"});
    }
    return res.status(200).json({userData,"message":"User Datas"});
}

export const signUp=async(req,res)=>{
    const {name,email,phone,password,address}=req.body;
    console.log(name);
    //check user is Already register or Not
    let validateUser;
    try{
        validateUser=await userModel.findOne({email});
    }catch(err){console.log(err);}

    if(validateUser){
        return res.status(400).json({"message":"user already registered.."});
        
    }
       // Encrypt the password
       const hashPassword=bcrypt.hashSync(password);
    //create a new User
    const userData= new userModel({
        name,
        email,
        phone,
        password:hashPassword,
        address
    })
 
    try{
        await userData.save();
       
    }catch(err){console.log("user add Problem"+err);}
    return res.status(201).json({userData});
}


export const logIn=async(req,res)=>{
    const {email,password}=req.body;
    let validateUser;
    try{
        validateUser=await userModel.findOne({email});
    }catch(err){console.log(err);}

    if(!validateUser){
        return res.status(400).json({"message":"This email Id Is Not Registed"});    
    }
// compare actual password to encrypt password return bool 
    const varifyPassword=bcrypt.compareSync(password, validateUser.password);

    if(!varifyPassword){
        return res.status(404).json({message:"Incorrect Password"});
    }
    return res.status(200).json({message:"LogIn Sucessfully"});


}

export const updateUser=async(req,res)=>{
    const {userId}=req.params.id;
    const {name,phone,address}=req.body;
    let user
    try{
       user= await userModel.findOneAndUpdate(userId,{
            name,
            phone,
            address
      })
    }catch(err){console.log(err);}

    if(!user){
        return res.status(404).json({message:"Unable to upadte the User Details"})
    }
    return res.status(200).json({message:"Updated Sucessfully"});
   
}

export const deleteUser=async(req,res)=>{
    const userId=req.params.id;
    let user;

    try{
       user=await userModel.findByIdAndRemove(userId);
    }catch(err){console.log(err);}

    if(!user){
        return res.status(404).json({message:"Unable To Delete "});
    }
    return res.status(200).json({message:"Sucessfully  Delete this record from DB"});


}

export const getDataById=async(req,res)=>{
    const userId=req.params.id;
    let user;
    try{
        user=await userModel.findById(userId);
    }catch(err){console.log(err);}

    if(!user){
        return res.status(404).json({message:"Unable To Find This record "});

    }
    return res.status(200).json({user});

}


// export {getAllUser};


