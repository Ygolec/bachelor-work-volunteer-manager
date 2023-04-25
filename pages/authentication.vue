<template>
  <v-container class="fill-height">
    <v-layout class="d-flex fill-height flex-grow-1 align-center justify-center ">
      <v-card min-width="400px" class="elevation-12">
        <v-toolbar color="primary">
          <v-toolbar-title>Авторизация</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form class="pa-4 form">
            <v-text-field
                class=""
                prepend-icon="mdi-account"
                v-model="email"
                label="Email"
                required>
            </v-text-field>
            <v-text-field
                class="py-2"
                prepend-icon="mdi-lock"
                v-model="password"
                label="Пароль"
                type="password"
                required>
            </v-text-field>
            <div class="d-flex justify-space-between">
              <v-btn color="primary"
                     class="mr-4 flex-grow-1"
              @click="login()">
                Войти
              </v-btn>
              <registration-form/>
            </div>
            <v-btn
                color="info"
                block
                class="mt-2">
              Сибгу
            </v-btn>

          </v-form>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>


</template>

<script setup lang="ts">

const email = ref("")
const password = ref("")
const organizations = ref();



function login(){
        useUserStore().login(email.value,password.value)
}
</script>

<style scoped lang="scss">
.form {

}
</style>