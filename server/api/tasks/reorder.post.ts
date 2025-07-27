import { prisma } from '../../utils/prisma'

interface ChangeOrderRequestBody {
    order: Array<number>
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as ChangeOrderRequestBody;

    const operations = body.order.map((id, index) => {
        return prisma.task.update({
            where: { id: id },
            data: { order: index }
        })
    });

    const result = await prisma.$transaction(operations);

    return {
        status: 'success',
        updated: result.length,
    }
});
