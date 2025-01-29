<template>
  <v-dialog
    v-model="queryDialog"
    max-width="2500px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span>Мультизапрос</span>
        <v-btn
          @click="addFilter"
          icon
          color="primary"
          large
          ><v-icon>mdi-plus-circle-outline</v-icon></v-btn
        >
        <v-btn
          @click="sendFilterAbits"
          icon
          color="primary"
          large
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
        <v-autocomplete
          label="Выбрать шаблон"
          v-model="template"
          :items="this.filterTemplates"
          item-text="name"
          item-value="id"
          @input="selectTemplate"
          prepend-inner-icon="mdi-tab-search"
          class="mx-12"
          style="max-width: 240px"
        />
        <v-btn
          @click="addTemplate"
          icon
          color="primary"
          large
          ><v-icon>mdi-tab-plus</v-icon></v-btn
        >
        <v-text-field
          label="Создать шаблон"
          v-model="newTemplate"
          class="mr-12"
          style="max-width: 240px"
        />
        <v-spacer />
        <v-btn
          @click="exportFilter"
          icon
          color="primary"
          large
          ><v-icon>mdi-table-arrow-down</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              label="Таблица"
              v-model="filteredHeaders"
              :items="filterHeaders"
              item-text="text"
              item-value="value"
              dense
              clearable
              multiple
            />

            <div>
              <draggable
                v-model="filteredHeaders"
                :options="{ animations: 200 }"
              >
                <v-chip
                  v-for="item in filteredHeaders"
                  :key="item"
                  close
                  @click:close="removeItem(item)"
                  color="primary"
                >
                  {{ filterHeaders.find((head) => head.value == item).text }}
                </v-chip>
              </draggable>
            </div>
          </v-col>
        </v-row>
        <div
          v-for="(F, index) in filters"
          :key="`tab_${index}`"
          :value="F"
        >
          <v-row>
            <v-col>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                    v-model="filterField[index]"
                    label="Поле"
                    :items="filterFields"
                    item-text="name"
                    item-value="id"
                    chips
                    clearable
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-select
                    v-model="filterCompare[index]"
                    label="Условие"
                    :items="filterCompares"
                    item-text="name"
                    item-value="id"
                    chips
                    clearable
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-col
                  cols="2"
                  v-for="(V, i) in filterValue[index]"
                  :key="`tab_${i}`"
                  :value="V"
                >
                  <v-text-field
                    v-model="filterValue[index][i]"
                    dense
                    small
                    label="Значение"
                  />
                </v-col>
                <v-col cols="1">
                  <v-btn
                    @click="addFilterValue(index)"
                    icon
                    color="success"
                    ><v-icon>mdi-plus-circle-outline</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-divider />
        </div>
      </v-card-text>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="this.ALL"
      item-key="id"
      fixed-header
      disable-pagination
      hide-default-footer
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          color="primary"
          icon
          @click="selectAbit(item)"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-dialog>
</template>

<script>
import draggable from 'vuedraggable'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MultiQueryComponent',
  components: {
    draggable,
  },
  data() {
    return {
      queryDialog: false,
      ALL: [],
      headers: [],
      search: null,

      filters: [],
      values: [],
      filteredHeaders: [],
      filterHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Фамилия', value: 'lastName' },
        { text: 'Имя', value: 'firstName' },
        { text: 'Отчество', value: 'surName' },
        { text: 'Дата рождения', value: 'birthday' },
        { text: 'Примечание', value: 'note' },
        { text: 'Национальность', value: 'nationality' },
        { text: 'Пол', value: 'gender' },
        { text: 'Телефон 1', value: 'phone_1' },
        { text: 'Телефон 2', value: 'phone_2' },
        { text: 'Место жительства', value: 'residence' },
        { text: 'Второе гражданство', value: 'secondCitizenship' },
        { text: '№ Личного дела', value: 'personal_file_number' },
        { text: '№ ЛД (счёт)', value: 'personal_file_number_count' },
        { text: 'Регистрационный номер ЛД', value: 'personal_file_reg' },
        { text: 'Дата регистрации ЛД', value: 'personal_file_date_reg' },
        { text: 'Наличие ЛД', value: 'personal_file_existence' },
        { text: 'Семейное положение', value: 'family_status' },
        { text: 'Адрес родителей', value: 'family_address' },
        { text: 'Социальный статус', value: 'family_social_status' },
        { text: 'Детей в семье', value: 'family_childrens' },
        { text: 'Количество детей', value: 'abit_childrens' },
        { text: '(Отец) Фамилия', value: 'father_lastName' },
        { text: '(Отец) Имя', value: 'father_firstName' },
        { text: '(Отец) Отчество', value: 'father_surName' },
        { text: '(Отец) Дата рождения', value: 'father_birthday' },
        { text: '(Отец) Утеря', value: 'father_fail' },
        { text: '(Отец) Статус', value: 'father_status' },
        { text: '(Мать) Фамилия', value: 'mother_lastName' },
        { text: '(Мать) Имя', value: 'mother_firstName' },
        { text: '(Мать) Отчество', value: 'mother_surName' },
        { text: '(Мать) Дата рождения', value: 'mother_birthday' },
        { text: '(Мать) Утеря', value: 'mother_fail' },
        { text: '(Мать) Статус', value: 'mother_status' },
        { text: 'Личный номер', value: 'personal_number' },
        { text: 'Выдача личного номера', value: 'personal_number_giving' },
        { text: 'Звание', value: 'militaryService_rank' },
        { text: 'Должность', value: 'militaryService_post' },
        { text: 'Место службы', value: 'militaryService_place' },
        { text: 'Воинская часть', value: 'militaryService_unit' },
        { text: 'Адрес в/ч', value: 'militaryService_unit_address' },
        { text: 'Категория службы', value: 'militaryService_category' },
        { text: 'В запасе', value: 'militaryService_dismissed' },
        { text: 'Мобилизован', value: 'militaryService_mobilization' },
        { text: 'Сборы (в/служба)', value: 'militaryService_collection' },
        { text: 'СВО', value: 'militaryService_SVO' },
        { text: 'Военный комиссариат', value: 'militaryCommissariat' },
        {
          text: 'Военный комиссариат (имя)',
          value: 'militaryCommissariat_name',
        },
        {
          text: 'Регион военного комиссариата',
          value: 'militaryCommissariat_region',
        },
        {
          text: 'Адрес военного комиссариата',
          value: 'militaryCommissariat_address',
        },
        { text: 'Округ', value: 'militaryDistrict' },
        { text: 'Округ (полное имя)', value: 'militaryDistrict_name' },
        { text: 'Установленная квота', value: 'establishedQuota' },
        {
          text: 'Проверка установленной квоты',
          value: 'establishedQuota_test',
        },
        { text: 'Отдельная квота', value: 'separateQuota' },
        { text: 'Проверка отдельной квоты', value: 'separateQuota_test' },
        { text: 'Преимущественное право', value: 'priorityRight' },
        {
          text: 'Проверка преимущественного права',
          value: 'priorityRight_test',
        },
        { text: 'Набор', value: 'recruitment' },
        { text: 'Признак', value: 'sign' },
        { text: 'Дата регистрации', value: 'admission_date_reg' },
        { text: 'Дата прибытия', value: 'admission_date' },
        { text: 'Комиссия', value: 'admission_commission' },
        { text: 'Регион комиссии', value: 'admission_commission_region' },
        { text: 'Экз. группа', value: 'admission_examination_group' },
        { text: 'Источники информации', value: 'admission_source_information' },
        {
          text: 'Желаемая специальность',
          value: 'specialty_military_commissariat',
        },
        { text: 'Специальность 1', value: 'specialty_1' },
        { text: 'Факультет', value: 'faculty' },
        { text: 'Специальность 2', value: 'specialty_2' },
        { text: 'Специальность 3', value: 'specialty_3' },
        { text: 'Специальность (зачислен)', value: 'specialty_admission' },
        { text: 'Причина отчисления', value: 'expulsion_reason' },
        { text: 'Дата отчисления', value: 'expulsion_date' },
        { text: 'Примечание отчисления', value: 'expulsion_note' },
        { text: 'Казачье общество', value: 'cossack_society' },
        { text: 'Допуск к ССГТ', value: 'document_secrets_access' },
        { text: 'Снилс', value: 'document_snils' },
        { text: 'ИНН', value: 'document_inn' },
        { text: 'Мед справка', value: 'document_medical_certificate' },
        { text: 'Группа ППО', value: 'document_ppo_group' },
        { text: 'Группа ППО(карта)', value: 'document_ppo_group_card' },
        { text: 'Справка МВД', value: 'document_mvd_availability' },
        { text: 'МВД ответственность', value: 'document_mvd_prosecution' },
        { text: 'Наличие паспорта', value: 'document_passport_presence' },
        {
          text: 'Наличие свидетельства о рождении',
          value: 'document_birthday_presence',
        },
        {
          text: 'Наличие документа об образовании',
          value: 'document_education_presence',
        },
        { text: 'Серия паспорта', value: 'passport_series' },
        { text: 'Номер паспорта', value: 'passport_num' },
        { text: 'Место рождения', value: 'passport_birthplace' },
        { text: 'Дата выдачи паспорта', value: 'passport_date_issue' },
        { text: 'Паспорт выдан', value: 'passport_issued_by' },
        { text: 'Паспорт код п/р', value: 'passport_department_code' },
        { text: 'Категория образования', value: 'education_category' },
        {
          text: 'Дата окончания учебного заведения',
          value: 'education_date_end',
        },
        { text: 'Образовательное учреждение', value: 'education_institute' },
        {
          text: 'Адрес образовательного учреждения',
          value: 'education_institute_address',
        },
        { text: 'Документ об образовании', value: 'education_document' },
        {
          text: 'Категория неоконченного образования',
          value: 'uncanceledEducation_category',
        },
        {
          text: 'Дата поступления (неоконченного образования)',
          value: 'uncanceledEducation_date_admission',
        },
        {
          text: 'Дата окончания (неоконченного образования)',
          value: 'uncanceledEducation_date_end',
        },
        {
          text: 'Период обучения (неоконченного образования)',
          value: 'uncanceledEducation_period_study',
        },
        {
          text: 'Курс (неоконченного образования)',
          value: 'uncanceledEducation_course',
        },
        {
          text: 'Семестров закрыто (неоконченного образования)',
          value: 'uncanceledEducation_semesters_end',
        },
        {
          text: 'Образовательное учреждение (неоконченного образования)',
          value: 'uncanceledEducation_institute',
        },
        {
          text: 'Адрес образовательного учреждения (неоконченного образования)',
          value: 'uncanceledEducation_institute_address',
        },
        {
          text: 'Примечание (неоконченного образования)',
          value: 'uncanceledEducation_note',
        },
        { text: '(ЕГЭ) Математика', value: 'ege_math' },
        { text: '(ЕГЭ) Русский язык', value: 'ege_rus' },
        { text: '(ЕГЭ) Физика', value: 'ege_phiz' },
        { text: '(ЕГЭ) Информатика', value: 'ege_inf' },
        { text: '(ЕГЭ) География', value: 'ege_geo' },
        { text: '(ЕГЭ) История', value: 'ege_hist' },
        { text: '(ЕГЭ) Обществознание', value: 'ege_obsh' },
        { text: '(Традиция) Математика', value: 'entrance_math' },
        { text: '(Традиция) Русский язык', value: 'entrance_rus' },
        { text: '(Традиция) Физика', value: 'entrance_phiz' },
        { text: '(Традиция) Информатика', value: 'entrance_inf' },
        { text: '(Традиция) География', value: 'entrance_geo' },
        { text: '(Традиция) История', value: 'entrance_hist' },
        { text: '(Традиция) Обществознание', value: 'entrance_obsh' },
        { text: '(ФП) 1 упр.', value: 'sport_score_1' },
        { text: '(ФП) 2 упр.', value: 'sport_score_2' },
        { text: '(ФП) 3 упр.', value: 'sport_score_3' },
        { text: '(ФП) дата', value: 'sport_date' },
        { text: 'Профотбор', value: 'qualificationExam_mark' },
        { text: 'Профотбор дата', value: 'qualificationExam_date' },
        { text: 'Профотбор группа', value: 'qualificationExam_group' },
        { text: 'Прибыл из', value: 'arrivedFrom' },
        { text: 'Прибыл из (имя)', value: 'arrivedFrom_name' },
        { text: 'Убыл в', value: 'goneIn' },
        { text: 'Убыл в (имя)', value: 'goneIn_name' },
        { text: 'Вызов (№)', value: 'call_number' },
        { text: 'Вызов (дата)', value: 'call_date' },
        { text: 'Вызов (результат)', value: 'call_result' },
        { text: 'Вызов (примечание)', value: 'call_note' },
        { text: 'Сборы дата прибытия', value: 'collect_date_admission' },
        { text: 'Сборы довольствие', value: 'collect_food' },
        { text: 'Время создания', value: 'createdAt' },
      ],
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
      filterCompares: [
        { name: 'Содержит', id: 'includes' },
        { name: 'Не содержит', id: 'notIncludes' },
        { name: 'Равно', id: '=' },
        { name: 'Больше', id: '>' },
        { name: 'Меньше', id: '<' },
        { name: 'Больше или равно', id: '>=' },
        { name: 'Меньше или равно', id: '<=' },
        { name: 'Не заполнено', id: 'null' },
        { name: 'Заполнено', id: 'notNull' },
      ],
      filterField: [],
      filterCompare: [],
      filterValue: [],
      template: null,
      newTemplate: '',
    }
  },
  computed: {
    ...mapGetters(['filteredAbits', 'filterTemplates', 'user']),
  },
  async created() {
    await this.getFilterTemplates()
  },
  methods: {
    ...mapActions([
      'filterAbits',
      'exportFilterToExcel',
      'getFilterTemplates',
      'addFilterTemplate',
    ]),
    async selectAbit(abit) {
      await this.$router.replace({
        name: 'abit',
        params: { id: abit.id },
      })
      this.queryDialog = false
    },
    async sendFilterAbits() {
      await this.selectHeaders()
      const FILTERS = {
        field: this.filterField,
        compare: this.filterCompare,
        values: this.filterValue,
      }
      await this.filterAbits(FILTERS)
      this.ALL = this.filteredAbits
    },
    async exportFilter() {
      const exportData = this.ALL.map((abit) =>
        Object.keys(abit)
          .filter((key) => this.filteredHeaders.includes(key))
          .reduce((obj, key) => {
            obj[key] = abit[key]
            return obj
          }, {}),
      )
      this.exportFilterToExcel(exportData)
    },
    async addTemplate() {
      const FILTERS = {
        field: this.filterField,
        compare: this.filterCompare,
        values: this.filterValue,
        filters: this.filters,
      }
      const data = {
        name: this.newTemplate,
        author: JSON.parse(sessionStorage.getItem('user'))?.username,
        headers: this.filteredHeaders,
        filters: JSON.stringify(FILTERS),
      }
      await this.addFilterTemplate(data)
    },
    selectTemplate(event) {
      this.filteredHeaders = this.filterTemplates[event - 1].headers
      const FILTERS = JSON.parse(this.filterTemplates[event - 1].filters)
      this.filters = FILTERS.filters
      this.filterField = FILTERS.field
      this.filterCompare = FILTERS.compare
      this.filterValue = FILTERS.values
    },
    selectHeaders() {
      this.headers = []
      for (let x in this.filteredHeaders) {
        this.headers.push(
          this.filterHeaders.find(
            (head) => head.value == this.filteredHeaders[x],
          ),
        )
      }
      this.headers.push({ text: 'Действие', value: 'actions' })
    },
    addFilterValue(index) {
      this.filterValue[index].push(null)
    },
    addFilter() {
      this.filters.push(null)
      this.filterField.push(null)
      this.filterCompare.push(null)
      this.filterValue.push([null])
    },
    removeItem(item) {
      this.filteredHeaders.splice(this.filteredHeaders.indexOf(item), 1)
    },
  },
}
</script>
