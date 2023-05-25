import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = getQuery(event)
    if (!body.id)
        return 'null';
        const requests = await prisma.fnd.findMany({
            where:{
                eventId:+body.id
            },
            include:{
                times:true
            }
        })
    return requests;


})