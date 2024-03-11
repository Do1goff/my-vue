<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card>
        <v-card-title> Паспорт </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                :value="passportJSON.series"
                label="серия"
                type="number"
                @input="updatePassportInt('series', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :value="passportJSON.num"
                label="номер"
                type="number"
                @input="updatePassportInt('num', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :value="passportJSON.birthplace"
                label="место рождения"
                @input="updatePassport('birthplace', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    :value="formatDate(passportJSON.date_issue)"
                    label="Дата выдачи"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker @input="changeDate" />
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-text-field
                :value="passportJSON.issued_by"
                label="кем выдан"
                @input="updatePassport('issued_by', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :value="passportJSON.department_code"
                label="код подразделения"
                @input="updatePassport('department_code', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-text-field
            :value="abit.document_inn"
            label="ИНН"
            @input="updateData('document_inn', $event)"
          />
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-text-field
            :value="abit.document_snils"
            label="СНИЛС"
            @input="updateData('document_snils', $event)"
          />
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-select
            :value="abit.document_secrets_access"
            :items="document_secrets_access"
            item-text="title"
            item-value="value"
            label="Допуск к ССГТ"
            @input="updateData('document_secrets_access', $event)"
          />
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-select
            :value="abit.document_ppo_group"
            :items="document_ppo_group"
            item-text="title"
            item-value="value"
            label="Категория ПП от ВК/ВЧ"
            @input="updateData('document_ppo_group', $event)"
          />
        </v-card-text>
      </v-card>
      <v-card>
        <v-checkbox
          :value="abit.document_medical_certificate"
          label="Мед. справка"
          @click="
            data.document_medical_certificate =
              !abit.document_medical_certificate
          "
          @input="updateData('document_medical_certificate', $event)"
        />
      </v-card>
      <v-card>
        <v-checkbox
          :value="abit.document_mvd_availability"
          label="Справка МВД"
          @click="
            data.document_mvd_availability = !abit.document_mvd_availability
          "
          @input="updateData('document_mvd_availability', $event)"
        />
        <v-select
          :value="abit.document_mvd_prosecution"
          :items="document_mvd_prosecution"
          item-text="title"
          item-value="value"
          label="Привлечение к ответственности"
          @input="updateData('document_mvd_prosecution', $event)"
        />
      </v-card>
      <v-card>
        <v-card-title> Наличие документов подлинников </v-card-title>
        <v-row>
          <v-col cols="4">
            <v-checkbox
              :value="abit.document_passport_presence"
              label="Паспорт РФ"
              @click="
                data.document_passport_presence =
                  !abit.document_passport_presence
              "
              @input="updateData('document_passport_presence', $event)"
            />
          </v-col>
          <v-col cols="4">
            <v-checkbox
              :value="abit.document_birthday_presence"
              label="Свидетельство о рождении"
              @click="
                data.document_birthday_presence =
                  !abit.document_birthday_presence
              "
              @input="updateData('document_birthday_presence', $event)"
            />
          </v-col>
          <v-col cols="4">
            <v-checkbox
              :value="abit.document_education_presence"
              label="Документ об образовании"
              @click="
                data.document_education_presence =
                  !abit.document_education_presence
              "
              @input="updateData('document_education_presence', $event)"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="6">
      <!-- <v-card>
        <h1>{{ subjects }}</h1>
      </v-card> -->
      <v-card>
        <v-data-table
          :headers="headers"
          :items="schoolMarks"
        >
          <template #top>
            <v-toolbar flat>
              <v-spacer />
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title> Добавить </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            :value="schoolMarks"
                            label="Оценка"
                            @input="updateData('mark', $event)"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            :value="schoolMarks"
                            :items="subjects"
                            item-text="title"
                            item-value="value"
                            label="Предмет"
                            @input="updateData('subject', $event)"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      text
                      @click="saveMark"
                    >
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template #item.actions="{ item }">
            <v-icon
              small
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <v-card>
        <v-card-title> Образование </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                :value="education.category"
                label="Категория"
                @input="updateEducation('category', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :value="education.institute"
                label="Образовательное учреждение"
                @input="updateEducation('institute', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :value="education.date_end"
                label="Год окончания"
                @input="updateEducation('date_end', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :value="education.address"
                label="Адрес"
                @input="updateEducation('address', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :value="education.document_education"
                label="Документ"
                @input="updateEducation('document_education', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-btn
      color="blue darken-1"
      text
      @click="save"
    >
      Сохранить
    </v-btn>
  </v-row>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
  name: 'DocumentsComponent',
  props: ['abit'],
  data() {
    return {
      data: {},
      passport: {},
      education: {},
      menu: false,
      document_secrets_access: [
        { value: 'group_1', title: '1 группа' },
        { value: 'group_2', title: '2 группа' },
        { value: 'group_3', title: '3 группа' },
        { value: 'IN_PROCESS', title: 'в процессе' },
        { value: 'none', title: 'отсутствует' },
      ],
      document_ppo_group: [
        { value: 'group_1', title: '1 группа' },
        { value: 'group_2', title: '2 группа' },
        { value: 'group_3', title: '3 группа' },
        { value: 'group_4', title: '4 группа' },
      ],
      document_mvd_prosecution: [
        { value: 'criminal', title: 'Уголовная' },
        { value: 'administrative', title: 'Административная' },
        { value: 'accounting', title: 'Факт учёта в ОПДН' },
      ],
      dialog: false,
      headers: [
        { value: 'subject', title: 'Предмет' },
        { value: 'mark', title: 'Оценка' },
        { value: 'actions', title: 'Действие' },
      ],
    }
  },
  computed: {
    subjects() {
      return this.$store.getters.subjects
    },
    schoolMarks() {
      return this.abit.schoolMarks
    },
    passportJSON() {
      return this.abit.document_passport
        ? JSON.parse(this.abit.document_passport)
        : {}
    },
  },
  created() {},
  methods: {
    ...mapActions(['selectAbit', 'updateAbit']),
    updateData(fieldName, event) {
      this.data[fieldName] = event
    },
    updateDataInt(fieldName, event) {
      this.data[fieldName] = parseInt(event, 10)
    },
    updateEducation(fieldName, event) {
      this.education[fieldName] = event
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD-MM-YYYY')
    },
    updatePassport(fieldName, event) {
      this.passportJSON[fieldName] = event
    },
    updatePassportInt(fieldName, event) {
      this.passportJSON[fieldName] = parseInt(event, 10)
    },
    changeDate(event) {
      this.passportJSON.date_issue = new Date(event).toISOString()
      this.menu = false
    },
    save() {
      this.data.id = this.abit.id
      this.data.document_passport = JSON.stringify(this.passportJSON)
      this.updateAbit(this.data)
    },
    saveMark() {
      console.log('saved')
    },
  },
}
</script>
