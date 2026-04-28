import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/task.controller.js";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.use(authMiddleware);
/**
 * @swagger
 * api/task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Swagger
 *               description:
 *                 type: string
 *                 example: Practice API documentation
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Task created successfully
 *       500:
 *         description: Error creating task
 */
router.post("/",validate(createTaskSchema),createTask);

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Get all tasks for logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve tasks with pagination, filtering, and sorting
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of tasks per page (default is 10)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: pending
 *         description: Filter tasks by status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           example: high
 *         description: Filter tasks by priority
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: -createdAt
 *         description: |
 *           Sort tasks by a field.
 *           Prefix with "-" for descending order.
 *           Example:
 *             createdAt → ascending
 *             -createdAt → descending
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                     meta:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 50
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         totalPages:
 *                           type: integer
 *                           example: 5
 *       500:
 *         description: Error getting tasks
 */
router.get("/",getTasks);

/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: Get a single task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task found
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error fetching task
 */
router.get("/:id",getTaskById);

/**
 * @swagger
 * /api/task/{id}:
 *   patch:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error updating task
 */
router.put("/:id",validate(updateTaskSchema),updateTask);

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error deleting task
 */
router.delete("/:id",deleteTask);

export default router;