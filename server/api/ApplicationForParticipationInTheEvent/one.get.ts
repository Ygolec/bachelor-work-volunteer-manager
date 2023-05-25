import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = getQuery(event)
    const user = await prisma.student.findUnique({where: {email: body.userEmail}})

    if (!user.id)
        return 'null';
    const requests = await prisma.applicationForParticipationInTheEvent.findMany({
        where: {
            eventId: +body.idEvent,
            studentId: user.id
        }
    })
    return requests;
})