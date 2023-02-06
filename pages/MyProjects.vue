<template>
  <students-projects v-if="user.typeUser==='Student'"></students-projects>
</template>

<script setup lang="ts">


  const user=useUserStore();
</script>

<style scoped lang="scss">

</style>