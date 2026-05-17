import { Router } from "express";
import { deleteUser, getAllUsers, getSingleUser } from "../controllers/admin.controller.js";

const router = Router();

router.get("/users", getAllUsers)

router.get("/users/:id", getSingleUser)

router.delete("/users/:id", deleteUser)

export default router;