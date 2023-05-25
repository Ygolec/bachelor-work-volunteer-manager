<template>
  <v-list>
    <v-list-item>
      <v-btn
      @click="rating(ratingList)">
        Выгрузить отчет по рейтингу волонтеров
      </v-btn>
    </v-list-item>
  </v-list>


</template>
<script setup lang="ts">

import {rating} from "~/utils/reports";
const ratingList=await $fetch('/api/rating/all')
</script>
<style scoped lang="scss">

</style>