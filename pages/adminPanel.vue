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
                                <v-divider class="my-2"></v-divider>

                            </v-list>
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet
                                min-height="70vh"
                                rounded="lg"
                        >
                            <data-table-events v-if="menu==0"/>
                            <data-table-users v-if="menu==1"/>
                            <data-table-organizations v-if="menu==2" />
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
const menu=ref(0)
</script>

<style scoped lang="scss">

</style>