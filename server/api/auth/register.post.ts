import {PrismaClient, Student} from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient()
export type StudentRegistration = Omit<Student, 'id' | 'dateOfRegistration' | 'lastActivity' | 'roles'>;
export default defineEventHandler(async (event) => {

    const body:StudentRegistration = await readBody(event)
    const saltRounds = 10;

    body.password=await bcrypt.hash(body.password, saltRounds);

    await prisma.student.create({
        data: body
    })
    return true
})