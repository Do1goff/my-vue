<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card>
        <v-tabs
          v-model="tabs"
          fixed-tabs
          background-color="red"
          dark
        >
          <v-tab>
            <v-badge
              color="green"
              :value="badgeColorEducation()"
              dot
            >
              Образование
            </v-badge>
          </v-tab>
          <v-tab>
            <v-badge
              color="green"
              :value="badgeColorUncanceledEducation()"
              dot
            >
              Текущее
            </v-badge>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      v-model="educationJSON.category"
                      dense
                      label="Категория"
                      @input="sendEducation"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="educationJSON.document_education"
                      dense
                      label="Документ"
                      @input="sendEducation"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-autocomplete
                      :value="formatDateYear(educationJSON.date_end)"
                      dense
                      :items="years"
                      label="Год окончания"
                      @input="changeDateEducation"
                    />
                  </v-col>
                  <v-col cols="12">
                    <!-- <v-text-field
                      v-model="educationJSON.institute"
                      dense
                      label="Образовательное учреждение"
                      @input="sendEducation"
                    /> -->
                    <v-autocomplete
                      v-model="educationJSON.institute"
                      :items="institutes"
                      item-text="name"
                      item-value="id"
                      dense
                      label="Образовательное учреждение"
                      @input="sendEducationInstitute"
                    >
                      <template v-slot:no-data>
                        <v-menu
                          v-model="menuInstitutes"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="500"
                        >
                          <template #activator="{ on, attrs }">
                            <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              v-bind="attrs"
                              v-on="on"
                            >
                              Добавить
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card>
                              <v-card-title>
                                <span class="text-h5">Добавить</span>
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12">
                                      <v-text-field
                                        v-model="institute.name"
                                        dense
                                        label="Образовательное учреждение"
                                      />
                                    </v-col>
                                    <v-col cols="12">
                                      <v-text-field
                                        v-model="institute.address"
                                        dense
                                        label="Адрес"
                                      />
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                            </v-card>

                            <v-card-actions>
                              <v-spacer />
                              <v-btn
                                color="blue darken-1"
                                text
                                dense
                                @click="saveInstitute"
                              >
                                Сохранить
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-menu>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <!-- <v-autocomplete
                      v-model="educationJSON.institute"
                      :items="institutes"
                      item-text="address"
                      item-value="address"
                      dense
                      label="Адрес"
                      readonly
                      @input="sendEducation"
                    /> -->
                    <v-text-field
                      v-model="educationJSON.address"
                      dense
                      label="Адрес"
                      @input="sendEducation"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      v-model="uncanceledEducationJSON.category"
                      dense
                      label="Категория"
                      @input="sendUncanceledEducation"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      :value="
                        formatDateYear(uncanceledEducationJSON.date_admission)
                      "
                      dense
                      :items="years"
                      label="Год поступления"
                      @input="changeDateUncanceledEducationAdmission"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      :value="formatDateYear(uncanceledEducationJSON.date_end)"
                      dense
                      :items="years"
                      label="Год окончания"
                      @input="changeDateUncanceledEducationEnd"
                    />
                  </v-col>
                  <v-col cols="12">
                    <!-- <v-text-field
                      v-model="uncanceledEducationJSON.institute"
                      dense
                      label="Образовательное учреждение"
                      @input="sendUncanceledEducation"
                    /> -->
                    <v-autocomplete
                      v-model="uncanceledEducationJSON.institute"
                      :items="institutes"
                      item-text="name"
                      item-value="id"
                      dense
                      label="Образовательное учреждение"
                      @input="sendUncanceledEducation"
                    >
                      <template v-slot:no-data>
                        <v-menu
                          v-model="menuInstitutes"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="500"
                        >
                          <template #activator="{ on, attrs }">
                            <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              v-bind="attrs"
                              v-on="on"
                            >
                              Добавить
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card>
                              <v-card-title>
                                <span class="text-h5">Добавить</span>
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12">
                                      <v-text-field
                                        v-model="institute.name"
                                        dense
                                        label="Образовательное учреждение"
                                      />
                                    </v-col>
                                    <v-col cols="12">
                                      <v-text-field
                                        v-model="institute.address"
                                        dense
                                        label="Адрес"
                                      />
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card-text>
                            </v-card>

                            <v-card-actions>
                              <v-spacer />
                              <v-btn
                                color="blue darken-1"
                                text
                                dense
                                @click="saveInstitute"
                              >
                                Сохранить
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-menu>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="uncanceledEducationJSON.period_study"
                      dense
                      label="Срок обучения"
                      @input="sendUncanceledEducation"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="uncanceledEducationJSON.course"
                      dense
                      label="Курс"
                      @input="sendUncanceledEducation"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="uncanceledEducationJSON.semesters_end"
                      dense
                      label="Семестров закрыто"
                      @input="sendUncanceledEducation"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <v-card>
        <v-card-title>
          <v-badge
            color="green"
            :value="badgeColorPassport()"
            dot
          >
            Паспорт
          </v-badge>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="passportJSON.series"
                v-mask="'####'"
                dense
                label="серия"
                @input="sendPassport('series', parseInt($event, 10))"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="passportJSON.num"
                v-mask="'######'"
                dense
                label="номер"
                @input="sendPassport('num', parseInt($event, 10))"
              />
            </v-col>
            <v-col cols="4">
              <v-menu
                v-model="menuPassportDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    dense
                    :value="formatDate(passportJSON.date_issue)"
                    label="Дата выдачи"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker @input="changePassportDate" />
              </v-menu>
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="passportJSON.issued_by"
                dense
                label="кем выдан"
                @input="sendPassport"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="passportJSON.department_code"
                v-mask="'###-###'"
                dense
                label="код подразделения"
                @input="sendPassport"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="passportJSON.birthplace"
                dense
                label="место рождения"
                @input="sendPassport"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="data.document_inn !== abit.document_inn"
                dot
              >
                <v-text-field
                  v-model="data.document_inn"
                  v-mask="'############'"
                  dense
                  label="ИНН"
                  @input="send('document_inn', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="data.document_snils !== abit.document_snils"
                dot
              >
                <v-text-field
                  v-model="data.document_snils"
                  v-mask="'###-###-### ##'"
                  dense
                  label="СНИЛС"
                  @input="send('document_snils', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="
                  data.document_secrets_access !== abit.document_secrets_access
                "
                dot
              >
                <v-select
                  v-model="data.document_secrets_access"
                  dense
                  :items="document_secrets_access"
                  item-text="title"
                  item-value="value"
                  label="Допуск к ССГТ"
                  @input="send('document_secrets_access', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="data.document_ppo_group !== abit.document_ppo_group"
                dot
              >
                <v-select
                  v-model="data.document_ppo_group"
                  dense
                  :items="document_ppo_group"
                  item-text="title"
                  item-value="value"
                  label="Категория ПП от ВК/ВЧ"
                  @input="send('document_ppo_group', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="green"
                :value="
                  data.document_medical_certificate !==
                  abit.document_medical_certificate
                "
                dot
              >
                <v-select
                  v-model="data.document_medical_certificate"
                  dense
                  :items="document_medical_certificate"
                  item-text="title"
                  item-value="value"
                  label="Мед. справка"
                  @change="send('document_medical_certificate', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="5">
              <v-badge
                color="green"
                :value="
                  data.document_mvd_availability !==
                  abit.document_mvd_availability
                "
                dot
              >
                <v-select
                  v-model="data.document_mvd_availability"
                  dense
                  :items="document_mvd_availability"
                  item-text="title"
                  item-value="value"
                  label="Справка МВД"
                  @change="send('document_mvd_availability', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="7">
              <v-badge
                color="green"
                :value="
                  data.document_mvd_prosecution !==
                  abit.document_mvd_prosecution
                "
                dot
              >
                <v-select
                  v-model="data.document_mvd_prosecution"
                  dense
                  :items="document_mvd_prosecution"
                  item-text="title"
                  label="Привлечение к ответственности"
                  multiple
                  chips
                  @input="send('document_mvd_prosecution', $event)"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index < 1">
                      <span>{{ item.title }}</span>
                    </v-chip>
                    <span
                      v-if="index === 1"
                      class="black--text text-caption"
                    >
                      (+{{ data.document_mvd_prosecution.length - 1 }})
                    </span>
                  </template>
                </v-select>
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="schoolMarks"
          height="354px"
          dense
          disable-pagination
          hide-default-footer
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title> Оценки в документе о СОО/СПО </v-toolbar-title>
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
                    Добавить
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    Добавить
                    <v-spacer />
                    <v-dialog
                      v-model="dialogList"
                      max-width="800px"
                    >
                      <template #activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Список
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          Добавить
                          <v-spacer />
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col>
                                <v-row>
                                  <v-col
                                    v-for="(n, index) in subjects"
                                    :key="index"
                                    cols="6"
                                  >
                                    <v-row>
                                      <v-col cols="6">
                                        {{ n.name }}
                                      </v-col>
                                      <v-col cols="6">
                                        <v-text-field
                                          v-model="markList[index]"
                                          :items="marks"
                                          label="Оценка"
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            text
                            @click="saveMarkList"
                          >
                            Сохранить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-autocomplete
                            :value="mark.mark"
                            :items="marks"
                            label="Оценка"
                            @input="updateMark('mark', parseInt($event, 10))"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="mark.subject"
                            :items="subjects"
                            item-text="name"
                            item-value="id"
                            label="Предмет"
                            @input="updateMarkSubject('subject', $event)"
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
              @click="editMark(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <v-card>
        <v-card-title>
          <v-badge
            color="green"
            :value="badgeColorMilitaryService()"
            dot
          >
            Военная служба
          </v-badge>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="militaryServiceJSON.rank"
                :items="ranks"
                dense
                label="Воинское звание"
                @input="sendMilitaryService"
              />
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="militaryServiceJSON.post"
                dense
                label="Должность"
                @input="sendMilitaryService"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="militaryServiceJSON.place"
                dense
                label="Где служит"
                @input="sendMilitaryService"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="militaryServiceJSON.unit"
                dense
                label="Воинская часть"
                @input="sendMilitaryService"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="militaryServiceJSON.category"
                dense
                :items="categories"
                item-text="title"
                item-value="value"
                label="Категория"
                @input="sendMilitaryService"
              />
            </v-col>
            <v-col cols="6">
              <v-checkbox
                v-model="militaryServiceJSON.dismissed"
                dense
                label="Уволен?"
                @click="sendMilitaryService"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="data.personal_number !== abit.personal_number"
                dot
              >
                <v-text-field
                  v-model="data.personal_number"
                  v-mask="'XX-######'"
                  dense
                  label="Личный номер"
                  @input="send('personal_number', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="
                  data.personal_number_giving !== abit.personal_number_giving
                "
                dot
              >
                <v-checkbox
                  v-model="data.personal_number_giving"
                  dense
                  label="Выдача личного номера"
                  @change="send('personal_number_giving', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DocumentsComponent',
  props: {
    abit: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      data: {},
      differences: {},
      mark: {},
      markList: [],
      marks: [5, 4, 3, 2],
      tabs: 0,
      menuPassportDate: false,
      document_secrets_access: [
        { value: 'group_1', title: '1 группа' },
        { value: 'group_2', title: '2 группа' },
        { value: 'group_1_in_process', title: '1 группа (в процессе)' },
        { value: 'group_2_in_process', title: '2 группа (в процессе)' },
        { value: 'none', title: 'отсутствует' },
      ],
      document_ppo_group: [
        { value: 'group_1', title: '1 группа' },
        { value: 'group_2', title: '2 группа' },
        { value: 'group_3', title: '3 группа' },
        { value: 'group_4', title: '4 группа' },
      ],
      document_medical_certificate: [
        { value: 'true', title: 'Имеется' },
        { value: 'false', title: 'Отсутствует' },
      ],
      document_mvd_availability: [
        { value: 'true', title: 'Имеется' },
        { value: 'false', title: 'Отсутствует' },
      ],
      document_mvd_prosecution: [
        { value: 'criminal', title: 'Уголовная' },
        { value: 'administrative', title: 'Административная' },
        { value: 'accounting', title: 'Факт учёта в ОПДН' },
      ],
      dialog: false,
      dialogList: false,
      headers: [
        { value: 'subject.name', text: 'Предмет' },
        { value: 'mark', text: 'Оценка' },
        { value: 'actions', text: 'Действие' },
      ],
      ranks: [
        'Рядовой',
        'Ефрейтор',
        'Младший сержант',
        'Сержант',
        'Старший сержант',
        'Старшина',
        'Прапорщик',
        'Старший прапорщик',
      ],
      categories: [
        { value: 'conscription', title: 'По призыву' },
        { value: 'contract', title: 'Контракт' },
      ],
      institute: {},
      menuInstitutes: false,
    }
  },
  computed: {
    ...mapGetters(['subjects', 'schoolMarks', 'institutes']),
    passportJSON() {
      return this.data.document_passport
        ? JSON.parse(this.data.document_passport)
        : {
            series: '',
            num: '',
            issued_by: '',
            department_code: '',
            birthplace: '',
          }
    },
    militaryServiceJSON() {
      return this.data.militaryService
        ? JSON.parse(this.data.militaryService)
        : {}
    },
    years() {
      const array = []
      for (let i = moment().year() - 20; i <= moment().year() + 10; i++) {
        array.push(i.toString())
      }
      return array
    },
    educationJSON() {
      return this.data.education ? JSON.parse(this.data.education) : {}
    },
    uncanceledEducationJSON() {
      return this.data.uncanceledEducation
        ? JSON.parse(this.data.uncanceledEducation)
        : {}
    },
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
    },
    data() {
      if (this.data.id) {
        this.fetchSchoolMark(this.data.id)
      }
    },
  },
  created() {
    this.fetchSubjects()
    this.fetchInstitutes()
  },
  mounted() {
    this.data = { ...this.abit }
  },
  methods: {
    ...mapActions([
      'addSchoolMark',
      'fetchSubjects',
      'fetchSchoolMark',
      'putSchoolMark',
      'fetchInstitutes',
      'addInstitutes',
    ]),
    badgeColorPassport() {
      if (
        (this.abit.document_passport &&
          this.abit.document_passport !== JSON.stringify(this.passportJSON)) ||
        (!this.abit.document_passport &&
          JSON.stringify(this.passportJSON) !==
            `{"series":"","num":"","issued_by":"","department_code":"","birthplace":""}`)
      ) {
        return true
      } else return false
    },
    badgeColorEducation() {
      if (
        (this.abit.education &&
          this.abit.education !== JSON.stringify(this.educationJSON)) ||
        (!this.abit.education && JSON.stringify(this.educationJSON) !== '{}')
      ) {
        return true
      } else return false
    },
    badgeColorUncanceledEducation() {
      if (
        (this.abit.uncanceledEducation &&
          this.abit.uncanceledEducation !==
            JSON.stringify(this.uncanceledEducationJSON)) ||
        (!this.abit.uncanceledEducation &&
          JSON.stringify(this.uncanceledEducationJSON) !== '{}')
      ) {
        return true
      } else return false
    },
    updateMark(fieldName, event) {
      this.mark[fieldName] = event
    },
    updateMarkSubject(fieldName, event) {
      this.mark[fieldName] = this.subjects[event - 1]
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD-MM-YYYY')
    },
    formatDateYear(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('YYYY')
    },
    changePassportDate(event) {
      this.passportJSON.date_issue = new Date(event).toISOString()
      this.menuPassportDate = false
      this.sendPassport()
    },
    changeDateEducation(event) {
      this.educationJSON.date_end = new Date(`${event}-01-01`).toISOString()
      this.sendEducation()
    },
    changeDateUncanceledEducationEnd(event) {
      this.uncanceledEducationJSON.date_end = new Date(event).toISOString()
      this.sendUncanceledEducation()
    },
    changeDateUncanceledEducationAdmission(event) {
      this.uncanceledEducationJSON.date_admission = new Date(
        event
      ).toISOString()
      this.sendUncanceledEducation()
    },
    saveMark() {
      if (!this.mark.abitSubjectId) {
        this.mark.abitId = this.abit.id
        this.addSchoolMark(this.mark)
        this.mark.mark = ''
        this.mark.subject = ''
      } else {
        this.putSchoolMark(this.mark)
        this.dialog = false
      }
    },
    saveMarkList() {
      for (var key in this.markList) {
        const M = {
          mark: parseInt(this.markList[key], 10),
          subject: this.subjects[key].id,
          abitId: this.abit.id,
        }
        this.addSchoolMark(M)
      }
    },
    editMark(item) {
      this.mark = item
      this.dialog = true
    },
    send(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    sendPassport() {
      this.data.document_passport = JSON.stringify(this.passportJSON)
      this.differences.document_passport = this.data.document_passport
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    sendEducation() {
      this.data.education = JSON.stringify(this.educationJSON)
      this.differences.education = this.data.education
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    sendEducationInstitute(event) {
      this.educationJSON.institute = event
      this.educationJSON.address = this.institutes[event - 1].address
      this.sendEducation()
    },
    sendUncanceledEducation() {
      this.data.uncanceledEducation = JSON.stringify(
        this.uncanceledEducationJSON
      )
      this.differences.uncanceledEducation = this.data.uncanceledEducation
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    badgeColorMilitaryService() {
      if (
        (this.abit.militaryService &&
          this.abit.militaryService !==
            JSON.stringify(this.militaryServiceJSON)) ||
        (!this.abit.militaryService &&
          JSON.stringify(this.militaryServiceJSON) !== '{}')
      ) {
        return true
      } else return false
    },
    sendMilitaryService() {
      this.data.militaryService = JSON.stringify(this.militaryServiceJSON)
      this.differences.militaryService = this.data.militaryService
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    saveInstitute() {
      const newInstitute = Object.assign({}, this.institute)
      this.addInstitutes(newInstitute)
      this.menuInstitutes = false
      this.fetchInstitutes()
      this.institute = {}
    },
  },
}
</script>
