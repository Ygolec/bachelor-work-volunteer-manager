<template>
    <v-main>
        <v-container>
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
                            <v-card-title>{{ itemsOfEvent[n-1+pagePlus].nameEvent }}</v-card-title>
                        </v-img>
                        <v-card-subtitle class="pt-4">
                            {{itemsOfEvent[n-1+pagePlus].date.map(item=>{return new Date(item).toLocaleDateString('ru')}).join(', ')}}
                        </v-card-subtitle>
                        <v-card-text>
                           <div>
                               {{itemsOfEvent[n-1+pagePlus].descriptionEvent}}
                               {{n-1+pagePlus}}
                           </div>
                        </v-card-text>
                        <v-card-actions>
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

const {data: itemsOfEvent, pending, refresh} = await useFetch("/api/event/get");


const page = ref()
const lengthPagination: Ref<number> = ref(Math.ceil(itemsOfEvent.value.length / 9))
const pagePlus=ref(0)
watch(page,(newPage)=>{
    if (page.value==1){
        return pagePlus.value=0;
    }
    if (page.value > 1){
        return pagePlus.value=9*(page.value-1);
    }
})

</script>

<style scoped lang="scss">

</style>