<template>
    <template>
        <v-dialog
                v-model="props.editEventDialog"
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
                                Изменение ФНД {{ props.fnds.nameFND }}
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col
                                        cols="12">
                                    <v-text-field
                                            label="Название ФНД"
                                            v-model="fnds.nameFND"
                                            required>
                                    </v-text-field>
                                    <v-select
                                            label="Адрес ФНД"
                                            v-model="fnds.addresses"
                                            :rules="[required]"
                                            required
                                            :items="addressEvent"
                                            multiple
                                            clearable>
                                    </v-select>
                                    <v-label>Даты работы ФНД</v-label>
                                    <Datepicker locale="ru" :enable-time-picker="false" v-model="fnds.dateFND"
                                                @update:model-value="(item)=>checkCountFndTimes(item,fnds.times)"
                                                :allowed-dates="date" multi-dates class="mt-2 mb-4" required>
                                    </Datepicker>
                                    <div v-for="(n,indexTime) in fnds.dateFND">
                                        <v-label>Время работы волонтера {{ n }}{{ indexTime }}</v-label>
                                        <Datepicker
                                                :model-value="returnTime(fnds.getTime(indexTime))"
                                                @update:model-value="newValue => {let date1 = new Date();date1.setHours(newValue[0].hours,newValue[0].minutes,newValue[0].seconds);let date2 = new Date();date2.setHours(newValue[1].hours,newValue[1].minutes,newValue[1].seconds); fnds.times[indexTime] = [date1,date2]}"
                                                time-picker
                                                disable-time-range-validation
                                                range placeholder="Select Time" class="mt-2 mb-4" required>
                                        </Datepicker>
                                    </div>
                                    <v-text-field
                                            label="Колличество волонтеров"
                                            v-model.number="fnds.quantityVolunteerFND"
                                            :rules="[required]"
                                            required>
                                    </v-text-field>
                                    <v-text-field
                                            v-model="fnds.descriptionFND"
                                            label="Описание работы" :rules="[required]" required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                                color="success"
                                @click="updateFnd()">Изменить ФНД
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
</template>

<script setup lang="ts">

import {required} from "~/utils/rules";
import Datepicker from "@vuepic/vue-datepicker";
import {Ref} from "vue";

type FND = {
    nameFND: string,
    dateFND: Date[],
    addresses: string[],
    times: Date[][],
    quantityVolunteerFND: number,
    descriptionFND: string,
    getTime: (index: number) => Date[]
}
const emit = defineEmits<{
    (e: 'close'): void
}>()

const props = defineProps<{
    editEventDialog: boolean,
    fnds: any
    event: any
}>()
const date = ref(props.event.date)
const addressEvent = ref(props.event.addressEvent)

const fnds: Ref<
    FND
> = ref(
    {
        id: props.fnds.id,
        nameFND: props.fnds.nameFND,
        dateFND: props.fnds.dateFND,
        addresses: props.fnds.addresses,
        times: props.fnds.times.map((time: any) => {
            return [new Date(time.start), new Date(time.end)]
        }),
        quantityVolunteerFND: props.fnds.quantityVolunteerFND,
        descriptionFND: props.fnds.descriptionFND,
        getTime(index: number) {
            if (!this.times[index]) this.times[index] = [new Date(), new Date()]
            return this.times[index];
        }
    }
)

function returnTime(dates: Date[]) {
    return dates.map(item => {
        return {hours: item.getHours(), minutes: item.getMinutes(), seconds: item.getSeconds()}
    })
}

function checkCountFndTimes(dates: Date[], times: Date[][]) {
    times.splice(dates.length);
}

async function updateFnd() {
    const copyFnds: FND = JSON.parse(JSON.stringify(fnds.value));
    copyFnds.times = copyFnds.times.slice(0, fnds.value.dateFND.length);
    copyFnds.times = copyFnds.times.map((time, index) => {
        return {start: time[0], end: time[1], id: props.fnds.times[index]?.id}
    })

    await $fetch('/api/fnds/update', {
        method: "put",
        body: copyFnds
    });

    emit("close");
}
</script>

<style scoped lang="scss">

</style>