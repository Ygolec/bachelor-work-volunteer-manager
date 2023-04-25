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
                <v-toolbar-title>Мероприятия</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <create-event @success-create="refresh()"></create-event>
            </v-toolbar>
        </template>
        <template v-slot:item.organizations="{ item }">

            <v-chip v-for="org in item.props.title.organizations" :key="org.id">
                {{ org.name }}
            </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                size="small"
                class="me-2"
                @click="editEvent(item.raw)"
            >
                mdi-pencil

            </v-icon>

            <event-edit v-if="itemForEdit!=null && dialogEdit"
                :edit-event-dialog="dialogEdit"
                :event="itemForEdit"
                @close="dialogEdit=false"
            />
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
import ConfirmDialog from "~/components/confirmDialog.vue";
import {Ref} from "vue";
import EventEdit from "~/components/events/eventEdit.vue";
import CreateEvent from "~/components/events/createEvent.vue";


const snackbar=ref(false)
const textSnackbar=ref()
const timeoutSnackbar:Ref<number>=ref(5000)
const dialogDelete: Ref<boolean> = ref(false)
const dialogEdit: Ref<boolean> = ref(false)
const text=ref()
const itemsPerPage = ref(5)
const dataHeaders = ref([
    {title: 'Название мероприятия', align: 'start', sortable: false, key: 'nameEvent'},
    {title: 'Организаторы', align: 'end', key: 'organizations'},
    {title: 'Кол-во волонтеров', align: 'end', key: 'quantityVolunteer'},
    {title: 'Действия', key: 'actions', sortable: false},
    /*    {title: 'Видимость', align: 'end', key: ''},
        {title: 'Статус мероприятия', align: 'end', key: ''},*/
])

const {data:itemsOfEvent,pending,refresh} = await useFetch("/api/event/get");
const itemForEdit=ref()
function editEvent(item: any) {
    itemForEdit.value=item;
    dialogEdit.value=true;
}
const itemForDelete=ref()
function deleteEvent(item: any) {
    itemForDelete.value=item;
    dialogDelete.value = true;
   text.value="Вы точно хотите удалить " + item.nameEvent;
}

async function deleteItemConfirm() {
    await $fetch('/api/event/delete', {
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