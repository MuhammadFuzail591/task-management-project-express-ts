import {prisma} from '../config/prisma.js'
import bcrypt from 'bcrypt'

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

export const changePasswordService = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  if (!user.password) {
    throw new Error("Google account");
  }

  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  const isSamePassword = await bcrypt.compare(
    newPassword,
    user.password
  );

  if (isSamePassword) {
    throw new Error("Same password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      password: hashedPassword,
    },
  });
};