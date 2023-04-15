import {PrismaClient} from "@prisma/client";

import path from "path";
import {MultiPartData, readMultipartFormData} from "h3";
import * as fs from "fs";

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const form: MultiPartData[] = await readMultipartFormData(event) ?? []
    if (!form) return false
    const filename = form[0].filename;
    if (!filename)
        return 'error'
    const buffer = Buffer.from(form[0].data)
    const ext = filename.split('.').at(-1) ?? ''
    const nameFile = filename
    const fileSaveDirectory = "./public/test"
    const pathString = path.join(
        fileSaveDirectory,
        'image',
        `${nameFile}`
    )
    fs.mkdirSync(path.dirname(pathString), {recursive: true})
    fs.writeFileSync(pathString, buffer)
    return 'ok'
})
