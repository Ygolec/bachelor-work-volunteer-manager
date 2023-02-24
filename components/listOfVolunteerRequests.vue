<template>
  <v-card
      class="mx-auto"
      width="400px"
      variant="outlined"
      v-for="(item, index) in listOfVolunteerRequests">
    <v-card-item>
      <v-card-title>
        {{item.nameEvent}}
      </v-card-title>
      <v-card-subtitle>
        {{item.organizations[index].name}}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      {{item.descriptionEvent}}
    </v-card-text>
  </v-card>

</template>

<script setup lang="ts">
const listOfVolunteerRequests = await $fetch('/api/volunteerSupportRequest')
</script>

<style scoped lang="scss">

</style>