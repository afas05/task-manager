import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) throw createError({})
    return prisma.task.delete({where: {id: parseInt(id)}})
})
