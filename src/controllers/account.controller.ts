import { Request, Response } from "express"
import { changePasswordService, getCurrentUserService } from "../services/account.services.js";

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

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id!;

    const { currentPassword, newPassword } = req.body;

    await changePasswordService(
      userId,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    if (error.message === "Same password") {
      return res.status(400).json({
        success: false,
        message: "New password cannot be same as old password",
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};