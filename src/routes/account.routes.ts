import { Router } from "express";
import { deleteTask, deleteUser, getAllTasks, getAllUsers, getSingleUser, getTaskById } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getCurrentUser } from "../controllers/account.controller.js";

const router = Router();

router.use(authMiddleware)

router.get("/me", getCurrentUser)


export default router;