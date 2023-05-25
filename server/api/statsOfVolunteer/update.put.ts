import { PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
   await prisma.statsOfVolunteer.update({
       where:{
           id:body.id
       },
       data:{
           numberOfHours:+body.numberOfHours,
           comment:body.comment,
           rating:body.rating,
       }
   })

    return 'good'
})
