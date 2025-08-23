import { prisma } from '../utils/prisma'
import bcrypt from 'bcrypt'

interface LoginUserForm {
    email: string,
    password: string,
}
export default defineEventHandler(async (event) => {
    const body = await readBody(event) as LoginUserForm;

    if (!body || body.email.trim() === '' || body.password.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request body. All fields are required.',
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        });

        if (!user) {
            return;
        }

        const passwordMatch = await bcrypt.compare(body.password, user.password);

        if (passwordMatch) {
            await setUserSession(event, {
                user: {
                    id: user.id,
                    name: user.name,
                }
            })
        }
    } catch (error) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User does not exist.',
        });
    }
});
