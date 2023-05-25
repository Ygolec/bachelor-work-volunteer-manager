import {FndTime, PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    await prisma.fndTime.deleteMany({
        where: {
            fndId:body.id,
            id: {
                notIn: body.times.map(time=>time.id||0)
            }
        }
    })

    const createdEvent = await prisma.fnd.update({
        where: {
            id: body.id
        },
        data: {
            nameFND: body.nameFND,
            dateFND: body.dateFND,
            times: {
                upsert: body.times.map((time: FndTime) => {
                    return {
                        create: {start: time.start, end: time.end},
                        update: {start: time.start, end: time.end},
                        where: {id: time.id || 0}
                    }
                })
            },
            addresses: body.addresses,
            quantityVolunteerFND: body.quantityVolunteerFND,
            descriptionFND: body.descriptionFND
        },
        include:{
            times: true
        }
    })

    return 'good'
})
