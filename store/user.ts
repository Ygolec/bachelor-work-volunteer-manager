import {defineStore} from "pinia";
import {Ref} from "vue";

export const useUserStore = defineStore('User', () => {

    const email = useLocalStorage("email",()=>'');
    const roles:Ref<string[]> = useLocalStorage("roles",()=>[]);
    const token = useCookie("token", {default: () => ''});

    async function login(mail: string, pass: string) {
        const response = await $fetch('/api/auth/login', {body: {email: mail, password: pass}, method: 'post'});
        token.value = response.token;
        email.value=response.user.email;
        roles.value=response.user.roles;
    }

    return {email,roles,token,login}
})

