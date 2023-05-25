import isAllowedRequest from "~/ts/isAllowedRequest";
import {storeToRefs} from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (isAllowedRequest(to.path))
        return
    if (!isAllowedRequest(to.path)) {
        const verify = await $fetch('/api/auth/verify', {
            method: "get"
        });
        const store = useUserStore()
        if (!verify) {
            store.$reset()
            return navigateTo('/authentication', {redirectCode: 401})
        } else return
    }
})