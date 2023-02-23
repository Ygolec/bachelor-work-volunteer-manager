<template>
<v-list>
  <v-list-item
  v-for="item in listOfVolunteerRequests"
  :title="item.nameEvent"
  :subtitle="item.descriptionEvent">
  </v-list-item>
</v-list>
</template>

<script setup lang="ts">
const listOfVolunteerRequests= await $fetch('/api/volunteerSupportRequest')
</script>

<style scoped lang="scss">

</style>