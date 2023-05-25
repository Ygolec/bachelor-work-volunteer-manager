import {ApplicationStatus, PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const needStudent = await prisma.student.findUnique({
        where: {
            email: body.userEmail
        }
    })

    const findApplication = await prisma.applicationForParticipationInTheEvent.findFirst({
        where: {
            fndId: +body.idFnd,
            eventId: +body.idEvent,
            studentId: needStudent.id
        }
    })
    if (findApplication) {
        await prisma.applicationForParticipationInTheEvent.update({
            where: {
                id: findApplication.id,
            },
            data:{
                status:ApplicationStatus.SEND
            }
        })
    } else
        await prisma.applicationForParticipationInTheEvent.create({
            data: {
                event: {
                    connect: {
                        id: body.idEvent
                    }
                },
                fnds: {
                    connect: {
                        id: body.idFnd
                    }
                },
                student: {
                    connect: {
                        email: body.userEmail
                    }
                },
                status: ApplicationStatus.SEND
            }
        })

    return 'ok'
})
