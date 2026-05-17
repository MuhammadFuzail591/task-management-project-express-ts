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

export const getAllTasksService = async () => {
  return await prisma.task.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const getTaskByIdService = async (id: string) => {
  return await prisma.task.findUnique({
    where: { id },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const deleteTaskService = async (id: string) => {
  return await prisma.task.delete({
    where: { id },
  });
};