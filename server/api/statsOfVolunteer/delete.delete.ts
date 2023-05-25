import {PrismaClient} from "@prisma/client";



const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const deleteStat=await prisma.statsOfVolunteer.delete({
        where:{
            id:body.id
        }
    })

    return 'delete'
})