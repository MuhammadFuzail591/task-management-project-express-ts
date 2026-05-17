import { Router } from "express";
import { deleteTask, deleteUser, getAllTasks, getAllUsers, getSingleUser, getTaskById } from "../controllers/admin.controller.js";

const router = Router();

router.get("/users", getAllUsers)

router.get("/users/:id", getSingleUser)

router.delete("/users/:id", deleteUser)

router.get("/tasks", getAllTasks)

router.get("/tasks/:id", getTaskById)

router.delete("/tasks/:id", deleteTask)

export default router;