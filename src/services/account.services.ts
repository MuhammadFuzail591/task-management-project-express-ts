import {prisma} from '../config/prisma.js'


export const getCurrentUserService = async(userId:string) => {
   const user = await prisma.user.findUnique({
      where:{id:userId},
      select:{
         id:true,
         name:true,
         email:true,
         role:true,
         createdAt:true
      }
   })

   return user
}