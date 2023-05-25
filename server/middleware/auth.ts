import isAllowedRequest from "~/ts/isAllowedRequest";
import isAllowedRole from "~/ts/isAllowedRole";
import jwt from "jsonwebtoken";

const SECRET_KEY: string = useRuntimeConfig().secretKey
export default defineEventHandler((event) => {
    const url = event.node.req.url;
    if (!url) return

    if (isAllowedRequest(url, getMethod(event))) return
    const token = getCookie(event, 'token')

    if (!token) {
        return sendRedirect(event, '/authentication', 401)
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        if (isAllowedRole(url, getMethod(event),decoded.roles[0]))
            return
        else return sendRedirect(event, '/authentication', 401)
    } catch (e) {
        return sendRedirect(event, '/authentication', 401)
    }
})