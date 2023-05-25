<template>
  <v-dialog
      v-model="props.editStatDialog"
      persistent
      width="1024">
    <v-card>
      <v-form>
        <v-card-title>
          <v-row>
            <v-col
                cols="12"
                sm="6"
                md="7">
              Изменение статистики {{ props.stat.FIO }}
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12">
                <v-text-field
                    hide-details
                    label="Кол-во отработанного времени в часах"
                    type="number"
                    v-model="props.stat.numberOfHours"
                    min="0"></v-text-field>
                <v-rating
                    v-model="props.stat.rating"
                    hover
                    half-increments
                ></v-rating>
                  <v-textarea
                      label="Отзыв на волонтера(не обязательно)"
                      v-model="props.stat.comment"
                  ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="success"
              @click="updateEvent()">Изменить статистику
          </v-btn>
          <v-btn
              color="accent"
              @click="emit('close')">Отменить изменение
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

  </v-dialog>
</template>

<script setup lang="ts">


const emit = defineEmits<{
  (e: 'close'): void
  (e: 'successUpdate'): void
}>()

const props = defineProps<{
  editStatDialog: boolean,
  stat: any
}>()


async function updateEvent() {

  await $fetch('/api/statsOfVolunteer/update', {
    method: "put",
    body:{
      id:props.stat.id,
      numberOfHours:props.stat.numberOfHours,
      comment:props.stat.comment,
      rating:props.stat.rating,
    }
  });
  emit("successUpdate")

}


</script>

<style scoped lang="scss">

</style>