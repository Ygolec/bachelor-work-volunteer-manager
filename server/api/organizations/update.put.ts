import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    await prisma.organization.update({
        where:{
            id:body.organizationID,
        },
        data:{
            name:body.organizationName
        }
    })
    return 'ok'
})