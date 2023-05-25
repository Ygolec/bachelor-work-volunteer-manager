<template>
  <v-app id="inspire">
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                    @click="menu=0"
                >
                  <v-list-item-title>
                    Мероприятия
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                    @click="menu=1">
                  <v-list-item-title>
                    Пользователи
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                    @click="menu=2">
                  <v-list-item-title>
                    Организации
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                    @click="menu=3">
                  <v-list-item-title>
                    ФНД
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                    @click="menu=4">
                  <v-list-item-title>
                    Статистика по волонтерам
                  </v-list-item-title>
                </v-list-item>
                <v-divider class="my-2"></v-divider>
                <v-list-item
                    @click="menu=5">
                  <v-list-item-title>
                    Отчеты
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                    @click="menu=6">
                  <v-list-item-title>
                    Графики
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet
                rounded="lg"
            >
              <data-table-events v-if="menu==0"/>
              <data-table-users v-if="menu==1"/>
              <data-table-organizations v-if="menu==2"/>
              <data-table-fnds v-if="menu==3"/>
              <stats-of-volunteer-data-table-stats v-if="menu==4"/>
              <report-view v-if="menu==5"/>
              <charts-view v-if="menu==6"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import DataTableOrganizations from "~/components/organizations/dataTableOrganizations.vue";
import DataTableEvents from "~/components/events/dataTableEvents.vue";
import DataTableEventsForReport from "~/components/reports/dataTableEvents.vue";
import DataTableFnds from "~/components/fnds/dataTableFnds.vue";
import ChartsView from "~/components/charts/chartsView.vue";
import ReportView from "~/components/reports/reportView.vue";

const menu = ref(0)
</script>

<style scoped lang="scss">

</style>