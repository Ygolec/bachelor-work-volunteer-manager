<template>
    <v-dialog
            v-model="props.createFndDialog"
            persistent
            width="1024">
        <template v-slot:activator="{ props }">
            <v-btn
                    color="primary"
                    class="flex-grow-1"
                    v-bind="props"
                    @click="emit('open')"
            >
                Создать ФНД
            </v-btn>
        </template>
        <v-card>
            <v-form>
                <v-card-title>
                    <v-row>
                        <v-col
                                cols="12"
                                sm="6"
                                md="7">
                            Создание ФНД
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                    cols="12">
                                <div v-for="(n,index) in numberOfFunctional">
                                    <v-list-subheader>
                                        ФНД № {{ n }}
                                    </v-list-subheader>
                                    <v-text-field
                                            label="Название ФНД"
                                            v-model="fnds[index].nameFND"
                                            required>
                                    </v-text-field>
                                    <v-select
                                            label="Адрес ФНД"
                                            v-model="fnds[index].addresses"
                                            :rules="[required]"
                                            required
                                            :items="addressEvent"
                                            multiple
                                            clearable>
                                    </v-select>
                                    <v-label>Даты работы ФНД</v-label>
                                    <Datepicker locale="ru" :enable-time-picker="false" v-model="fnds[index].dateFND"
                                                @update:model-value="(item)=>checkCountFndTimes(item,fnds[index].times)"
                                                :allowed-dates="date" multi-dates class="mt-2 mb-4" required>
                                    </Datepicker>
                                    <div v-for="(n,indexTime) in fnds[index].dateFND">
                                        <v-label>Время работы волонтера {{ n }}{{ indexTime }}</v-label>
                                        <Datepicker
                                                :model-value="returnTime(fnds[index].getTime(indexTime))"
                                                @update:model-value="newValue => {let date1 = new Date();date1.setHours(newValue[0].hours,newValue[0].minutes,newValue[0].seconds);let date2 = new Date();date2.setHours(newValue[1].hours,newValue[1].minutes,newValue[1].seconds); fnds[index].times[indexTime] = [date1,date2]}"
                                                time-picker
                                                disable-time-range-validation
                                                range placeholder="Select Time" class="mt-2 mb-4" required>
                                        </Datepicker>
                                    </div>
                                    <v-text-field
                                            label="Колличество волонтеров"
                                            v-model.number="fnds[index].quantityVolunteerFND"
                                            :rules="[required]"
                                            required>
                                    </v-text-field>
                                    <v-text-field
                                            v-model="fnds[index].descriptionFND"
                                            label="Описание работы" :rules="[required]" required>
                                    </v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            color="success"
                            @click="createFnd()">Создать ФНД
                    </v-btn>
                    <v-btn
                            color="accent"
                            @click="closeDialog()">Отменить создание
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>

</template>

<script setup lang="ts">

import {required} from "~/utils/rules";
import Datepicker from "@vuepic/vue-datepicker";
import {Ref} from "vue";

const emit = defineEmits<{
    (e: 'successCreate'): void
    (e: 'close'): void
    (e: 'open'): void
}>()
const props = defineProps<{
    event: any,
    createFndDialog:boolean
}>()

/**
 * Данные по мероприятию
 */
const addressEvent = ref(props.event.addressEvent)
const date = ref(props.event.date)
/**
 * ФНД
 */

const numberOfFunctional = ref(1)
const fnds: Ref<{
    nameFND: string,
    dateFND: Date[],
    addresses: string[],
    times: Date[][],
    quantityVolunteerFND: number,
    descriptionFND: string,
    getTime: (index: number) => Date[]
}[]> = ref([])


watch(numberOfFunctional, (newValue) => {
    for (let i = 0; i < newValue; i++) {
        if (!fnds.value[i]) fnds.value[i] = reactive({
            nameFND: '',
            dateFND: [],
            addresses: [],
            times: [] as Date[][],
            getTime(index: number) {
                if (!this.times[index]) this.times[index] = [new Date(), new Date()]
                return this.times[index]
            },
            quantityVolunteerFND: 0,
            descriptionFND: ''
        })
    }
    fnds.value.splice(newValue)
}, {immediate: true})


//Статус заявки

function returnTime(dates: Date[]) {
    return dates.map(item => {
        return {hours: item.getHours(), minutes: item.getMinutes(), seconds: item.getSeconds()}
    })
}

function checkCountFndTimes(dates: Date[], times: Date[][]) {
    times.splice(dates.length)
}

async function createFnd() {

    await $fetch('/api/fnds/create', {
        method: "post",
        body: {
            fnd: fnds.value[0],
            eventId: props.event.id
        }
    });

    emit('successCreate')


}

function closeDialog() {
   emit('close')
}
</script>

<style scoped lang="scss">

</style>