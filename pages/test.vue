<template>
    <v-file-input
            show-size
            label="Изображение мероприятия"
            v-model="mainImage"></v-file-input>
    <v-btn
    @click="sendImage()"></v-btn>

</template>

<script setup lang="ts">
import {Ref} from "vue";

const mainImage:Ref<File[]>=ref([])
async function sendImage() {
    const formData = new FormData()
    formData.append('image', mainImage.value[0]);
    await $fetch('/api/test', {
            method: 'POST',
            body: formData
        }
    )
}
</script>

<style scoped lang="scss">

</style>