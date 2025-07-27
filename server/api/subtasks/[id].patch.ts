import { prisma } from '../../utils/prisma'

interface EditSubTaskRequestBody {
    done: boolean
}
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        return
    }

    const body = await readBody(event) as EditSubTaskRequestBody;

    console.log('vody', body)

    return await prisma.subTasks.update(
        {
            where: {
                id: parseInt(id)
            },
            data: {
                done: body.done,
            }
        },
    )
})
