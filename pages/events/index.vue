<template>



    <v-main>

        <v-container>
            <div class="d-flex justify-space-between">
                <v-select
                    class="pr-3"
                    clearable
                    v-model="sortingByRecruitment"
                    label="Сортировка по набору волонтеров"
                    :items="sortingByRecruitmentItems"
                    @update:modelValue="updateSorting()"
                ></v-select>
                <v-select
                    class="pr-3"
                    clearable
                    v-model="typeEvent"
                    label="Сортировка по типу мероприятия"
                    :items="typeEventItems"
                    @update:modelValue="updateSorting()"
                ></v-select>
                <v-select
                    class="pr-3"
                    clearable
                    v-model="levelEvent"
                    label="Сортировка по уровню мероприятия"
                    :items="levelEventItems"
                    @update:modelValue="updateSorting()"
                ></v-select>
            </div>
            <div class="text-red text-lg-h2 text-center"
                 v-if="itemsOfEvent.length===0">
                Мероприятий не найдено...
            </div>
            <v-row>
                <v-col
                        v-for="n in 9"
                        :key="n"
                        cols="4"
                >
                    <v-card height="400"
                            v-if="itemsOfEvent[n-1+pagePlus]">
                        <v-img
                                class="align-end text-white"
                                :src="itemsOfEvent[n-1+pagePlus].mainImagePath"
                                height="200"
                                cover>
                            <v-card-title class="">{{ itemsOfEvent[n - 1 + pagePlus].nameEvent }}</v-card-title>
                        </v-img>
                        <v-card-subtitle class="pt-4">
                            {{
                            itemsOfEvent[n - 1 + pagePlus].date.map(item => {
                              return new Date(item).toLocaleDateString('ru')
                            }).join(', ')
                            }}
                        </v-card-subtitle>
                        <v-card-text>
                            <div class="eventDescription">
                                {{ itemsOfEvent[n - 1 + pagePlus].descriptionEvent }}
                                {{ n - 1 + pagePlus }}
                            </div>
                        </v-card-text>
                        <v-card-actions class="pt-0">
                            <v-btn color="orange">
                                Подделиться
                            </v-btn>

                            <v-btn color="orange"
                                   :href="'/events/' + itemsOfEvent[n-1+pagePlus].id">
                                Посмотреть
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
    <div class="text-center">
        <v-pagination
                v-model="page"
                :length="lengthPagination"
                :total-visible="7"
        ></v-pagination>
    </div>
</template>


<script setup lang="ts">
import {Ref} from "vue";

const sortingByRecruitment = ref()
const sortingByRecruitmentItems = ref(
    [
        {
            title: 'Идет набор',
            value: 'OPEN'
        },
        {
            title: 'Набор закрыт',
            value: 'CLOSE'
        }
        ,
        {
            title: 'Мероприятие завершено',
            value: 'COMPLETED'
        }
    ])
const typeEvent = ref()
const typeEventItems = ref(['Спортивное', 'Социальное', 'Экологическое', 'Событийное', 'Патриотическое'])
const levelEvent = ref()
const levelEventItems = ref(['Международное', 'Всероссийское', 'Федерально-окружное', 'Городское', 'Вузовское', 'Институтcкое'])

const {data: itemsOfEvent, pending, refresh} = await useFetch("/api/event/get");

itemsOfEvent.value = itemsOfEvent.value.filter(item => item.visibility === true)
const itemsOfEventWithoutSorting = ref(itemsOfEvent.value)

const page = ref()
const lengthPagination: Ref<number> = ref(Math.ceil(itemsOfEvent.value.length / 9))
const pagePlus = ref(0)
watch(page, (newPage) => {
    if (page.value == 1) {
        return pagePlus.value = 0;
    }
    if (page.value > 1) {
        return pagePlus.value = 9 * (page.value - 1);
    }
})

function updateSorting() {
    itemsOfEvent.value = itemsOfEventWithoutSorting.value
    itemsOfEvent.value = itemsOfEvent.value.filter(item => sortingByRecruitment.value == null || item.status === sortingByRecruitment.value)
    itemsOfEvent.value = itemsOfEvent.value.filter(item => typeEvent.value == null || item.type === typeEvent.value)
    itemsOfEvent.value = itemsOfEvent.value.filter(item => levelEvent.value == null || item.level === levelEvent.value)
}

</script>

<style scoped lang="scss">
.eventDescription {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>