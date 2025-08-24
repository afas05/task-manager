import { prisma } from '../utils/prisma'
import bcrypt from 'bcrypt'

interface RegisterUserForm {
    email: string,
    password: string,
    name: string,
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as RegisterUserForm;

    if (!body || body.email.trim() === '' || body.password.trim() === '' || body.name.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request body. All fields are required.',
        });
    }

    try {
        const password = await bcrypt.hash(body.password, 4);
        return await prisma.user.create({
            data: {
                email: body.email,
                password: password,
                name: body.name
            }
        });
    } catch (error) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Cannot create user with this email address.',
        });
    }
});
