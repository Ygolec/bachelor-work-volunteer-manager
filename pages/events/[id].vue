<template>
    <v-app id="inspire">
        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="2"/>
                    <v-col cols="2">
                        <v-sheet rounded="lg">
                            <v-img
                                    class="align-end text-white"
                                    :src="'/'+itemOfEvent.mainImagePath"
                                    height="400"
                                    cover></v-img>
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-card>
                            <v-sheet
                                    min-height="70vh"
                                    rounded="lg"
                            >
                                <v-card-title class="text-h4">{{ itemOfEvent.nameEvent }}</v-card-title>
                                <v-card-subtitle>
                                    <div class="text-h6">Дата: {{itemOfEvent.date.map(item=>{return new Date(item).toLocaleDateString('ru')}).join(', ')}}</div>
                                    <div class="text-h6">Адрес: {{itemOfEvent.addressEvent.join(', ')}}</div>
                                    <div class="text-h6">Организаторы: {{itemOfEvent.organizations.map(item=>{return item.name}).join(', ')}}</div>

                                </v-card-subtitle>
                                <v-card-text>
                                <v-expansion-panels>
                                    <v-expansion-panel
                                        title="Описание"
                                        :text="itemOfEvent.descriptionEvent"></v-expansion-panel>
                                </v-expansion-panels>
                                </v-card-text>
                                <!--  -->
                            </v-sheet>
                        </v-card>
                    </v-col>
                    <v-col cols="2"/>
                </v-row>
            </v-container>
        </v-main>
        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="2"/>

                    <v-col cols="2">
                        <v-sheet rounded="lg">
                            <v-list rounded="lg" :items="itemsOfFnds"
                                    item-props>

                            </v-list>
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet
                            min-height="70vh"
                            rounded="lg"
                        >

                        </v-sheet>
                    </v-col>
                    <v-col cols="2"/>

                </v-row>
            </v-container>
        </v-main>
    </v-app>

  {{ itemOfEvent }}
    {{list}}
</template>

<script setup lang="ts">
const route = useRoute()
const {data: itemOfEvent, pending, refresh} = await useFetch(`/api/event/${route.params.id}`);
const itemsOfFnds=itemOfEvent.value.fnds.map(item=>{return {title:item.nameFND,value:item.id}})
const list=ref()

</script>

<style scoped lang="scss">
.mainSheet{
    font-size: 18px;
}
</style>