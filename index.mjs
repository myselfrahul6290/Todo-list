import express from "express";
import router from "./Router/user.mjs";
import mongoose from "mongoose";
const app=express();


//DB connection
mongoose.connect('mongodb://127.0.0.1:27017/BankAPI')
.then(()=>console.log("User DB is Connected")).catch((err)=>{console.log("user DB connection Failed")});

//midlewares
app.use(express.json());
app.use("/api/user",router);




app.listen(5000,()=>{
    console.log("localhost:5000");
})