<template>
  <v-app>
    <v-app-bar class="bg-primary">
      <v-btn
          v-for="(link,index) in nameOfLinks">
        <NuxtLink :to="links[index]">{{ link }}</NuxtLink>
      </v-btn>
      <v-btn
          v-for="(link,index) in nameOfLinksAdmin" v-if="roles==='ADMIN'">
        <NuxtLink :to="linksAdmin[index]">{{ link }}</NuxtLink>
      </v-btn>
      <v-btn
          v-for="(link,index) in nameOfLinksTeamLeader" v-if="roles==='TEAMLEADER'">
        <NuxtLink :to="linksTeamLeader[index]">{{ link }}</NuxtLink>
      </v-btn>

      <v-spacer/>
      <user-avatar :name="name" :email="email" @exit="exitProfile()"/>

    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import UserAvatar from "~/components/userAvatar.vue";

const nameOfLinks = ref(['Авторизация', 'Форма', 'Мероприятия', 'Рейтинг'])
const links = ref(['/authentication', '/reqwestForMaintenance', '/events', '/rating'])
const nameOfLinksAdmin = ref(['Администрирование', 'Тим-лидер'])
const linksAdmin = ref(['/adminPanel', '/teamLeader'])
const nameOfLinksTeamLeader = ref(['Тим-лидер'])
const linksTeamLeader = ref(['/teamLeader'])
const {email, name, roles} = storeToRefs(useUserStore())

function exitProfile() {
  let Cookies = document.cookie.split(';');
  for (let i = 0; i < Cookies.length; i++) {
    document.cookie = Cookies[i] + "=; expires=" + new Date(0).toUTCString();
  }
  email.value = '';
  name.value = '';
  roles.value = '';
}
</script>

<style scoped lang="scss">
a {
  color: white;
  text-decoration: none;
}
</style>