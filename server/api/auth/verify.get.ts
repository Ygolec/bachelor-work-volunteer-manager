import jwt from "jsonwebtoken";

const SECRET_KEY: string = useRuntimeConfig().secretKey
export default defineEventHandler((event) => {

    const token = getCookie(event, 'token')
    if (!token) {
        return false
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return true
    } catch (e) {
        return false
    }

})