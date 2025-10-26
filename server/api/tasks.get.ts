import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    return prisma.$queryRaw`
        SELECT
            t.id,
            t.title,
            t.user_id,
            t.order,
            t.created,
            t.deleted,
            COALESCE(
                CASE
                    WHEN COUNT(st.id) = 0 THEN 0
                    ELSE ROUND((SUM(CASE WHEN st.done = 1 THEN 1 ELSE 0 END) * 100.0) / COUNT(st.id))
                END,
                0
            ) as percentage
        FROM Task t
        LEFT JOIN SubTasks st ON t.id = st.task_id AND st.deleted = 0
        WHERE t.deleted = 0 AND t.user_id = ${user.id}
        GROUP BY t.id, t.title, t.user_id, t.order, t.created, t.deleted
        ORDER BY t.order ASC
    `;
})
