import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { AuthPayload } from "../types/express.js";

export const authMiddleware = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const authHeader = req.headers.authorization;

   if(!authHeader){
      return res.status(401).json({
         message: "Token Missing"
      })
   }
   
   const token = authHeader.split(" ")[1]

   try{
      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET as string
      ) as AuthPayload;

      req.user = decoded
      
      next()
   }catch{
      return res.status(401).json({
         message: "Invalid Token"
      })
   }
}