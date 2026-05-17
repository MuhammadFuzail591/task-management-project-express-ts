import { Request, Response } from "express"
import { getCurrentUserService } from "../services/account.services.js";

export const getCurrentUser = async (req:Request, res:Response) => {
   try {
    const userId = req.user?.id!;

    const user = await getCurrentUserService(userId);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error:any) {
   if(error.code === 'P2025'){
         return res.status(404).json({success:false, message:"User not Found"})
      }
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}