import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const requests = await prisma.event.findMany({
        include:{
            organizations:true,
            fnds:{
                include:{
                    times: true
                }
            }
        }
    })
    return requests;
})