import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const id:number= +event.context.params.id
    const requests = await prisma.event.findUnique({
        where:{
            id:id
        },
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