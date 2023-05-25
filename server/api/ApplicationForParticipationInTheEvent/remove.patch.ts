import {ApplicationStatus, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = getQuery(event)

    const requests = await prisma.applicationForParticipationInTheEvent.update({
        where: {
            id: +body.id,
        },
        data:{
            status:ApplicationStatus.SEND
        }
    })
    return 'OK';
})