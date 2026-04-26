import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/task.controller.js";


const router = Router();

router.use(authMiddleware);
router.post("/",createTask);
router.get("/",getTasks);
router.get("/:id",getTaskById);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);

export default router;