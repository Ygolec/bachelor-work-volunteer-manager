import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    prisma.fnd.createMany(body.fnds)
    const newRequest = await prisma.volunteerSupportRequest.create({
        data: {
            organizations: {
                connectOrCreate:{
                    create:{
                        name:body.organizations[0]
                    },
                    where:{
                        name:body.organizations[0]
                    }
                }
            },
            fio:body.fio,
            phone:body.phone,
            mail:body.mail,
            post:body.post,
            nameEvent:body.nameEvent,
            date:body.date,
            addressEvent:body.addressEvent,
            descriptionEvent:body.descriptionEvent,
            quantityVolunteer:body.quantityVolunteer,
            skills:body.skills,
            clothingVolunteer:body.clothingVolunteer,
            ageRestrictions:body.ageRestrictions,
            fnds:{
                create: body.fnds
            }
        }
    })

    console.log(body)
    return newRequest
})
