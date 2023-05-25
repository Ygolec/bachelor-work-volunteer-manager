<template>
  <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="dataHeaders"
      :items="itemsOfEvent"
      item-value="id"
      :search="search"
      class="elevation-1"
      :loading="pending"
      loading-text="Loading... Please wait"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Отчеты</v-toolbar-title>
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
      </v-toolbar>
    </template>
    <template v-slot:item.organizations="{ item }">
      <v-chip v-for="org in item.props.title.organizations" :key="org.id">
        {{ org.name }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
              color="primary"
              v-bind="props"
          >
            Выгрузить отчет
          </v-btn>
        </template>
        <v-list>
          <v-list-item
          >

            <v-btn
                block
                variant="text"
                @click="sendReportWithParticipants(item.raw)">
              Выгрузить список волонтеров по мероприятию
            </v-btn>
          </v-list-item>
          <v-list-item
          >
            <v-btn
                block
                variant="text"
                @click="getParticipants(item.raw)">
              Приложение №6
            </v-btn>
          </v-list-item>
          <v-list-item
          >
            <v-btn
                block
                variant="text"
                @click="test()">
              Тест
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>
</template>
<script setup lang="ts">


import {appendix_6, tableOfParticipants} from "~/utils/reports";

const itemsPerPage = ref(5)
const dataHeaders = ref([
  {title: 'Название мероприятия', align: 'start', sortable: false, key: 'nameEvent'},
  {title: 'Организаторы', align: 'end', key: 'organizations'},
  {title: 'Кол-во волонтеров', align: 'end', key: 'quantityVolunteer'},
  {title: 'Статус мероприятия', align: 'end', key: 'status'},
  {title: 'Действия', key: 'actions', sortable: false},
])
const {data: itemsOfEvent, pending, refresh} = await useFetch("/api/event/get");
const search=ref()
async function sendReportWithParticipants(item: any) {
  const eventWithApplications = ref()
  eventWithApplications.value = await $fetch('/api/reports/volonteerByEvent', {params: {id: item.id}})
  tableOfParticipants(eventWithApplications.value, item)
}

async function getParticipants(item: any) {
  const eventWithApplications = ref()
  eventWithApplications.value = await $fetch('/api/reports/volonteerByEvent', {params: {id: item.id}})
  appendix_6(item, eventWithApplications.value);
}

</script>

<style scoped lang="scss">

</style>