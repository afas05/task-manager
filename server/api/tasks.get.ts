import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    return prisma.task.findMany(
        {
            where: {
                deleted: false,
                user_id: user.id
            },
            orderBy: {
                order: 'asc'
            }
        }
    )
})
