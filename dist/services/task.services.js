import { prisma } from '../config/prisma.js';
export const createTaskService = async (data, userId) => {
    return prisma.task.create({
        data: {
            ...data,
            userId
        }
    });
};
export const getTasksService = async (userId, query) => {
    const page = parseInt(query.page || "1");
    const limit = parseInt(query.limit || "10");
    const skip = (page - 1) * limit;
    const filter = {
        userId,
    };
    if (query.status) {
        filter.status = query.status;
    }
    if (query.priority) {
        filter.priority = query.priority;
    }
    let orderBy = {
        createdAt: "desc"
    };
    if (query.sort) {
        const direction = query.sort.startsWith("-") ? query.sort.substring(1) : query.sort;
        const field = query.sort.startsWith("-") ? "desc" : "asc";
        orderBy = {
            [field]: direction
        };
    }
    const tasks = await prisma.task.findMany({
        where: filter,
        skip,
        take: limit,
        orderBy
    });
    const total = await prisma.task.count({
        where: filter
    });
    return {
        data: tasks,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};
export const getTaskByIdService = async (taskId, userId) => {
    return prisma.task.findFirst({
        where: {
            id: taskId,
            userId
        }
    });
};
export const updateTaskService = async (taskId, userId, data) => {
    return prisma.task.updateMany({
        where: {
            id: taskId,
            userId
        },
        data,
    });
};
export const deleteTaskService = async (taskId, userId) => {
    return prisma.task.deleteMany({
        where: {
            id: taskId,
            userId
        }
    });
};
