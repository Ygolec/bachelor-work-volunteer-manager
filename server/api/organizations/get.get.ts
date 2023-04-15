import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const requests = await prisma.organization.findMany()
    return requests;
})