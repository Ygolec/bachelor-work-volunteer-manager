import {PrismaClient} from "@prisma/client";
import fs from "fs";
import path from "path";


const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const deleteEvent=await prisma.event.delete({
        where:{
            id:body.id
        }
    })

    const pathToImage:any=deleteEvent.mainImagePath
    const pathToRemove='public/'+path.parse(pathToImage).dir
    fs.rmSync(pathToRemove, { recursive: true, force: true });
    return 'delete'
})