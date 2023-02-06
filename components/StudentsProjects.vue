<template>
  <div class="d-flex w-100 h-100 justify-center mt-2">
    <div class="d-flex flex-column fit-content">
      <v-card class="mx-auto" min-width="1000px">
        <v-list :items="items"></v-list>
      </v-card>
      <div class="d-flex justify-end mt-2">
        <v-btn @click="dialog = true"
               color="secondary">Добавить проект
        </v-btn>
      </div>
    </div>
  </div>
  <v-dialog
      v-model="dialog"
      persistent
  >
    <CreateStudentProjectForm/>
  </v-dialog>

</template>

<script setup lang="ts">
const dialog=ref(false)
const items = ref([
  {type: 'subheader', title: 'Group #1'},
  {
    title: 'Item #1',
    value: 1,
  },
  {
    title: 'Item #2',
    value: 2,
  },
  {
    title: 'Item #3',
    value: 3,
  },
  {type: 'divider'},
  {type: 'subheader', title: 'Group #2'},
  {
    title: 'Item #4',
    value: 4,
  },
  {
    title: 'Item #5',
    value: 5,
  },
  {
    title: 'Item #6',
    value: 6,
  },
])
</script>

<style scoped lang="scss">

</style>