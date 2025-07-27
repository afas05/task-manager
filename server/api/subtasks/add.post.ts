import { prisma } from '../../utils/prisma'

interface CreateSubTaskRequestBody {
    title: string;
    task_id: number;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as CreateSubTaskRequestBody;

    if (!body || body.title.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request body. Title is required and must be a non-empty string.',
        });
    }

    try {
        return await prisma.subTasks.create({
            data: {
                title: body.title,
                task_id: body.task_id,
                created: new Date(),
            }
        });
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create task.',
        });
    }
})
