import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
    return prisma.task.findMany({orderBy: { created: 'asc' }})
})
