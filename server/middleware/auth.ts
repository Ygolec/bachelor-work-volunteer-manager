import isAllowedRequest from "~/ts/isAllowedRequest";
import jwt from "jsonwebtoken";

const SECRET_KEY: string = useRuntimeConfig().secretKey
export default defineEventHandler((event) => {
    const url = event.node.req.url;
    if (!url) return

    if (isAllowedRequest(url, getMethod(event))) return
    const token = getCookie(event, 'token')

    if (!token) {
        return sendRedirect(event, '/auth', 401)
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return
    } catch (e) {
        throw createError({statusCode: 401})
    }
})