import express from "express";
import {getAllUser,signUp, logIn,updateUser,deleteUser,getDataById}from "../controllers/userController.mjs";

const router=express.Router();



router.route("/").get(getAllUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);
router.route("/:id").get(getDataById);

//login
router.route("/").post(signUp);
router.route("/logIn").post( logIn);
export default router;