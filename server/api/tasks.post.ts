import { prisma } from '../utils/prisma'

interface CreateTaskRequestBody {
    title: string;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as CreateTaskRequestBody;

    if (!body || body.title.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request body. Title is required and must be a non-empty string.',
        });
    }

    const { user } = await requireUserSession(event);

    try {
        return await prisma.task.create({
            data: {
                title: body.title,
                user_id: user.id,
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
