import {da, el} from "vuetify/locale";

export function telephone(data:string){
    const pattern = "\\d{11}"
    if (data.match(pattern)){
        return true;
    }else return "Вы ввели неправильный номер телефона";
}
export function email(data:string) {
    const pattern="^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
    if (data.match(pattern)){
        return true;
    } else return "Вы ввели неправильный Email";
}
export function required(value: any): boolean | string {
    return !!value || 'Это обязательное поле'
}