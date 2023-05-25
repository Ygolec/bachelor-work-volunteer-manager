<template>
  <alert :text="alertText" :color="alertColor" :snackbar="alert" @close="alert=false"/>

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
      :items="itemsOfStats"
      item-value="id"
      class="elevation-1"
      :search="search"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Статистика</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-combobox
            label="Выберите мероприятие"
            :items="itemsOfEvent"
            item-title="nameEvent"
            v-model="selectedEvent"
            clearable
            hide-details
        />
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer/>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
            hide-details
        ></v-text-field>
      </v-toolbar>
    </template>


    <template v-slot:item.actions="{ item }">
      <v-icon
          size="small"
          class="me-2"
          @click="editStat(item.raw)"
      >
        mdi-pencil

      </v-icon>
      <stats-of-volunteer-edit-stat
          v-if="itemForEdit!=null && dialogEdit"
          :stat="itemForEdit"
          :edit-stat-dialog="dialogEdit"
          @close="dialogEdit=false"
          @success-update="dialogEdit=false;getStats()"/>

      <v-icon
          size="small"
          @click="deleteStat(item.raw)"
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


const alert: Ref<boolean> = ref(false)
const alertColor: Ref<string> = ref('')
const alertText: Ref<string> = ref('')

const snackbar = ref(false)
const search = ref()
const textSnackbar = ref()
const timeoutSnackbar: Ref<number> = ref(5000)
const dialogDelete: Ref<boolean> = ref(false)
const dialogEdit: Ref<boolean> = ref(false)
const text = ref()
const itemsPerPage = ref(5)
const selectedEvent = ref()
const dataHeaders = ref([
  {title: 'ФИО', align: 'start', sortable: false, key: 'FIO'},
  {title: 'Время', align: 'end', key: 'numberOfHours'},
  {title: 'Рейтинг', align: 'end', key: 'rating'},
  {title: 'Комментарий', align: 'end', key: 'comment'},
  {title: 'Действия', key: 'actions', sortable: false},
])


const itemsOfStats = ref()

const {data: itemsOfEvent} = await useFetch("/api/event/get");
watch(selectedEvent, () => {
  getStats()
})

async function getStats() {
  itemsOfStats.value = await $fetch('/api/statsOfVolunteer/getByEvent', {params: {id: selectedEvent.value.id}})
}

const itemForDelete = ref()

function deleteStat(item: any) {
  itemForDelete.value = item;
  dialogDelete.value = true;
  text.value = "Вы точно хотите удалить " + item.FIO;
}

const itemForEdit = ref()

function editStat(item: any) {
  itemForEdit.value = item;
  dialogEdit.value = true;
}


async function deleteItemConfirm() {
  await $fetch('/api/statsOfVolunteer/delete', {
    method: "delete",
    body: {id: itemForDelete.value.id}
  });
  getStats()
  dialogDelete.value = false;
  alertColor.value = 'red';
  alertText.value = "ФНД" + itemForDelete.value.nameFND + " удалено!"
  alert.value = true
}


</script>

<style scoped lang="scss">

</style>