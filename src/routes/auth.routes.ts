import {Router} from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '../validators/auth.validation.js';

const router = Router();

/**
 * @swagger
 * /register:
 *    post:
 *    
 */


router.post("/register",validate(registerSchema), register)
router.post("/login",validate(loginSchema), login)

export default router;