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
                            Изменение мероприятия {{ props.event.nameEvent }}
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
                                <v-dialog
                                v-model="imageShowDialog"
                                >
                                            <div class="d-flex justify-center" @click="imageShowDialog=false">
                                                <img
                                                    :src="props.event.mainImagePath" style="width: 1000px">
                                            </div>

                                </v-dialog>

                                <div class="d-flex">
                                <v-file-input
                                        show-size
                                        label="Изображение мероприятия"
                                        v-model="mainImage"></v-file-input>
                                <v-btn
                                icon='mdi-eye-outline'
                                @click="imageShowDialog=true"></v-btn>
                                </div>
                                <v-combobox
                                        label="Адрес мероприятия"
                                        v-model="addressEvent"
                                        multiple
                                        clearable></v-combobox>
                                <v-text-field
                                        label="Описание мероприятия"
                                        v-model="descriptionEvent"></v-text-field>
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
                            @click="updateEvent()">Изменить мероприятие
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
import {required} from "~/utils/rules";
import Datepicker from "@vuepic/vue-datepicker";
import {Ref} from "vue";

const imageShowDialog=ref(false)
const emit = defineEmits<{
    (e: 'close'): void
}>()

const props = defineProps<{
    editEventDialog: boolean,
    event: any
}>()


const nameEvent = ref(props.event.nameEvent)
const organizations = ref(props.event.organizations.map((org: any) => {
    return org.name
}))
const items_organizations = ref(['СибГУ им. Решетнева', 'Волонтерский центр СибГУ'])
const addressEvent = ref(props.event.addressEvent)
const mainImage = ref()
const descriptionEvent = ref(props.event.descriptionEvent)
const date = ref([new Date()])
/**
 * Данные по волонтерам
 */
const quantityVolunteer = ref(props.event.quantityVolunteer)
const items_skills = ref([''])
const skills = ref(props.event.skills)
const clothingVolunteer = ref(props.event.clothingVolunteer)
const ageRestrictions = ref(props.event.ageRestrictions)
/**
 * ФНД
 */
const numberOfFunctional = ref(props.event.fnds.length)
const fnds: Ref<{
    nameFND: string,
    dateFND: Date[],
    addresses: string[],
    times: Date[][],
    quantityVolunteerFND: number,
    descriptionFND: string,
    getTime: (index: number) => Date[]
}[]> = ref(props.event.fnds.map(function (fnd: any, index: number) {
    return {
        nameFND: fnd.nameFND,
        dateFND: fnd.dateFND,
        addresses: fnd.addresses,
        times: fnd.times.map((time: any) => {
            return [new Date(time.start), new Date(time.end)]
        }),
        quantityVolunteerFND: fnd.quantityVolunteerFND,
        descriptionFND: fnd.descriptionFND,
        getTime(index: number) {
            if (!this.times[index]) this.times[index] = [new Date(), new Date()]
            return this.times[index]
        }
    }
}))


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

function returnTime(dates: Date[]) {
    return dates.map(item => {
        return {hours: item.getHours(), minutes: item.getMinutes(), seconds: item.getSeconds()}
    })
}

function checkCountFndTimes(dates: Date[], times: Date[][]) {
    times.splice(dates.length)
}

function updateEvent() {

}


</script>

<style scoped lang="scss">

</style>