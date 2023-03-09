import {PrismaClient, Student} from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {

    const body:Omit<Student, 'id'| 'dateOfRegistration'|'lastActivity'> = await readBody(event)
    const saltRounds = 10;

    body.password=await bcrypt.hash(body.password, saltRounds);

    await prisma.student.create({
        data: body
    })
    return true
})