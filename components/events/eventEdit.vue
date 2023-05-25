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
                                <v-label>Дата мероприятия</v-label>
                                <Datepicker ref="datepickerEvent" locale="ru" :enable-time-picker="false" v-model="date"
                                            multi-dates
                                            class="mt-2 mb-4" required>
                                </Datepicker>
                                <v-select
                                    label="Тип мероприятия"
                                    v-model="typeEvent"
                                    :items="typeEventItems"
                                    required
                                />
                                <v-select
                                    label="Уровень мероприятия"
                                    v-model="levelEvent"
                                    :items="levelEventItems"
                                    required
                                />
                                <v-textarea
                                        label="Описание мероприятия"
                                        v-model="descriptionEvent"></v-textarea>

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
import {en} from "vuetify/locale";

const imageShowDialog = ref(false)
const emit = defineEmits<{
    (e: 'close'): void
    (e: 'successUpdate'): void
}>()

const props = defineProps<{
    editEventDialog: boolean,
    event: any
}>()

const eventId = ref(props.event.id)
const nameEvent = ref(props.event.nameEvent)
const organizations = ref(props.event.organizations.map((org: any) => {
    return org.name
}))
const items_organizations = ref(['СибГУ им. Решетнева', 'Волонтерский центр СибГУ'])
const addressEvent = ref(props.event.addressEvent)
const mainImage = ref()
const descriptionEvent = ref(props.event.descriptionEvent)
const date = ref(props.event.date)
const typeEvent = ref(props.event.type)
const typeEventItems = ref(['Спортивное', 'Социальное', 'Экологическое', 'Событийное', 'Патриотическое'])
const levelEvent = ref(props.event.level)
const levelEventItems = ref(['Международное', 'Всероссийское', 'Федерально-окружное', 'Городское', 'Вузовское', 'Институтcкое'])
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

async function updateEvent() {
    const formData = new FormData()
    if (mainImage.value) {
        formData.set('mainImagePath', mainImage.value[0]);
    } else formData.set('mainImagePath', JSON.stringify(props.event.mainImagePath));
    formData.set('nameEvent', JSON.stringify(nameEvent.value));
    formData.set('eventId', JSON.stringify(eventId.value));
    formData.set('organizations', JSON.stringify(organizations.value));
    formData.set('addressEvent', JSON.stringify(addressEvent.value));
    formData.set('descriptionEvent', JSON.stringify(descriptionEvent.value));
    formData.set('quantityVolunteer', JSON.stringify(quantityVolunteer.value));
    formData.set('skills', JSON.stringify(skills.value));
    formData.set('clothingVolunteer', JSON.stringify(clothingVolunteer.value));
    formData.set('ageRestrictions', JSON.stringify(ageRestrictions.value));
    formData.set('date', JSON.stringify(date.value));
    formData.set('typeEvent', JSON.stringify(typeEvent.value));
    formData.set('levelEvent', JSON.stringify(levelEvent.value));
    await $fetch('/api/event/update', {
        method: "put",
        body: formData
    });
    emit("successUpdate")

}


</script>

<style scoped lang="scss">

</style>