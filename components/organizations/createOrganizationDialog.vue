<template>
    <v-dialog
            v-model="dialogOrganization"
            persistent
            width="1024">
        <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                class="flex-grow-1"
                v-bind="props"
            >
                Создать организацию
            </v-btn>
        </template>
        <v-card>
            <v-form>
                <v-card-title>
                    <v-row>
                        <v-col
                                cols="12"
                                sm="6"
                                md="7">
                            Создание организации
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                    cols="12">
                                <v-text-field
                                        label="Организатор"
                                        v-model="nameOrganization">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            color="success"
                            @click="createOrganization()">Создать организацию
                    </v-btn>
                    <v-btn
                            color="accent"
                            @click="cancelCreate()">Отменить создание
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>

    </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'successCreate'): void
}>()
const dialogOrganization = ref(false)
const nameOrganization = ref('')

function cancelCreate() {
    dialogOrganization.value = false
}

async function createOrganization() {
    await $fetch('/api/organizations/create', {
        method: "POST",
        body: nameOrganization.value
    });
    emit('successCreate')
    dialogOrganization.value = false;
}
</script>

<style scoped lang="scss">

</style>