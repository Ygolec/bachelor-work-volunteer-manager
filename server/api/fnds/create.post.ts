import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    await prisma.fnd.create({
        data: {
            ...body.fnd,
            eventId:body.eventId,
            times: {
                create: body.fnd.times.map((time: any[]) => {
                    return {
                        start: time[0],
                        end: time[1]
                    }
                })
            }
        }

    })

    return 'ok'
})
