<template>
    <v-app id="inspire">
        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-sheet
                        rounded="lg"
                        class="pa-3"
                >
                    <v-card
                            class="mx-auto pa-3"
                            color="black-lighten-1"
                    >
                        <v-toolbar flat color="green" class="mb-3">
                            <v-btn icon="mdi-account"></v-btn>

                            <v-toolbar-title class="font-weight-light">
                                Профиль пользователя
                            </v-toolbar-title>

                            <v-spacer></v-spacer>

                            <v-btn
                                    icon
                                    @click="isEditing = !isEditing"
                            >
                                <v-fade-transition leave-absolute>
                                    <v-icon v-if="isEditing">mdi-check</v-icon>

                                    <v-icon v-else>mdi-pencil</v-icon>
                                </v-fade-transition>
                            </v-btn>
                        </v-toolbar>
                        <v-row>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4">
                                <v-text-field
                                        label="Имя"
                                        hint="Эта информация будет использоваться для написания благодарственных писем"
                                        v-model="user.name"
                                        :rules="[required]"
                                        :disabled="!isEditing"
                                        required
                                >
                                </v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4">
                                <v-text-field
                                        label="Фамилия"
                                        v-model="user.surName"
                                        hint="Эта информация будет использоваться для написания благодарственных писем"
                                        :rules="[required]"
                                        :disabled="!isEditing"
                                        required
                                >
                                </v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4">
                                <v-text-field
                                        label="Отчество"
                                        v-model="user.middleName"
                                        hint="Эта информация будет использоваться для написания благодарственных писем"
                                        :rules="[required]"
                                        :disabled="!isEditing"
                                        required
                                >
                                </v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="5"
                                    md="5">
                                <v-autocomplete
                                        label="Институт"
                                        v-model="user.insitution"
                                        :items="institutions"
                                        :disabled="!isEditing"
                                        :rules="[required]"
                                        required
                                >
                                </v-autocomplete>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="5"
                                    md="5">
                                <v-autocomplete
                                        label="Группа"
                                        v-model="user.group"
                                        :rules="[required]"
                                        :items="group"
                                        :disabled="!isEditing"
                                        required
                                >
                                </v-autocomplete>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="2"
                                    md="2">
                                <v-label class="genderLabel text-subtitle-2">Пол</v-label>
                                <v-btn-toggle
                                        class="genderInput"
                                        :disabled="!isEditing"
                                        variant="outlined"
                                        v-model="user.gender">
                                    <v-btn value="man">М</v-btn>
                                    <v-btn value="woman">Ж</v-btn>
                                </v-btn-toggle>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        label="Номер телефона"
                                        hint="Эта информация будет использоваться для связи с вами"
                                        prefix="8"
                                        placeholder="8005553535"
                                        :disabled="!isEditing"
                                        :rules="[telephone,required]"
                                        v-model="user.telNumber"
                                        counter
                                        maxlength="10"
                                        type="tel"
                                        required
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        label="Дата рождения"
                                        :disabled="!isEditing"
                                        hint="Эта информация будет использоваться для выбора мероприятий"
                                        :model-value="user.birthday.getFullYear() + '-' + (user.birthday.getMonth()+1).toString().padStart(2,'0') + '-' + user.birthday.getDate().toString().padStart(2,'0')"
                                        :rules="[birthday]"
                                        type="date"
                                        required
                                        @update:modelValue="value=>user.birthday=new Date(value)"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                        label="Email"
                                        hint="Эта информация будет использоваться для восстановления пароля и подверждения данных"
                                        type="email"
                                        :disabled="!isEditing"
                                        v-model="user.email"
                                        :rules="[email,required]"
                                        placeholder="test@gmail.com"
                                        required
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-sheet>
            </v-container>
        </v-main>
    </v-app>
    {{user}}
</template>

<script setup lang="ts">
import {birthday, email, required, telephone} from "~/utils/rules";
import {StudentRegistration} from "~/server/api/auth/register.post";
import type  {Student} from "@prisma/client";
import {Ref} from "vue";

const isEditing = ref()
const institutions = ref(['ИИТК', 'ИКТ'])
const group = ref(['БИС19-01'])
const student: StudentRegistration = reactive({
    name: "",
    surName: "",
    middleName: "",
    insitution: "",
    group: "",
    telNumber: "",
    birthday: new Date(),
    email: "",
    password: "",
    gender: "man",
})
const token = useCookie("token", {default: () => ''});
const user=ref({
    name: "",
    surName: "",
    middleName: "",
    insitution: "",
    group: "",
    telNumber: "",
    birthday: new Date(),
    email: "",
    gender: "man",
})
getUser()


async function getUser() {
    user.value=await $fetch('/api/users/byToken', {
        method: 'GET',
        params: {
            token: token.value
        }
    });
    user.value.birthday=new Date(user.value.birthday);
}


</script>

<style scoped lang="scss">

</style>