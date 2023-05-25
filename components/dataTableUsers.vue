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
      :items="itemsOfUsers"
      item-value="id"
      class="elevation-1"
      :search="search"
      :loading="pending"
      loading-text="Loading... Please wait"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Пользователи</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
            hide-details
        ></v-text-field>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <registration-form/>
      </v-toolbar>
    </template>
    <template v-slot:item.dateOfRegistration="{ item }">
      {{ new Date(item.raw.dateOfRegistration).toLocaleString('ru') }}
    </template>
    <template v-slot:item.lastActivity="{ item }">
      {{ new Date(item.raw.lastActivity).toLocaleString('ru') }}
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
          @click="deleteUser(item.raw)"
      >
        mdi-delete
      </v-icon>
      <confirm-dialog @close="dialogDelete=false"
                      :confirm-dialog="dialogDelete"
                      @confirm="deleteItemConfirm(item.raw.id,item.raw.name)">
        {{ text }} ?
      </confirm-dialog>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import ConfirmDialog from "~/components/confirmDialog.vue";
import {Ref} from "vue";

const search = ref()
const snackbar = ref(false)
const textSnackbar = ref()
const timeoutSnackbar: Ref<number> = ref(5000)
const dialogDelete: Ref<boolean> = ref(false)
const dialogEdit: Ref<boolean> = ref(false)
const text = ref()
const itemsPerPage = ref(5)
const dataHeaders = ref([
  {title: 'ФИО', align: 'start', sortable: false, key: 'FIO'},
  {title: 'Группа', align: 'end', key: 'group'},
  {title: 'Номер телефона', align: 'end', key: 'telNumber'},
  {title: 'Дата регистрации', align: 'end', key: 'dateOfRegistration'},
  {title: 'Последняя активность', align: 'end', key: 'lastActivity'},
  {title: 'Действия', key: 'actions', sortable: false}
])

const {data: itemsOfUsers, pending, refresh} = await useFetch("/api/users/get");

function deleteUser(item: any) {
  dialogDelete.value = true;
  text.value = "Вы точно хотите удалить " + item.name;
}

async function deleteItemConfirm(idForDelete: number, nameUser: string) {
  await $fetch('/api/users/delete', {
    method: "delete",
    body: {id: idForDelete}
  });
  refresh()
  dialogDelete.value = false;
  textSnackbar.value = "Пользователь " + nameUser + " удален!"
  snackbar.value = true
}
</script>

<style scoped lang="scss">

</style>