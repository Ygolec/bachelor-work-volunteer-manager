<template>
    <alert :color="eventColor" :snackbar="event" :text="eventText" @close="event=false"/>
    <v-container class="fill-height">
        <v-layout class="d-flex fill-height flex-grow-1 align-center justify-center ">
            <v-card min-width="400px" class="elevation-12">
                <v-toolbar color="primary">
                    <v-toolbar-title>Авторизация</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form class="pa-4 form" validate-on="submit" @submit.prevent="login()">
                        <v-text-field
                                class=""
                                prepend-icon="mdi-account"
                                v-model="email"
                                label="Email"
                                type="email"
                                :rules="[required]">
                        </v-text-field>
                        <v-text-field
                                class="py-2"
                                prepend-icon="mdi-lock"
                                v-model="userPassword"
                                label="Пароль"
                                type="password"
                                :rules="[password,required]"
                        >
                        </v-text-field>
                        <div class="d-flex justify-space-between">
                            <v-btn color="primary"
                                   class="mr-4 flex-grow-1"

                                   type="sumbit"
                            >
                                Войти
                            </v-btn>
                            <registration-form/>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-layout>
    </v-container>


</template>

<script setup lang="ts">
import {password, required} from "~/utils/rules";

import Alert from "~/components/alert.vue";
import {Ref} from "vue";

const email = ref("")
const userPassword: Ref<string> = ref("")
const organizations = ref();

const event: Ref<boolean> = ref(false)
const eventColor: Ref<string> = ref('')
const eventText: Ref<string> = ref('')

function login() {
    useUserStore().login(email.value, userPassword.value).then(successfulLogin)

}

function successfulLogin() {
    eventColor.value = 'green';
    eventText.value = 'Вы авторизировались!';
    event.value = true;
    window.open("/events","_self")
}
</script>

<style scoped lang="scss">
.form {

}
</style>