import {defineStore} from "pinia";
import {Ref} from "vue";


export const useUserStore = defineStore('User', () => {

    const email = useLocalStorage("email", () => '');
    const roles: Ref<string[]> = useLocalStorage("roles", () => []);
    const name: Ref<string> = useLocalStorage("name", () => '');
    const token = useCookie("token", {default: () => ''});

    async function login(mail: string, pass: string) {
        const response = await $fetch('/api/auth/login', {
            body: {email: mail, password: pass},
            method: 'post'
        }).then(res=>{
            token.value = res.token;
            email.value = res.user.email;
            roles.value = res.user.roles;
            name.value = res.user.name;
        })
    }
    function $reset(){
        token.value = '';
        email.value = '';
        roles.value = '';
        name.value = '';
    }

    return {email, roles, token, login, name,$reset}
})

