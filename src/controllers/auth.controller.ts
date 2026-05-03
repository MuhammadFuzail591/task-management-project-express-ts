import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../config/prisma.js'
import jwt from "jsonwebtoken"
import 'dotenv/config'
import axios from 'axios'

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
        password: hashedPassword,
        provider: "local"
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

      if (email === "" || password ===""){
      return res.status(422).json({
        message: 'Data is not valid'
      })
    }

      const user = await prisma.user.findUnique({
         where:{email}
      })

      if (!user){
         return res.status(400).json({
            message: "Invalid credentials"
         })
      }

      const isValid = await bcrypt.compare(password, user.password!)

      if (!isValid){
         return res.status(400).json({
            message: "Invalid credentials"
         })
      }

      const token = jwt.sign(
         {id:user.id, email:user.email},
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



export const googleAuth = (req:Request, res:Response) => {
  const redirectUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri:"http://localhost:5000/api/auth/google/callback",
    response_type:"code",
    scope:"openid email profile",
    prompt:"consent",
  })
  
  res.redirect(`${redirectUrl}?${params.toString()}`)
}


export const googleCallback = async (req:Request, res:Response) => {
  const code = req.query.code as string;

  try{
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id:process.env.GOOGLE_CLIENT_ID,
        client_secret:process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri:"http://localhost:5000/api/auth/google/callback",
        grant_type:"authorization_code",
        response_type:"code"
      }
    );

    const {id_token} = tokenRes.data;

    const googleUser:any = jwt.decode(id_token)

    const {email, name, sub} = googleUser;

    let user = await prisma.user.findUnique(
      {
        where: {email}
      }
    )

    if (user) {
      if (!user.providerId) {
        user = await prisma.user.update({
          where:{id:user.id},
          data:{
            provider:"google",
            providerId:sub
          }
        })
      }
    }else{
      user = await prisma.user.create({
        data:{
          email,
          name,
          provider:"google",
          providerId:sub
        }
      })
    }

    const token  = jwt.sign(
      {userId:user.id},
      process.env.JWT_SECRET!,
      {expiresIn:"7d"}
    )

    res.status(201).json({
      message:"Login Successful",
      token
    })
  }catch(error){
    console.error(error)
    res.status(500).json({message:"OAuth Failed"})
  }
}
