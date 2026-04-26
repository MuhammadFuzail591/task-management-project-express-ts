import { JwtPayload } from "jsonwebtoken";

interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}