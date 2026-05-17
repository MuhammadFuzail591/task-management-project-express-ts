import { Request, Response } from "express";
import { deleteTaskService, deleteUserService, getAllTasksService, getAllUsersService, getSingleUserService, getTaskByIdService } from "../services/admin.services.js";


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

   }catch(error:any){

      if(error.code === 'P2025'){
         return res.status(404).json({success:false, message:"User not Found"})
      }

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

      await deleteUserService(id);


      res.status(200).json({
         success:true,
         message:"User Deleted successfuly"
      })

   }catch(error:any){

      if(error.code === 'P2025'){
         return res.status(404).json({success:false, message:"User not Found"})
      }

      res.status(500).json({
         success:false,
         message: "Internal Server Error"
      })
   }
}

export const getAllTasks = async (
  req: Request,
  res: Response
) => {
  try {
    const tasks = await getAllTasksService();

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

     if(typeof id != "string"){
         return res.status(400).json({
            success:false,
            message: "Invalid id"
         })
      }

    const task = await getTaskByIdService(id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error:any) {

    if(error.code === 'P2025'){
         return res.status(404).json(
            {
               success:false, 
               message:"Task not Found"
            }
         )
      }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if(typeof id != "string"){
         return res.status(400).json({
            success:false,
            message: "Invalid id"
         })
      }

    await deleteTaskService(id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error:any) {
      if(error.code === 'P2025'){
         return res.status(404).json({success:false, message:"Task not Found"})
      }
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

