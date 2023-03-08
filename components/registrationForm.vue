<template>
  <v-dialog
      v-model="registrationDialog"
      persistent
      width="1024">
    <template v-slot:activator="{ props }">
      <v-btn
          color="primary"
          class="flex-grow-1"
          v-bind="props"
      >
        Регистрация
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Регистрация
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4">
              <v-text-field
                  label="Имя"
                  hint="Эта информация будет использоваться для написания благодарственных писем"
                  v-model="student.name"
              >
              </v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4">
              <v-text-field
                  label="Фамилия"
                  v-model="student.surName"
                  hint="Эта информация будет использоваться для написания благодарственных писем">
              </v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4">
              <v-text-field
                  label="Отчество"
                  v-model="student.middleName"
                  hint="Эта информация будет использоваться для написания благодарственных писем">
              </v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="6">
              <v-autocomplete
                  label="Институт"
                  v-model="student.insitution"
                  :items="institutions">
              </v-autocomplete>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="6">
              <v-autocomplete
                  label="Группа"
                  v-model="student.group"
                  :items="group">
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Номер телефона"
                  hint="Эта информация будет использоваться для связи с вами"
                  placeholder="88005553535"
                  v-model="student.telNumber"
                  type="tel">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Дата рождения"
                  hint="Эта информация будет использоваться для выбора мероприятий"
                  v-model="student.birthday"
                  type="date">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Email"
                  hint="Эта информация будет использоваться для восстановления пароля и подверждения данных"
                  type="email"
                  v-model="student.email"
                  placeholder="test@gmail.com">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Пароль"
                  v-model="student.password"
                  type="password">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Повторите пароль"
                  type="password">
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="registrationDialog=false"
            variant="outlined"
            color="error">
          Отменить регистрацию
        </v-btn>
        <v-btn
            color="success"
            variant="outlined"
            @click="registrationDialog=false">
          Зарегистрироваться
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {Student} from "@prisma/client";

const registrationDialog = ref()
const student: Omit<Student, 'id'> = reactive({
  name: "",
  surName: "",
  middleName: "",
  insitution: "",
  group: "",
  telNumber: "",
  birthday: new Date(),
  email: "",
  password: "",
})

const institutions = ref(['ИИТК', 'ИКТ'])
const group = ref(['БИС19-01'])
</script>

<style scoped lang="scss">

</style>