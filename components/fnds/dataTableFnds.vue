<template>
    <alert :text="alertText" :color="alertColor" :snackbar="alert" @close="alert=false"/>
    <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="dataHeaders"
            :items="itemsOfFnd"
            item-value="id"
            class="elevation-1"
            loading-text="Loading... Please wait"
    >
        <template v-slot:top>
            <v-toolbar
                    flat
            >
                <v-toolbar-title>ФНД</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer/>
                <v-combobox
                        label="Выберите мероприятие"
                        :items="itemsOfEvent"
                        item-title="nameEvent"
                        v-model="selectedEvent"
                />
                <v-spacer/>
                <create-fnd :event="itemsOfEvent[0]" :create-fnd-dialog="createFndDialog" @close="createFndDialog=false"
                            @success-create="createFndDialog=false;getFnds()" @open="createFndDialog=true"
                            v-if="selectedEvent"/>
            </v-toolbar>
        </template>
        <template v-slot:item.times="{ item }">

            <v-chip v-for="time in item.raw.times">
                {{ formatTime(new Date(time.start)) }}-{{ formatTime(new Date(time.end)) }}
            </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-icon
                    size="small"
                    class="me-2"
                    @click="editFnd(item.raw)"
            >
                mdi-pencil

            </v-icon>
            <fnd-edit v-if="itemForEditFnd!=null && dialogEdit"
                      :fnds="itemForEditFnd"
                      :edit-event-dialog="dialogEdit"
                      :event="itemEvent"
                      @close="dialogEdit=false;getFnds()"/>

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
import FndEdit from "~/components/fnds/fndEdit.vue";
import CreateFnd from "~/components/fnds/createFnd.vue";

const alert: Ref<boolean> = ref(false)
const alertColor: Ref<string> = ref('')
const alertText: Ref<string> = ref('')

const dialogEdit: Ref<boolean> = ref(false)
const createFndDialog: Ref<boolean> = ref(false)

const text = ref()
const itemsPerPage = ref(5)
const dialogDelete: Ref<boolean> = ref(false)
const selectedEvent = ref()
const dataHeaders = ref([
    {title: 'Название ФНД', align: 'start', sortable: false, key: 'nameFND'},
    {title: 'Кол-во волонтеров', align: 'end', key: 'quantityVolunteerFND'},
    {title: 'Время работы', align: 'end', key: 'times'},
    {title: 'Действия', key: 'actions', sortable: false},

])
const {data: itemsOfEvent} = await useFetch("/api/event/get");
const itemsOfFnd = ref([])
watch(selectedEvent, () => {
    getFnds()
})

async function getFnds() {
    itemsOfFnd.value = await $fetch('/api/fnds/getByIdEvent', {params: {id: selectedEvent.value.id}})
}


const itemForDelete = ref()

function deleteEvent(item: any) {
    itemForDelete.value = item;
    dialogDelete.value = true;
    text.value = "Вы точно хотите удалить " + item.nameFND;
}

async function deleteItemConfirm() {
    await $fetch('/api/fnds/delete', {
        method: "delete",
        body: {id: itemForDelete.value.id}
    });
    getFnds()
    dialogDelete.value = false;
    alertColor.value = 'red';
    alertText.value = "ФНД" + itemForDelete.value.nameFND + " удалено!"
    alert.value = true
}

const itemForEditFnd = ref()
const itemEvent = ref()

function editFnd(item: any) {
    itemForEditFnd.value = item;
    if (itemsOfEvent.value)
        itemEvent.value = itemsOfEvent.value.find(({id}) => id === item.eventId);
    dialogEdit.value = true;
}

function formatTime(date: Date): string {
    const hours = ref(date.getHours().toString().padStart(2, '0'));
    const minutes = ref(date.getMinutes().toString().padStart(2, '0'));
    return `${hours.value}:${minutes.value}`;
}

</script>

<style scoped lang="scss">

</style>