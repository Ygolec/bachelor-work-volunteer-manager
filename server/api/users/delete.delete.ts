import {PrismaClient} from "@prisma/client";



const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const deleteEvent=await prisma.student.delete({
        where:{
            id:body.id
        }
    })
    
    return 'delete'
})