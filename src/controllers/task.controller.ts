import {prisma} from '../config/prisma.js'
import { CreateTaskInput } from '../types/task.types.js'


export const createTaskService = async(data:CreateTaskInput, userId:string) => {
   return prisma.task.create({
      data:{
         ...data,
         userId
      }
   })
}

export const getTaskService = async(userId:string) => {
   return prisma.task.findMany({
      where:{userId},
      orderBy:{createdAt:"desc"}
   })
}

export const getTaskByIdService = async(taskId:string, userId:string) => {
   return prisma.task.findFirst({
      where:{
         id:taskId,
         userId
      }
   })
}

export const updateTaskService = async(taskId:string, userId:string, data:Partial<CreateTaskInput>) => {
   return prisma.task.updateMany({
      where:{
         id:taskId,
         userId
      },
      data,
   })
}

export const deleteTaskService = async(taskId:string, userId:string) => {
   return prisma.task.deleteMany({
      where:{
         id:taskId,
         userId
      }
   })
}