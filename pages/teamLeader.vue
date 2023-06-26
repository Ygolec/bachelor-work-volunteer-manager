<template>
    <v-app id="inspire">
        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="2">
                        <v-sheet rounded="lg">
                            <v-combobox
                                    label="Выберите тип мероприятия"
                                    :items="itemsOfTypeEvent"
                                    v-model="typeOfEvent">

                            </v-combobox>
                            <v-list rounded="lg"
                                    v-if="typeOfEvent==='Активные'">
                                <v-list-item>
                                    <v-combobox
                                            label="Выберите мероприятие"
                                            :items="itemsOfEvent"
                                            item-title="nameEvent"
                                            v-model="selectedEvent"
                                    >

                                    </v-combobox>
                                </v-list-item>
                            </v-list>
                            <v-list rounded="lg"
                                    v-if="typeOfEvent==='Завершенные'">
                                <v-list-item>
                                    <v-combobox
                                            label="Выберите мероприятие"
                                            :items="itemsOfEvent"
                                            item-title="nameEvent"
                                            v-model="selectedEvent"
                                    >

                                    </v-combobox>
                                </v-list-item>
                            </v-list>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet
                                min-height="70vh"
                                rounded="lg"
                                v-if="typeOfEvent==='Активные'"
                        >
                            <v-tabs
                                v-if="selectedEvent"
                                v-model="tab"
                                bg-color="primary"
                            >
                                <v-tab v-for="item in itemsOfFnd" :value="item.id">{{ item.nameFND }}
                                </v-tab>
                            </v-tabs>
                            <v-card-text>
                                <v-window v-model="tab">
                                    <v-window-item v-for="item in itemsOfFnd" :value="item.id">
                                        <v-chip-group
                                            column>
                                            <v-chip v-for="(temp,index) in itemsOfFnd.find(fnd=>fnd.id===tab)?.quantityVolunteerFND??0"
                                                    size="large"
                                                    variant="outlined">
                                                {{ index + 1 }}.
                                                <div v-if="acceptApplications[index]">
                                                    {{ acceptApplications[index].student.surName }}
                                                    {{ acceptApplications[index].student.name }}
                                                    {{ acceptApplications[index].student.middleName }}
                                                </div>
                                            </v-chip>
                                        </v-chip-group>
                                    </v-window-item>
                                </v-window>
                            </v-card-text>
                            <v-data-table
                                v-model:items-per-page="itemsPerPage"
                                :headers="dataHeaders"
                                :items="applicationForEvent.filter(item=>item.fndId===tab)"
                                class="elevation-1"
                            >
                                <template v-slot:item.FIO="{ item }">
                                    <v-chip>
                                        {{ item.raw.student.surName }}
                                        {{ item.raw.student.name }}
                                        {{ item.raw.student.middleName }}
                                    </v-chip>
                                </template>
                                <template v-slot:item.status="{ item }">
                                    {{translationsStatus[item.raw.status]}}
                                </template>
                                <template v-slot:item.actions="{ item }">
                                    <v-icon
                                        v-if="item.raw.status==='SEND'"
                                        size="large"
                                        class="me-2"
                                        @click="acceptApplication(item.raw.id)"
                                    >
                                        mdi-plus-circle
                                    </v-icon>
                                    <v-icon
                                        v-if="item.raw.status==='ACCEPT'"
                                        size="large"
                                        @click="declineApplication(item.raw.id)"
                                    >
                                        mdi-account-remove
                                    </v-icon>
                                    <v-icon
                                        v-if="item.raw.status==='ACCEPT'"
                                        size="large"
                                        @click="ghostedApplication(item.raw.id)"
                                    >
                                        mdi-rodent
                                    </v-icon>
                                    <v-icon
                                        v-if="item.raw.status==='GHOSTED'"
                                        size="large"
                                        @click="unGhostedApplication(item.raw.id)"
                                    >
                                        mdi-shield-lock-open
                                    </v-icon>
                                    <v-icon
                                        size="large"
                                        class="me-2"
                                    >
                                        mdi-open-in-new
                                    </v-icon>
                                </template>
                            </v-data-table>
                        </v-sheet>
                        <v-sheet

                                rounded="lg"
                                v-if="typeOfEvent==='Завершенные'"
                        >
                            <v-data-table
                                    :group-by="groupByFnd"
                                    :headers="dataHeadersOfStats"
                                    :items="statsOfVolunteer"
                                    class="elevation-1"
                                    item-value="name"
                            >
                                <template v-slot:item.app.student.surName="{ item }">

                                    {{ item.raw.app.student.surName }}
                                    {{ item.raw.app.student.name }}
                                    {{ item.raw.app.student.middleName }}
                                </template>
                                <template v-slot:item.hours="{ item }">

                                    <v-text-field
                                            hide-details
                                            type="number"
                                            v-model="item.raw.hours"
                                    min="0">

                                    </v-text-field>
                                </template>
                                <template v-slot:item.rating="{ item }">
                                    <v-rating
                                        v-model="item.raw.rating"
                                        hover
                                        half-increments
                                    ></v-rating>
                                </template>
                                <template v-slot:item.comment="{ item }">
                                    <v-textarea
                                        v-model="item.raw.comment"
                                    ></v-textarea>
                                </template>
                            </v-data-table>
                          <div class="float-end pa-3">
                            <v-btn
                                @click="sendStatsOfVolunteer()">
                              Отправить результаты
                            </v-btn>
                          </div>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>

  <!--    {{applicationForEvent}}-->
</template>

<script setup lang="ts">
import ConfirmDialog from "~/components/confirmDialog.vue";
import {Ref} from "vue";
import {ApplicationForParticipationInTheEvent, Fnd, FndTime, Student} from "@prisma/client";
import EditOrganizationDialog from "~/components/organizations/editOrganizationDialog.vue";

const statsOfVolunteer: Ref<{
    hours: number,
    app: (ApplicationForParticipationInTheEvent & { fnds: Fnd & { times: FndTime[] }, student: Student })
}[]> = ref([])
const typeOfEvent = ref()
const itemsOfTypeEvent: Ref<string[]> = ref(['Активные', 'Завершенные'])
const selectedEvent = ref()
const tab = ref(null)
const {data: itemsOfEvent} = await useFetch("/api/event/get");
const itemsOfFnd = ref([])
const translationsStatus=ref({
    'SEND':'Отправлено',
    'ACCEPT':'Принято',
    'REJECTED':'Отозвана',
    'RESERVE':'Резерв',
    'GHOSTED':'Слив',
})



const itemsPerPage = ref(5)
const dataHeaders = ref([
    {title: 'ФИО', align: 'start', key: 'FIO'},
    {title: 'Статус заявки', align: 'end', key: 'status'},
    {title: 'Номер телефона', align: 'end', key: 'student.telNumber'},
    {title: 'Институт', align: 'end', key: 'student.insitution'},
    {title: 'Группа', align: 'end', key: 'student.group'},
    {title: 'Действия', key: 'actions', sortable: false},
])

const dataHeadersOfStats = ref([
    {title: 'ФИО', align: 'start', key: 'app.student.surName'},
    {title: 'Время', align: 'start', key: 'hours'},
    {title: 'Рейтинг', align: 'start', key: 'rating'},
    {title: 'Комментарий', align: 'start', key: 'comment'},
])
const groupByFnd = ref([{key: 'app.fnds.nameFND'}])

const applicationForEvent = ref([])
const acceptApplications = ref()
const acceptApplicationsWithoutFilter = ref()
watch(selectedEvent,  () => {
     getFnds()
})

watch(tab,  () => {
     updateAcceptApplications()
})

function updateAcceptApplications() {
    acceptApplications.value = acceptApplicationsWithoutFilter.value.filter(item => (item.status === 'ACCEPT' && item.fndId === tab.value))
}

async function getFnds() {

    itemsOfFnd.value = await $fetch('/api/fnds/getByIdEvent', {params: {id: selectedEvent.value.id}})
    applicationForEvent.value = await $fetch('/api/ApplicationForParticipationInTheEvent/byEventID', {
        params: {
            idEvent: selectedEvent.value.id,
        }
    })
    acceptApplicationsWithoutFilter.value=applicationForEvent.value;
    tab.value=itemsOfFnd.value[0].id;
    updateAcceptApplications()

    statsOfVolunteer.value = applicationForEvent.value
        .filter(item => item.status === 'ACCEPT')
        .map(app => {
            const hours = app.fnds.times
                .map(time => {
                    const date1 = new Date(time.start);
                    const date2 = new Date(time.end);
                    const diffInMs = Math.abs(date2 - date1);
                    const diffInHours = Math.round(diffInMs / 3600000);
                    return diffInHours
                })
                .reduce((acc, cur) => acc + cur, 0);
            return {hours: hours, app,rating:5,comment:''}
        })


}

async function acceptApplication(idOfApplication: number) {
    const fndByApplication = ref(applicationForEvent.value.find(application => application.id === idOfApplication).fndId)
    const numberOfVolunteers = ref(itemsOfFnd.value.find(item => item.id === fndByApplication.value).quantityVolunteerFND)
    if (acceptApplications.value.length <= numberOfVolunteers.value) {
        await $fetch('/api/ApplicationForParticipationInTheEvent/addToEvent', {
            method: 'PATCH',
            params: {
                id: idOfApplication,
            }
        })
    } else console.log('error', numberOfVolunteers.value)

    return getFnds()
}

async function declineApplication(idOfApplication: number) {
    await $fetch('/api/ApplicationForParticipationInTheEvent/remove', {
        method: 'PATCH',
        params: {
            id: idOfApplication,
        }
    })
    return getFnds()
}

async function ghostedApplication(idOfApplication: number) {
    await $fetch('/api/ApplicationForParticipationInTheEvent/ghosted', {
        method: 'PATCH',
        params: {
            id: idOfApplication,
        }
    })
    return getFnds()
}

async function unGhostedApplication(idOfApplication: number) {
    await $fetch('/api/ApplicationForParticipationInTheEvent/unGhosted', {
        method: 'PATCH',
        params: {
            id: idOfApplication,
        }
    })
    return getFnds()
}

async function sendStatsOfVolunteer(){
    await $fetch('/api/statsOfVolunteer/create', {
            method: 'POST',
            body: statsOfVolunteer.value
        }
    )
alert("Результаты записаны")
}
</script>

<style scoped lang="scss">

</style>