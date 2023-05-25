<template>
    <v-main>
        <v-container>
            <v-data-table
                    v-model:items-per-page="itemsPerPage"
                    v-model:sort-by="sortBy"
                    :headers="dataHeaders"
                    :items="itemsOfRating"
                    class="elevation-1"
                    :search="search"
            >
                <template v-slot:top>
                    <v-toolbar
                            flat
                    >
                        <v-toolbar-title>Рейтинг волонтеров</v-toolbar-title>
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
                        <v-select
                                single-line
                                hide-details
                                label="Сортировка по уровню мероприятия"
                                v-model="sortByLevel"
                                clearable
                                @update:="refresh()"
                                :items="['Международное', 'Всероссийское', 'Федерально-окружное', 'Городское', 'Вузовское', 'Институтcкое']"></v-select>
                    </v-toolbar>
                </template>
            </v-data-table>
        </v-container>
    </v-main>
</template>
<script setup lang="ts">

const itemsPerPage = ref(15)
const search = ref()
const sortByLevel = ref()
const sortBy = ref([{key: 'place', order: 'asc'}])
const dataHeaders = ref([
    {title: 'Позиция волонтера', align: 'start', key: 'place',},
    {title: 'ФИО волонтера', align: 'start', key: 'student', sortable: false,},
    {title: 'Кол-во мероприятий', align: 'center', key: '_count.fndId', sortable: false,},
    {title: 'Кол-во отработанного времени', align: 'center', key: '_sum.numberOfHours'},
])
const {data: itemsOfRating, pending, refresh} = await useFetch("/api/rating/all");
watch(sortByLevel, (newSortByLevel) => {

        if (newSortByLevel) {
            getSort()
        } else refresh()
    }
)

async function getSort() {
    itemsOfRating.value = await $fetch('/api/rating/sortByLevel', {
        method: 'GET',
        params: {
            sortByLevel: sortByLevel.value
        }
    });
}

</script>
<style scoped lang="scss">

</style>