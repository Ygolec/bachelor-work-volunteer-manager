<template>
    <v-snackbar
            v-model="props.snackbar"
            multi-line
            :color="props.color"
            @update:model-value="emit('close')"
            elevation="24"
    >
        {{ props.text }}
        <template v-slot:actions>
        <v-btn
                color="blue"
                variant="text"
                @click="emit('close')"
        >
            Close
        </v-btn>
        </template>

    </v-snackbar>
</template>

<script setup lang="ts">
import {Ref} from "vue";

const emit = defineEmits<{
    (e: 'close'): void
}>()
const props = defineProps<{
    snackbar: boolean,
    text: string,
    color: string
}>()

</script>

<style scoped lang="scss">

</style>