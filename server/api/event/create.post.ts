import {PrismaClient} from "@prisma/client";

import path from "path";
import {MultiPartData, readMultipartFormData} from "h3";
import fs from "fs";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const form: MultiPartData[] = await readMultipartFormData(event) ?? []
    if (!form) return false
    let body: any = {}
    form.forEach(value => {
        if (!value.filename) {
            // console.log(value.data.toString());
            // @ts-ignore
            body[value.name] = JSON.parse(value.data.toString())
        }
    })
    form.forEach(value => {
        if (value.filename) {
            const filename = form[0].filename;
            if (!filename)
                return 'error'
            const buffer = Buffer.from(form[0].data)
            const ext = filename.split('.').at(-1) ?? ''
            const nameFile = filename
            const fileSaveDirectory = "./public/upload/images/events"
            const pathString = path.join(
                fileSaveDirectory,
                body.nameEvent,
                `${nameFile}`
            )
            fs.mkdirSync(path.dirname(pathString), {recursive: true})
            fs.writeFileSync(pathString, buffer)
            body.mainImagePath = pathString.replace(/^public\\/,'');
        }
    })


    // console.log(body);
    const createdEvent= await prisma.event.create({
        data: {
            nameEvent: body.nameEvent,
            addressEvent: body.addressEvent,
            descriptionEvent: body.descriptionEvent,
            quantityVolunteer: body.quantityVolunteer,
            skills: body.skills,
            clothingVolunteer: body.clothingVolunteer,
            ageRestrictions: body.ageRestrictions,
            date:body.date,
            type:body.typeEvent,
            level:body.levelEvent,
            fnds: {
                create: body.fnds.map((item: { times: any; }) => {
                    return {
                        ...item,
                        times: {
                            create: item.times.map((time: any[]) => {
                                return {
                                    start: time[0],
                                    end: time[1]
                                }
                            })
                        }
                    }
                })
            },
            mainImagePath: body.mainImagePath
        }
    })
     Promise.all(body.organizations.map(async (org: string) => {
         return prisma.event.update({
             where: {
                 id: createdEvent.id,
             },
             data: {
                 organizations: {
                     connectOrCreate: {
                         create: {
                             name: org
                         },
                         where: {
                             name: org
                         }
                     }
                 }
             }
         });
     }))
    const findOrg=await prisma.event.findUnique({
        where:{
            id:createdEvent.id
        }
    })
    return 'ok'
})
