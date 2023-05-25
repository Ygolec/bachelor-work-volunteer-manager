<template>
  <v-card>
    <v-tabs
        v-model="tab"
        bg-color="primary"
    >
      <v-tab value="one">График по типу мероприятий</v-tab>
      <v-tab value="two">График по уровню мероприятий</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <charts-event-by-type/>
        </v-window-item>

        <v-window-item value="two">
          <charts-event-by-level/>
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>

</template>
<script setup lang="ts">
import ChartsEventByType from "~/components/charts/chartsEventByType.vue";

const tab = ref()

</script>
<style scoped lang="scss">

</style>