import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = getQuery(event)

    const requests = await prisma.applicationForParticipationInTheEvent.findMany({
        where: {
            eventId: +body.idEvent,
        },
        include:{
            student:true,
            fnds:{
                include:{
                    times: true
                }
            }
        }
    })
    return requests;
})