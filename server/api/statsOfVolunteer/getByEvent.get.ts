import {ApplicationStatus, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = getQuery(event)

    const requests = await prisma.statsOfVolunteer.findMany({
       where:{
           fnd:{
               eventId:+body.id
           }
       },
        include:{
           student:true,
            fnd:true
        }
    })
    const newRequests = requests.map(item => {
            return {
                ...item,
                FIO:item.student.surName+' '+item.student.name+' '+item.student.middleName
            }
        }
    )
    return newRequests;
})