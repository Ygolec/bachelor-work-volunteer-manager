import {ApplicationStatus, PrismaClient, StatsOfVolunteer} from "@prisma/client";


const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    console.log(body)
    await prisma.statsOfVolunteer.createMany({
        data:
            body.map(item => {
                return {
                    studentId:item.app.student.id,
                    fndId:item.app.fndId,
                    numberOfHours: +item.hours,
                    rating: item.rating,
                    comment: item.comment
                }
            })
    })

    return 'ok'
})
