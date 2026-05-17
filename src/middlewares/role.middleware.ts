import { Request, Response, NextFunction } from "express";

export const authorizedRole = (roleAllowed: string) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const role = req.user?.role;

    if (role !== roleAllowed) {
      return res.status(403).json({
        success: false,
        message: `Only ${roleAllowed} can access this route`,
      });
    }

    next();
  };
};