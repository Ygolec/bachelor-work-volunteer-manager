<template>
  <v-dialog
      v-model="createEventDialog"
      persistent
      width="1024">
    <template v-slot:activator="{ props }">
      <v-btn
          color="primary"
          class="flex-grow-1"
          v-bind="props"
      >
        Создать мероприятие
      </v-btn>
    </template>
      <v-card>
        <v-form>
          <v-card-title>
            Создание мероприятия
            <v-btn>
              Импорт из заявок
            </v-btn>
          </v-card-title>
          <v-card-text>

          </v-card-text>
          <v-card-actions>

          </v-card-actions>
        </v-form>
      </v-card>

  </v-dialog>
</template>

<script setup lang="ts">

const createEventDialog=ref()
</script>

<style scoped lang="scss">

</style>