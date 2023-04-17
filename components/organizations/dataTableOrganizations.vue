<template>
    <v-snackbar
            v-model="snackbar"
            :timeout="timeoutSnackbar"
    >
        {{ textSnackbar }}

        <template v-slot:actions>
            <v-btn
                    color="blue"
                    variant="text"
                    @click="snackbar = false"
            >
                Закрыть
            </v-btn>
        </template>
    </v-snackbar>
    <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="dataHeaders"
            :items="itemsOfEvent"
            item-value="id"
            class="elevation-1"
            :loading="pending"
            loading-text="Loading... Please wait"
    >
        <template v-slot:top>
            <v-toolbar
                    flat
            >
                <v-toolbar-title>Организации</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <create-organization-dialog @success-create="refresh()"/>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
                        <v-icon
                                size="small"
                                class="me-2"
                                @click="dialogEdit=true"
                        >
                            mdi-pencil
                        </v-icon>

                        <v-icon
                                size="small"
                                @click="deleteEvent(item.raw)"
                        >
                            mdi-delete
                        </v-icon>
                        <confirm-dialog @close="dialogDelete=false"
                                        :confirm-dialog="dialogDelete"
                                        @confirm="deleteItemConfirm()">
                            {{ text }} ?
                        </confirm-dialog>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">
import {Ref} from "vue";
import CreateOrganizationDialog from "~/components/organizations/CreateOrganizationDialog.vue";

const snackbar=ref(false)
const textSnackbar=ref()
const timeoutSnackbar:Ref<number>=ref(5000)
const dialogDelete: Ref<boolean> = ref(false)
const dialogEdit: Ref<boolean> = ref(false)
const text=ref()
const itemsPerPage = ref(5)
const dataHeaders = ref([
    {title: 'Название', align: 'start', sortable: false, key: 'name'},
    {title: 'Действия', key: 'actions', sortable: false}
])

const {data:itemsOfEvent,pending,refresh} = await useFetch("/api/organizations/get");

const itemForDelete=ref()
function deleteEvent(item: any) {
    itemForDelete.value=item;
    dialogDelete.value = true;
    text.value="Вы точно хотите удалить " + item.name;

}
async function deleteItemConfirm() {
    await $fetch('/api/organizations/delete', {
        method: "delete",
        body: {id: itemForDelete.value.id}
    });
    refresh()
    dialogDelete.value = false;
    textSnackbar.value="Мероприятие " + itemForDelete.value.name + " удалено!"
    snackbar.value=true
}

</script>

<style scoped lang="scss">

</style>