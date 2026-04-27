import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/task.controller.js";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

/**
 * @swagger
 * /:
 *    get:
 *       summary:Get alll tasks
 *       responses:
 *          200:
 *             description:Success
 */


const router = Router();

router.use(authMiddleware);
router.post("/",validate(createTaskSchema),createTask);
router.get("/",getTasks);
router.get("/:id",getTaskById);
router.put("/:id",validate(updateTaskSchema),updateTask);
router.delete("/:id",deleteTask);

export default router;