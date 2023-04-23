<template>
    <v-dialog
            v-model="props.editOrganizationdialog"
            persistent
            width="1024">
        <v-card>
            <v-form>
                <v-card-title>
                    <v-row>
                        <v-col
                                cols="12"
                                sm="6"
                                md="7">
                            Редактирование организации {{ props.organization.name }}
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
                                        v-model="organizationName">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            color="success"
                            @click="updateOrganization()">Обновить организацию
                    </v-btn>
                    <v-btn
                            color="accent"
                            @click="emit('close')">Отменить редактирование
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>

    </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'close'): void,
}>()
const props = defineProps<{
    editOrganizationdialog: boolean,
    organization: any
}>()

const organizationName = ref(props.organization.name)
const organizationID:Ref<number>=ref(props.organization.id)

async function updateOrganization() {
    await $fetch('/api/organizations/update', {
        method: 'put',
        body: reactive({
            organizationID,
            organizationName
        })
    });
emit("close")
}
</script>

<style scoped lang="scss">

</style>