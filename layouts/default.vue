<template>
<v-app>
  <v-app-bar class="bg-primary">
    <v-btn
        v-for="(link,index) in nameOfLinks">
      <NuxtLink :to="links[index]">{{link}}</NuxtLink>
    </v-btn>
      {{email}}
  </v-app-bar>
  <v-main>
    <slot></slot>
  </v-main>
</v-app>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";

const nameOfLinks=ref(['Авторизация','Форма','Мероприятия','Администрирование'])
const links=ref(['/authentication','/reqwestForMaintenance','/events','/adminPanel'])
const {email}=storeToRefs(useUserStore())
</script>

<style scoped lang="scss">
  a{
    color: white;
    text-decoration: none;
  }
</style>