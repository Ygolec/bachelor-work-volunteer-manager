import {PrismaClient} from "@prisma/client";



const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const deleteEvent=await prisma.fnd.delete({
        where:{
            id:body.id
        },
        include:{
            times:true
        }
    })

    return 'delete'
})