import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {


    const requests = await prisma.event.groupBy({
        by: ['type'],
        _count: {
            type:true
        }
    })
    return requests;
})