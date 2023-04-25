<template>
  <v-card max-width="1000px" class="mx-auto mt-2">
    <v-card-title>
      Заявка на сопровождение мероприятия
    </v-card-title>
    <v-card-text>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >

        <v-combobox
            v-model="organizations[0]"
            label="Организация заявитель"
            :items="items_organizations"
            :rules="[required]"
            required>
          <template v-slot:append>
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
              </template>
              Полное наименование организации заявителя.
            </v-tooltip>
          </template>
        </v-combobox>
        <v-list>
          <v-list-subheader>Контактные данные</v-list-subheader>
          <v-divider></v-divider>
        </v-list>
        <v-text-field
            label="ФИО"
            v-model="fio"
            :rules="[required]"
            required>
        </v-text-field>
        <v-text-field
            maxlength="10"
            v-model="phone"
            label="Номер телефона"
            type="tel"
            prefix="8"
            :rules="[required,telephone]"
            placeholder="88005553535"
            required
        >
        </v-text-field>
        <v-text-field
            v-model="mail"
            label="Электронная почта"
            type="email"
            placeholder="test@mail.ru"
            :rules="[required,email]"
            required
        >
        </v-text-field>
        <v-text-field
            label="Должность"
            v-model="post"
        >
        </v-text-field>
        <v-list>
          <v-list-subheader>Данные по мероприятию</v-list-subheader>
          <v-divider></v-divider>
        </v-list>
        <v-text-field
            label="Название мероприятия"
            v-model="nameEvent"
            :rules="[required]"
            required>
        </v-text-field>
        <v-label>Дата мероприятия</v-label>
        <Datepicker ref="datepickerEvent" locale="ru" :enable-time-picker="false" v-model="date"
                    multi-dates
                    class="mt-2 mb-4" required>
        </Datepicker>
        <v-combobox
            label="Адрес мероприятия"
            v-model="addressEvent"
            :rules="[required]"
            multiple
            clearable
            required>
        </v-combobox>
        <v-textarea label="Описание мероприятия"
                    v-model="descriptionEvent"
                    :rules="[required]"
                    required>
        </v-textarea>
        <v-list>
          <v-list-subheader>Данные по волонтерскому сопровождению</v-list-subheader>
          <v-divider></v-divider>
        </v-list>
        <v-text-field
            v-model="quantityVolunteer"
            label="Общее кол-во волонтёров"
            :rules="[required]"
            required>
        </v-text-field>
        <v-combobox
            label="Требуемые навыки от волонтёров"
            v-model="skills"
            :items="items_skills"
            multiple
            chips
            :rules="[required]"
            required>
        </v-combobox>
        <v-text-field
            label="Форма одежды волонтёров"
            v-model="clothingVolunteer"
            :rules="[required]"
            required>
        </v-text-field>
        <v-list-subheader>
          Возрастные ограничения
        </v-list-subheader>
        <v-range-slider
            class="mt-4"
            v-model="ageRestrictions"
            step="1"
            thumb-label="always"
            :rules="[required]"
            required
        ></v-range-slider>
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
              v-model="fnds[index].address"
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
        <v-row>
          <v-col
              cols="12"
              sm="6">

            <v-card>
              <v-card-subtitle>Возможность поощрения волонтёров</v-card-subtitle>
              <v-radio-group v-model="tyLetter">
                <v-radio label="Нет" value="true"></v-radio>
                <div class="d-flex align-center">
                  <v-text-field :readonly="tyLetter" class="mr-4">
                    <template #prepend>
                      <v-radio label="Есть" :value="false">
                      </v-radio>
                    </template>
                  </v-text-field>
                </div>
              </v-radio-group>
            </v-card>

            <v-card class="mt-2">
              <v-card-subtitle>Возможность питания волонтёров</v-card-subtitle>
              <v-radio-group
                  v-model="food">
                <v-radio label="Нет" :value="true"></v-radio>
                <div class="d-flex align-center">
                  <v-text-field :readonly="food" class="mr-4">
                    <template #prepend>
                      <v-radio label="Есть" :value="false">
                      </v-radio>
                    </template>
                  </v-text-field>
                </div>
              </v-radio-group>
            </v-card>
          </v-col>

          <v-col
              cols="12"
              sm="6">

            <v-card>
              <v-card-subtitle>Возможность запроса(письма) на имя ректора
                о поддержке волонтёров на мероприятие
              </v-card-subtitle>
              <v-radio-group v-model="memoRector">
                <v-radio label="Нет" value="true"></v-radio>
                <div class="d-flex align-center">
                  <v-text-field :readonly="memoRector" class="mr-4">
                    <template #prepend>
                      <v-radio label="Есть" :value="false">
                      </v-radio>
                    </template>
                  </v-text-field>
                </div>
              </v-radio-group>
            </v-card>

            <v-card class="mt-2">
              <v-card-subtitle>Возможность написания служебной записки для освобождения волонтёра от учебных занятий
              </v-card-subtitle>
              <v-radio-group
                  v-model="release">
                <v-radio label="Нет" :value="true"></v-radio>
                <div class="d-flex align-center">
                  <v-text-field :readonly="release" class="mr-4">
                    <template #prepend>
                      <v-radio label="Есть" :value="false">
                      </v-radio>
                    </template>
                  </v-text-field>
                </div>
              </v-radio-group>
            </v-card>
          </v-col>
        </v-row>

        <div>
          <v-btn
              @click="validate">
            Отправить
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>

</template>

<script setup lang="ts">

import {email, required, telephone} from "~/utils/rules";
import {Ref} from "vue";
import Datepicker, {VueDatePicker} from "@vuepic/vue-datepicker";
//Организации
const items_organizations = ref(['СибГУ им. Решетнева', 'Волонтерский центр СибГУ'])
const organizations = ref([items_organizations.value[0]])
//Контактные данные
const fio = ref("Чистобаев")
const phone = ref("9233325700")
const mail = ref("thekevindit@gmail.com")
const post = ref("Руководитель")
//Данные по мероприятию
const nameEvent = ref("Написание вкр")
const date = ref([new Date()])
const addressEvent = ref(["Тута"])
const descriptionEvent = ref("Великое написание описание вкр")
//Данные по волонтерскому сопровождению
const quantityVolunteer = ref(25)
const items_skills = ref(['Умный', 'Красивый'])
const skills = ref([items_skills.value[0], items_skills.value[1]])
const clothingVolunteer = ref("Джинсы")
const ageRestrictions = ref([18, 30])
const numberOfFunctional = ref(0)
//ФНД

const fnds: Ref<{ nameFND: string, dateFND: Date[],address: string[], times: Date[][], quantityVolunteerFND: number, descriptionFND: string, getTime: (index: number) => Date[] }[]> = ref([])
watch(numberOfFunctional, (newValue) => {
  for (let i = 0; i < newValue; i++) {
    if (!fnds.value[i]) fnds.value[i] = reactive({
      nameFND: '',
      dateFND: [],
      addresses:[],
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


//Radio
const tyLetter = ref(true)
const food = ref(true)
const memoRector = ref(true)
const release = ref(true)
//Валидация
const valid = ref()
const form = ref()

const datepickerFND: Ref<Date[]> = ref([])
const datepickerTimeFND: Ref<VueDatePicker[]> = ref([])
const datepickerEvent: Ref<VueDatePicker | undefined> = ref()

//Статус заявки

function returnTime(dates: Date[]) {
  return dates.map(item => {
    return {hours: item.getHours(), minutes: item.getMinutes(), seconds: item.getSeconds()}
  })
}

function checkCountFndTimes(dates: Date[], times: Date[][]) {
  times.splice(dates.length)
}

async function validate() {
  datepickerFND.value.forEach(DatePicker => {
    console.log(DatePicker)
  })

  /* const {valid} = await form.value.validate()*/
  /*if (valid) {*/
  await $fetch('/api/volunteerSupport/request', {
    method: 'post',
    body: reactive({
      organizations,
      fio,
      phone: "8" + phone.value,
      mail,
      post,
      nameEvent,
      date,
      addressEvent,
      descriptionEvent,
      quantityVolunteer: +quantityVolunteer.value,
      skills,
      clothingVolunteer,
      ageRestrictions,
      fnds
    })
  });
  alert('Отправлено')
  /* }*/
}
</script>

<style scoped lang="scss">
.radioButton {
  flex: 0 0;
}

.combo {
  min-width: 400px;
}
</style>