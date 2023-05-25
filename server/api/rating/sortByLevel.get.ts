import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = getQuery(event)

        const requests = await prisma.statsOfVolunteer.groupBy({
            by: ['studentId'],
            _sum: {
                numberOfHours: true,
            },
            _count: {
                fndId: true
            },
            where:{
                fnd:{
                    event:{
                        level: body.sortByLevel
                    }
                }
            },
            orderBy: {
                _sum: {
                    numberOfHours: 'desc'
                }
            },

        })
        const students = await prisma.student.findMany({
            where: {
                id: {
                    in: requests.map(item => item.studentId)
                }
            }
        })
        return requests.map((item, index) => {
            const student = students.find(value => value.id === item.studentId);
            if (student)
                return {
                    ...item,
                    student: student.surName + ' ' + student.name + ' ' + student.middleName,
                    place: index + 1
                }
        })
})