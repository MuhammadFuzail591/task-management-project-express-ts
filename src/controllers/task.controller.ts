import { Request, Response } from "express";
import { createTaskService, deleteTaskService, getTaskByIdService, getTasksService, updateTaskService } from "../services/task.services.js";



export const createTask = async (req:Request, res:Response) => {
   try{
      const userId = req.user?.id!;
      const task = await createTaskService(req.body,userId)

      res.status(201).json({
         success:true,
         data:task
      });


   }catch{
      res.status(500).json({
         message:"Error Creating Task"
      })
   }
}


export const getTasks = async (req:Request, res:Response) => {
   try{
      const userId = req.user?.id!;

      const tasks = await getTasksService(userId, req.query)

      res.status(201).json({
         success:true,
         data:tasks
      });


   }catch{
      res.status(500).json({
         message:"Error Getting Tasks"
      })
   }
}

export const getTaskById = async (req:Request, res:Response) => {
   try{
      const userId = req.user?.id!;
      const {id} = req.params;

      if (typeof id != "string"){
         return res.status(400).json({
            message:"Invalid task ID"
         })
      }

      const task = await getTaskByIdService(id,userId)

      if(!task){
         return res.status(404).json({
            message:"Task not found"
         })
      }

      res.status(200).json({
         success:true,
         data:task
      });


   }catch{
      res.status(500).json({
         message:"Error fetching Task"
      })
   }
}

export const updateTask = async (req:Request, res:Response) => {
   try{
      const userId = req.user?.id!;
      const {id} = req.params;

      if (typeof id != "string"){
         return res.status(400).json({
            message:"Invalid task ID"
         })
      }
      const result = await updateTaskService(id,userId,req.body)

      if(result.count === 0){
         return res.status(404).json({
            message:"Task not found"
         })
      }

      res.status(200).json({
         success:true,
         message:"Task updated"
      });


   }catch{
      res.status(500).json({
         message:"Error Updating Task"
      })
   }
}

export const deleteTask = async (req:Request, res:Response) => {
   try{
      const userId = req.user?.id!;
      const {id} = req.params;

      if (typeof id != "string"){
         return res.status(400).json({
            message:"Invalid task ID"
         })
      }
      const task = await deleteTaskService(id,userId)

      if(!task){
         return res.status(404).json({
            message:"Task not found"
         })
      }

      res.status(200).json({
         success:true,
         message:"Task deleted"
      });


   }catch{
      res.status(500).json({
         message:"Error Deleting Task"
      })
   }
}
