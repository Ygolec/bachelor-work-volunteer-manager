<template>
    <v-snackbar
        v-model="snackbar"
        :timeout="timeoutSnackbar"
    >
        {{ textSnackbar }}

        <template v-slot:actions>
            <v-btn
                color="blue"
                variant="text"
                @click="snackbar = false"
            >
                Закрыть
            </v-btn>
        </template>
    </v-snackbar>
    <v-dialog
            v-model="createEventDialog"
            persistent
            width="1024">
        <template v-slot:activator="{ props }">
            <v-btn
                    color="primary"
                    class="flex-grow-1"
                    v-bind="props"
            >
                Создать мероприятие
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
                            Создание мероприятия
                        </v-col>
                        <v-col
                                cols="12"
                                sm="6"
                                md="5">
                            <v-select
                                    label="Импорт заявок">
                            </v-select>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                    cols="12">
                                <v-list>
                                    <v-list-subheader>Данные по мероприятию</v-list-subheader>
                                    <v-divider></v-divider>
                                </v-list>
                                <v-text-field
                                        label="Название мероприятия"
                                        v-model="nameEvent"></v-text-field>
                                <v-combobox
                                        label="Организатор"
                                        v-model="organizations"
                                        :items="items_organizations"
                                        multiple
                                ></v-combobox>
                                <v-file-input
                                        show-size
                                        label="Изображение мероприятия"
                                        v-model="mainImage"></v-file-input>
                                <v-combobox
                                        label="Адрес мероприятия"
                                        v-model="addressEvent"
                                        multiple
                                        clearable></v-combobox>
                                <v-text-field
                                        label="Описание мероприятия"
                                        v-model="descriptionEvent"></v-text-field>
                                <v-label>Дата мероприятия</v-label>
                                <Datepicker ref="datepickerEvent" locale="ru" :enable-time-picker="false" v-model="date"
                                            multi-dates
                                            class="mt-2 mb-4" required>
                                </Datepicker>
                                <v-list>
                                    <v-list-subheader>Данные по волонтерам</v-list-subheader>
                                    <v-divider></v-divider>
                                </v-list>
                                <v-text-field
                                        label="Общее кол-во волонтеров"
                                        v-model.number="quantityVolunteer"></v-text-field>
                                <v-combobox
                                        label="Требуемые навыки от волонтеров"
                                        v-model="skills"
                                        :items="items_skills"
                                ></v-combobox>
                                <v-text-field
                                        label="Форма одежды волонтеров"
                                        v-model="clothingVolunteer"></v-text-field>
                                <v-range-slider
                                        class="mt-4"
                                        step="1"
                                        thumb-label="always"
                                        v-model="ageRestrictions"
                                        label="Возрастные ограничения"
                                        :rules="[required]"
                                        required
                                ></v-range-slider>
                                <v-list>
                                    <v-list-subheader>ФНД</v-list-subheader>
                                    <v-divider></v-divider>
                                </v-list>
                                <number-imput
                                        label="Колличество ФНД"
                                        v-model="numberOfFunctional"
                                        :rules="[required]"
                                        required
                                        tool-tip="Описание что такое ФНД">
                                </number-imput>
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
                        @click="createEvent()">Создать мероприятие
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
}>()

const createEventDialog = ref()
const snackbar=ref(false)
const textSnackbar=ref('Мероприятие создано!')
const timeoutSnackbar:Ref<number>=ref(2000)
/**
 * Данные по мероприятию
 */
const nameEvent = ref("")
const organizations = ref([])
const items_organizations = ref(['СибГУ им. Решетнева', 'Волонтерский центр СибГУ'])
const addressEvent = ref([])
const mainImage = ref()
const descriptionEvent = ref("")
const date = ref([new Date()])
/**
 * Данные по волонтерам
 */
const quantityVolunteer = ref()
const items_skills = ref([''])
const skills = ref([])
const clothingVolunteer = ref("")
const ageRestrictions = ref([18, 30])
/**
 * ФНД
 */
const numberOfFunctional = ref(0)
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

async function createEvent() {
    const formData = new FormData()
    formData.set('mainImage', mainImage.value[0]);
    formData.set('nameEvent', JSON.stringify(nameEvent.value));
    formData.set('organizations', JSON.stringify(organizations.value));
    formData.set('addressEvent', JSON.stringify(addressEvent.value));
    formData.set('descriptionEvent', JSON.stringify(descriptionEvent.value));
    formData.set('quantityVolunteer', JSON.stringify(quantityVolunteer.value));
    formData.set('skills', JSON.stringify(skills.value));
    formData.set('clothingVolunteer', JSON.stringify(clothingVolunteer.value));
    formData.set('ageRestrictions', JSON.stringify(ageRestrictions.value));
    formData.set('fnds', JSON.stringify(fnds.value));
    formData.set('date',JSON.stringify(date.value));


    await $fetch('/api/event/create', {
        method: "post",
        body:formData
    });

    emit('successCreate')
    closeDialog()
    snackbar.value=true

}
function closeDialog() {
    createEventDialog.value=false;
}
</script>

<style scoped lang="scss">

</style>