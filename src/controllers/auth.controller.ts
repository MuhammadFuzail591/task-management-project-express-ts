import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../config/prisma.js'
import jwt from "jsonwebtoken"
import 'dotenv/config'
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (name === "" || email === "" || password ===""){
      return res.status(422).json({
        message: 'Data is not valid'
      })
    }
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    res.status(201).json({
      message: 'User created successfully',
      user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}




export const login = async (req:Request, res:Response) => {
   try {
      const {email, password} = req.body

      const user = await prisma.user.findUnique({
         where:{email}
      })

      if (!user){
         return res.status(400).json({
            message: "Invalid credentials"
         })
      }

      const isValid = await bcrypt.compare(password, user.password)

      if (!isValid){
         return res.status(400).json({
            message: "Invalid credentials"
         })
      }

      const token = jwt.sign(
         {userId:user.id},
         process.env.JWT_SECRET as string,
         {expiresIn: '7d'}
      )
      
      res.json({
        message: "Login successful",
        token
      })
   }
   catch(error){
    res.status(500).json({
      message:"Internal Server Error"
    })
   }
}