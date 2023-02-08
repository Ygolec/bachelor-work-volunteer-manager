<template>
<v-app>
  <v-app-bar class="bg-primary">
    <NuxtLink to="/authentication">Авторизация</NuxtLink>
    <NuxtLink to="/reqwestForMaintenance">Форма</NuxtLink>
<!--    <v-btn>Авторизация</v-btn>-->
  </v-app-bar>
  <v-main>
    <slot></slot>
  </v-main>
</v-app>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>