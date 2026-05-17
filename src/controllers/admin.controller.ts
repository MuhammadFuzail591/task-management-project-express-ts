import { Request, Response } from "express";
import { deleteUserService, getAllUsersService, getSingleUserService } from "../services/admin.services.js";


export const getAllUsers = async(req:Request, res:Response) => {
   try{
      const users = await getAllUsersService();
      
      res.status(200).json({
         success:true,
         data:users
      })
   }catch(error){
      res.status(500).json({
         success:false,
         message:"Internal Server Error"
      })
   }
}

export const getSingleUser = async(req:Request, res:Response) => {
   try{
      const id = req.params.id;

      if(typeof id != "string"){
         return res.status(400).json({
            success:false,
            message: "Invalid id"
         })
      }

      const user = await getSingleUserService(id);
      
      res.status(200).json({
         success:true,
         data: user
      })

   }catch(error){
      res.status(500).json({
         success:false,
         message: "Internal Server Error"
      })
   }
}

export const deleteUser = async(req:Request, res:Response) => {
   try{
      const id = req.params.id;

      if(typeof id != "string"){
         return res.status(400).json({
            success:false,
            message: "Invalid id"
         })
      }

      const user = await deleteUserService(id);
      
      if(!user){
         return res.status(404).json({
            success:false,
            message:"User Not Found"
         })
      }


      res.status(200).json({
         success:true,
         message:"User Deleted successfuly"
      })

   }catch(error){
      res.status(500).json({
         success:false,
         message: "Internal Server Error"
      })
   }
}