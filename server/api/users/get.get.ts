import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const requests = await prisma.student.findMany()
    const newRequests = requests.map(item => {
            return {
                ...item,
                FIO:item.surName+' '+item.name+' '+item.middleName
            }
        }
    )
    return newRequests;
})