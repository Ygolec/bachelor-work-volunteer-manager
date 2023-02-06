<template>
  <v-card>
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="0">
        <v-card-text>
          <v-text-field
              label="Имя проекта"></v-text-field>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="1">
        <v-card-text>
          <v-text-field label="Описание проекта">

          </v-text-field>
        </v-card-text>
      </v-window-item>
    </v-window>
    <v-card-actions>
      <v-btn
          v-if="step > 0"
          variant="text"
          @click="step--"
      >
        Назад
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          v-if="step < stepTitles.length"
          color="primary"
          variant="flat"
          @click="step++"
      >
        Далее
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script setup lang="ts">
const step = ref(0)
const stepTitles = ref([
  "Создание проекта",
  "Описание проекта"
])
const currentTitle = computed(() => {
      return stepTitles.value[step.value]
    }
)
</script>

<style scoped lang="scss">

</style>