<template>
<v-card>
    <v-img :src=""></v-img>
    <v-card-title></v-card-title>
    <v-card-subtitle></v-card-subtitle>
    <v-card-actions>
        <v-btn></v-btn>
    </v-card-actions>
</v-card>
</template>

<script setup lang="ts">
import {Event} from "@prisma/client";

const events:Event=await $fetch('/api/events')


</script>

<style scoped lang="scss">

</style>