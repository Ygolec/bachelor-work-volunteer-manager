import {defineStore} from "pinia";

export const useUserStore=defineStore('User',()=>{
    const name=ref('Daniil')
    const typeUser=ref('Student')
    /*const typeUser=ref('Teacher')*/
    const photo=ref("")
    const isAuthorized=ref(true)

    return {name,typeUser,photo,isAuthorized}
})