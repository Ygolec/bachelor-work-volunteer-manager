<template>
    <v-main>
        <v-container>
            <v-row>
                <v-col
                        v-for="n in 9"
                        :key="n"
                        cols="4"
                >
                    <v-card height="200">

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

const {data:itemsOfEvent,pending,refresh} = await useFetch("/api/event/get");
const page=ref()
const lengthPagination:Ref<number>=ref(Math.ceil(itemsOfEvent.value.length/9))

</script>

<style scoped lang="scss">

</style>