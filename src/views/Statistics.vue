<template>
  <v-container
    fluid
    class="BGclr"
    style="height: 100vh"
  >
    <v-row>
      <v-col cols="8">
        <v-card>
          <v-card-text>
            <v-data-table
              :headers="getHeaders"
              :items="this.ALL"
              item-key="id"
              :search="search"
              fixed-header
              height="600px"
              disable-pagination
              hide-default-footer
              dense
              sort-desc
              multi-sort
            >
              <template v-slot:top>
                <v-dialog
                  v-model="dialogDateAdmission"
                  max-width="500px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">
                        Изменение даты прибытия {{ editedItem?.name }}
                      </span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="editedItem.date_admission"
                              label="Дата прибытия"
                              type="date"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="saveDateAdmission"
                      >
                        Сохранить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:item.count="{ item }">
                <span>{{ item.count ?? item.abit?.length }}</span>
              </template>
              <template v-slot:item.date_admission="{ item }">
                <span>{{ formatDate(item.date_admission) }}</span>
              </template>
              <template v-slot:item.field="{ item }">
                <span>{{ item.field }}</span>
              </template>
              <template v-slot:item.close="{ item }">
                <span>{{ item.close ? 'Закрыта' : 'Открыта' }}</span>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  color="primary"
                  icon
                  @click="closeGroup(item)"
                  v-if="setting == 'groups'"
                >
                  <v-icon>mdi-lock-outline</v-icon>
                </v-btn>
                <v-btn
                  color="primary"
                  icon
                  @click="editDateAdmissionRegion(item)"
                  v-if="setting == 'regions'"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-data-table>
            <span>Всего в таблице: {{ ALL.length }}</span>
            <v-spacer />
            <span>Выбрано: {{ selected.length }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            Настройки
            <v-spacer />
            <v-switch
              v-model="notExpulsion"
              label="Без отчисленных"
          /></v-card-title>
          <v-card-text>
            <v-radio-group
              v-model="setting"
              row
              dense
            >
              <v-radio
                label="Спец"
                value="specialty"
              ></v-radio>
              <v-radio
                label="Группы"
                value="groups"
              ></v-radio>
              <v-radio
                label="Регионы"
                value="regions"
              ></v-radio>
              <v-radio
                label="Другое"
                value="other"
              ></v-radio>
            </v-radio-group>
            <v-select
              v-model="filterField"
              label="Поле"
              :items="filterFields"
              item-text="name"
              item-value="id"
              chips
              clearable
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="exportFilter"
              :disabled="this.setting != 'other'"
            >
              <v-icon>mdi-table-arrow-down</v-icon> В EXCEL
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Statistics',
  data() {
    return {
      notExpulsion: true,
      setting: null,
      ALL: [],
      selected: [],
      filterField: null,
      filterFields: [
        { name: 'ID', id: 'id' },
        { name: 'Фамилия', id: 'lastName' },
        { name: 'Имя', id: 'firstName' },
        { name: 'Отчество', id: 'surName' },
        { name: 'Дата рождения', id: 'birthday' },
        { name: 'Примечание', id: 'note' },
        { name: 'Национальность', id: 'nationality' },
        { name: 'Пол', id: 'gender' },
        { name: 'Телефон 1', id: 'phone_1' },
        { name: 'Телефон 2', id: 'phone_2' },
        { name: 'Место жительства', id: 'residence' },
        { name: 'Регион места жительства', id: 'residence_region' },
        { name: 'Второе гражданство', id: 'secondCitizenship' },
        { name: '№ Личного дела', id: 'personal_file_number' },
        { name: '№ ЛД (счёт)', id: 'personal_file_number_count' },
        { name: 'Регистрационный номер ЛД', id: 'personal_file_reg' },
        { name: 'Дата регистрации ЛД', id: 'personal_file_date_reg' },
        { name: 'Наличие ЛД', id: 'personal_file_existence' },
        { name: 'Семейное положение', id: 'family_status' },
        { name: 'Адрес родителей', id: 'family_address' },
        { name: 'Социальный статус', id: 'family_social_status' },
        { name: 'Детей в семье', id: 'family_childrens' },
        { name: 'Количество детей', id: 'abit_childrens' },
        { name: '(Отец) Фамилия', id: 'father_lastName' },
        { name: '(Отец) Имя', id: 'father_firstName' },
        { name: '(Отец) Отчество', id: 'father_surName' },
        { name: '(Отец) Дата рождения', id: 'father_birthday' },
        { name: '(Отец) Утеря', id: 'father_fail' },
        { name: '(Отец) Статус', id: 'father_status' },
        { name: '(Мать) Фамилия', id: 'mother_lastName' },
        { name: '(Мать) Имя', id: 'mother_firstName' },
        { name: '(Мать) Отчество', id: 'mother_surName' },
        { name: '(Мать) Дата рождения', id: 'mother_birthday' },
        { name: '(Мать) Утеря', id: 'mother_fail' },
        { name: '(Мать) Статус', id: 'mother_status' },
        { name: 'Личный номер', id: 'personal_number' },
        { name: 'Выдача личного номера', id: 'personal_number_giving' },
        { name: 'Звание', id: 'militaryService_rank' },
        { name: 'Должность', id: 'militaryService_post' },
        { name: 'Место службы', id: 'militaryService_place' },
        { name: 'Воинская часть', id: 'militaryService_unit' },
        { name: 'Адрес в/ч', id: 'militaryService_unit_address' },
        { name: 'Категория службы', id: 'militaryService_category' },
        { name: 'В запасе', id: 'militaryService_dismissed' },
        { name: 'Мобилизован', id: 'militaryService_mobilization' },
        { name: 'Сборы (в/служба)', id: 'militaryService_collection' },
        { name: 'СВО', id: 'militaryService_SVO' },
        { name: 'Военный комиссариат', id: 'militaryCommissariat' },
        { name: 'Военный комиссариат (имя)', id: 'militaryCommissariat_name' },
        {
          name: 'Регион военного комиссариата',
          id: 'militaryCommissariat_region',
        },
        {
          name: 'Адрес военного комиссариата',
          id: 'militaryCommissariat_address',
        },
        { name: 'Округ', id: 'militaryDistrict' },
        { name: 'Округ (полное имя)', id: 'militaryDistrict_name' },
        { name: 'Установленная квота', id: 'establishedQuota' },
        { name: 'Проверка установленной квоты', id: 'establishedQuota_test' },
        { name: 'Отдельная квота', id: 'separateQuota' },
        { name: 'Проверка отдельной квоты', id: 'separateQuota_test' },
        { name: 'Преимущественное право', id: 'priorityRight' },
        { name: 'Проверка преимущественного права', id: 'priorityRight_test' },
        { name: 'Набор', id: 'recruitment' },
        { name: 'Признак', id: 'sign' },
        { name: 'Дата регистрации', id: 'admission_date_reg' },
        { name: 'Дата прибытия', id: 'admission_date' },
        { name: 'Комиссия', id: 'admission_commission' },
        { name: 'Регион комиссии', id: 'admission_commission_region' },
        { name: 'Экз. группа', id: 'admission_examination_group' },
        { name: 'Источники информации', id: 'admission_source_information' },
        {
          name: 'Желаемая специальность',
          id: 'specialty_military_commissariat',
        },
        { name: 'Специальность 1', id: 'specialty_1' },
        { name: 'Факультет', id: 'faculty' },
        { name: 'Специальность 2', id: 'specialty_2' },
        { name: 'Специальность 3', id: 'specialty_3' },
        { name: 'Специальность (зачислен)', id: 'specialty_admission' },
        { name: 'Причина отчисления', id: 'expulsion_reason' },
        { name: 'Дата отчисления', id: 'expulsion_date' },
        { name: 'Примечание отчисления', id: 'expulsion_note' },
        { name: 'Казачье общество', id: 'cossack_society' },
        { name: 'Допуск к ССГТ', id: 'document_secrets_access' },
        { name: 'Снилс', id: 'document_snils' },
        { name: 'ИНН', id: 'document_inn' },
        { name: 'Мед справка', id: 'document_medical_certificate' },
        { name: 'Группа ППО', id: 'document_ppo_group' },
        { name: 'Группа ППО(карта)', id: 'document_ppo_group_card' },
        { name: 'Справка МВД', id: 'document_mvd_availability' },
        { name: 'МВД ответственность', id: 'document_mvd_prosecution' },
        { name: 'Наличие паспорта', id: 'document_passport_presence' },
        {
          name: 'Наличие свидетельства о рождении',
          id: 'document_birthday_presence',
        },
        {
          name: 'Наличие документа об образовании',
          id: 'document_education_presence',
        },
        { name: 'Серия паспорта', id: 'passport_series' },
        { name: 'Номер паспорта', id: 'passport_num' },
        { name: 'Место рождения', id: 'passport_birthplace' },
        { name: 'Дата выдачи паспорта', id: 'passport_date_issue' },
        { name: 'Паспорт выдан', id: 'passport_issued_by' },
        { name: 'Паспорт код п/р', id: 'passport_department_code' },
        { name: 'Категория образования', id: 'education_category' },
        { name: 'Дата окончания учебного заведения', id: 'education_date_end' },
        { name: 'Образовательное учреждение', id: 'education_institute' },
        {
          name: 'Адрес образовательного учреждения',
          id: 'education_institute_address',
        },
        { name: 'Документ об образовании', id: 'education_document' },
        {
          name: 'Категория неоконченного образования',
          id: 'uncanceledEducation_category',
        },
        {
          name: 'Дата поступления (неоконченного образования)',
          id: 'uncanceledEducation_date_admission',
        },
        {
          name: 'Дата окончания (неоконченного образования)',
          id: 'uncanceledEducation_date_end',
        },
        {
          name: 'Период обучения (неоконченного образования)',
          id: 'uncanceledEducation_period_study',
        },
        {
          name: 'Курс (неоконченного образования)',
          id: 'uncanceledEducation_course',
        },
        {
          name: 'Семестров закрыто (неоконченного образования)',
          id: 'uncanceledEducation_semesters_end',
        },
        {
          name: 'Образовательное учреждение (неоконченного образования)',
          id: 'uncanceledEducation_institute',
        },
        {
          name: 'Адрес образовательного учреждения (неоконченного образования)',
          id: 'uncanceledEducation_institute_address',
        },
        {
          name: 'Примечание (неоконченного образования)',
          id: 'uncanceledEducation_note',
        },
        { name: '(ЕГЭ) Математика', id: 'ege_math' },
        { name: '(ЕГЭ) Русский язык', id: 'ege_rus' },
        { name: '(ЕГЭ) Физика', id: 'ege_phiz' },
        { name: '(ЕГЭ) Информатика', id: 'ege_inf' },
        { name: '(ЕГЭ) География', id: 'ege_geo' },
        { name: '(ЕГЭ) История', id: 'ege_hist' },
        { name: '(ЕГЭ) Обществознание', id: 'ege_obsh' },
        { name: '(Традиция) Математика', id: 'entrance_math' },
        { name: '(Традиция) Русский язык', id: 'entrance_rus' },
        { name: '(Традиция) Физика', id: 'entrance_phiz' },
        { name: '(Традиция) Информатика', id: 'entrance_inf' },
        { name: '(Традиция) География', id: 'entrance_geo' },
        { name: '(Традиция) История', id: 'entrance_hist' },
        { name: '(Традиция) Обществознание', id: 'entrance_obsh' },
        { name: '(ФП) 1 упр.', id: 'sport_score_1' },
        { name: '(ФП) 2 упр.', id: 'sport_score_2' },
        { name: '(ФП) 3 упр.', id: 'sport_score_3' },
        { name: '(ФП) дата', id: 'sport_date' },
        { name: 'Профотбор', id: 'qualificationExam_mark' },
        { name: 'Профотбор дата', id: 'qualificationExam_date' },
        { name: 'Профотбор группа', id: 'qualificationExam_group' },
        { name: 'Прибыл из', id: 'arrivedFrom' },
        { name: 'Прибыл из (имя)', id: 'arrivedFrom_name' },
        { name: 'Убыл в', id: 'goneIn' },
        { name: 'Убыл в (имя)', id: 'goneIn_name' },
        { name: 'Вызов (№)', id: 'call_number' },
        { name: 'Вызов (дата)', id: 'call_date' },
        { name: 'Вызов (результат)', id: 'call_result' },
        { name: 'Вызов (примечание)', id: 'call_note' },
        { name: 'Сборы дата прибытия', id: 'collect_date_admission' },
        { name: 'Сборы довольствие', id: 'collect_food' },
        { name: 'Время создания', id: 'createdAt' },
      ],
      headersGroups: [
        {
          text: 'Группа',
          value: 'name',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Статус',
          value: 'close',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Количество',
          value: 'count',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Действие',
          value: 'actions',
          align: 'center',
          width: '1%',
        },
      ],
      headersRegions: [
        {
          text: 'Регион',
          value: 'name',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Дата прибытия',
          value: 'date_admission',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Количество',
          value: 'count',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Действие',
          value: 'actions',
          align: 'center',
          width: '1%',
        },
      ],
      headersSpecialty: [
        {
          text: 'Факультет',
          value: 'faculty',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Специальность',
          value: 'abbreviation',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Количество',
          value: 'count',
          align: 'center',
          width: '1%',
        },
      ],
      headers: [
        {
          text: 'Параметр',
          value: 'field',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Количество',
          value: 'count',
          align: 'center',
          width: '1%',
        },
      ],
      search: null,
      editedItem: { date_admission: '' },
      dialogDateAdmission: false,
    }
  },
  computed: {
    ...mapGetters(['fullAbits', 'specialty', 'examinationGroups', 'regions']),

    getHeaders() {
      const findedAbits = this.notExpulsion
        ? this.fullAbits.filter((abit) => abit.expulsion_reason == null)
        : this.fullAbits

      if (this.setting == 'specialty') {
        this.ALL = this.specialty
        this.specialty.reduce((acc, reg) => {
          reg.abit = findedAbits.filter(
            (abit) => abit.specialty_1 == reg.abbreviation,
          )
        }, {})
        return this.headersSpecialty
      } else if (this.setting == 'groups') {
        this.ALL = this.examinationGroups
        this.examinationGroups.reduce((acc, reg) => {
          reg.abit = findedAbits.filter(
            (abit) => abit.admission_examination_group == reg.name,
          )
        }, {})
        return this.headersGroups
      } else if (this.setting == 'regions') {
        this.ALL = this.regions
        this.regions.reduce((acc, reg) => {
          reg.abit = findedAbits.filter(
            (abit) => abit.residence_region == reg.name,
          )
        }, {})
        return this.headersRegions
      } else if (this.setting == 'other') {
        const nats = findedAbits.reduce((acc, abit) => {
          if (acc[abit[this.filterField]]) {
            acc[abit[this.filterField]]++
          } else {
            acc[abit[this.filterField]] = 1
          }
          return acc
        }, {})
        const result = Object.entries(nats).map(([field, count]) => ({
          field,
          count,
        }))
        this.ALL = result
        return this.headers
      }
    },
  },
  async created() {
    await this.fetchFullAbits()
    await this.fetchSpecialty()
    await this.fetchExaminationGroups()
    await this.fetchRegions()
  },
  methods: {
    ...mapActions([
      'holesToStatements',
      'fetchFullAbits',
      'fetchSpecialty',
      'fetchExaminationGroups',
      'exportFilterToExcel',
      'updateExaminationGroup',
      'fetchRegions',
      'updateRegion',
    ]),
    async saveDateAdmission() {
      const data = {
        id: this.editedItem.id,
        date_admission: this.editedItem.date_admission,
      }
      await this.updateRegion(data)
      this.fetchRegions()
      this.ALL = this.regions
      this.dialogDateAdmission = false
    },
    editDateAdmissionRegion(item) {
      this.editedItem = Object.assign({}, item)
      this.dialogDateAdmission = true
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('YYYY-MM-DD')
    },

    async closeGroup(item) {
      await this.updateExaminationGroup({ close: true, id: item.id })
      await this.fetchExaminationGroups()
      this.ALL = this.examinationGroups
    },

    async exportFilter() {
      const exportData = this.ALL.map((abit) =>
        Object.keys(abit).reduce((obj, key) => {
          obj[key] = abit[key]
          return obj
        }, {}),
      )
      this.exportFilterToExcel(exportData)
    },
  },
}
</script>

<style>
.v-data-table {
  table-layout: fixed;
}
.BGclr {
  position: sticky;
  background: -webkit-linear-gradient(
    30deg,
    #ffffff,
    #abaffc,
    #ebe8ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    30deg,
    #ffffff,
    #abaffc,
    #ebe8ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
