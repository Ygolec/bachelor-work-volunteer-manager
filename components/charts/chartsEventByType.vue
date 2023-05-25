<template>
  <PieChart :chartData="testData"/>
</template>

<script setup lang="ts">
import {PieChart} from 'vue-chart-3';

const {data: chart} = await useFetch("/api/charts/eventsByType");
const testData = {
  labels: chart.value.map(item => item.type),
  datasets: [
    {
      data: chart.value.map(item => item._count.type),
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
};
</script>
<style scoped lang="scss">

</style>