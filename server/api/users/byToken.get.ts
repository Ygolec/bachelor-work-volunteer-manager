import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const SECRET_KEY: string = useRuntimeConfig().secretKey
    const body = getQuery(event)
    if (!body.token) {
        return sendRedirect(event, '/authentication', 401)
    }


    const decoded = jwt.verify(body.token, SECRET_KEY)

    return prisma.student.findUnique({
        where: {
            email: decoded.email
        }
    });
})