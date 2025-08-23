import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        return
    }

    await requireUserSession(event);

    return prisma.subTasks.findMany(
        {
            where: {
                deleted: false,
                task_id: parseInt(id)
            },
            orderBy: {
                order: 'asc'
            }
        }
    )
})
