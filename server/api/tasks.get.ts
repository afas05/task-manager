import { prisma } from '../utils/prisma'

export default defineEventHandler(async () => {
    return prisma.task.findMany(
        {
            where: {
                deleted: false,
            },
            orderBy: {
                order: 'asc'
            }
        }
    )
})
