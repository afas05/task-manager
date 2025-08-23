import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) throw createError({});
    await requireUserSession(event);
    return prisma.subTasks.delete({where: {id: parseInt(id)}});
})
