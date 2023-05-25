import {ApplicationStatus, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = getQuery(event)

    const needStudent=await prisma.student.findUnique({
        where:{
            email:body.userEmail
        }
    })

    const revokeApplication=await prisma.applicationForParticipationInTheEvent.findFirst({
        where:{
            fndId:+body.idFnd,
            eventId:+body.idEvent,
            studentId:needStudent.id
        }
    })

    const requests = await prisma.applicationForParticipationInTheEvent.update({
        where: {
            id: revokeApplication.id,
        },
        data:{
            status:ApplicationStatus.REJECTED
        }
    })
    return 'OK';
})