<template>
  <v-card>
    <v-tabs
        v-model="tab"
        bg-color="primary"
    >
      <v-tab value="one">Отчеты по мероприятию</v-tab>
      <v-tab value="two">Другие отчеты</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <reports-data-table-events/>
        </v-window-item>

        <v-window-item value="two">
          <other-reports/>
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>

</template>
<script setup lang="ts">


import OtherReports from "~/components/reports/otherReports.vue";

const tab = ref()

</script>
<style scoped lang="scss">

</style>