import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = getQuery(event)

    const requests = await prisma.event.update({
        where: {
            id: +body.idEvent,
        },
        data:{
            visibility:{
                set: (body.visibility=== 'true')
            }
        }
    })
    return 'OK';
})