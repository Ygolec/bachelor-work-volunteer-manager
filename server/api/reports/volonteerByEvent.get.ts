import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = getQuery(event)
    if (!body.id)
        return 'null';
    const events = await prisma.event.findUnique({
        where: {
            id: +body.id
        },
        include: {
            fnds: {
                include: {
                    StatsOfVolunteer: {
                        include: {
                            student: true
                        }
                    }
                }
            }
        }
    })
    const statsOfVolonteer = await prisma.statsOfVolunteer.findMany({
            where: {
                fndId: {
                    in: events.fnds.map(item => item.id)
                }
            },
            include: {
                student: true,
                fnd: true
            }
        }
    )
    return statsOfVolonteer;
})