<template>
    <v-dialog v-model="props.confirmDialog" max-width="500px">
        <v-card>
            <v-card-title class="text-h5"><slot/></v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="emit('close')">Отменить</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="emit('confirm')">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'confirm' ): void
}>()

const props=defineProps<{
    confirmDialog:boolean,
}>()



</script>

<style scoped lang="scss">

</style>