import {prisma} from '../config/prisma.js'

export const getAllUsersService = async() => {
   return prisma.user.findMany();
}

export const getSingleUserService = async(id:string) => {
   return prisma.user.findUnique({
      where:{id}
   })
}

export const deleteUserService = async(userId:string) => {
   return prisma.user.delete({
      where: {id:userId}
   })
}

