<template>
  <v-data-table
    :headers="headers"
    :items="$store.getters.allAbits"
    item-key="id"
    :search="search"
    height="600px"
    dense
    fixed-header
    disable-pagination
    hide-default-footer
    @click:row="checkChangeAbit($event)"
    item-class="selected"
  >
    <template #top>
      <v-toolbar>
        <v-toolbar-title>
          <p>{{ $store.getters.allAbits.length }}</p>
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-text-field
          v-model="search"
          label="Поиск"
          class="mx-4"
        />
        <v-dialog
          v-model="dialogCheck"
          max-width="500px"
        >
          <v-card>
            <v-card-title>Вернуться, чтобы сохранить изменения?</v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="secondary"
                @click="changeAbit"
              >
                Продолжить
              </v-btn>
              <v-btn
                color="success"
                @click="cancelChange"
              >
                Вернуться
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogAdd"
          max-width="1200px"
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
                <v-form
                  ref="form"
                  v-model="formValid"
                  @submit.prevent="saveAbitData"
                >
                  <v-container>
                    <v-row>
                      <v-col cols="3">
                        <v-text-field
                          v-model="data.lastName"
                          label="Фамилия"
                          :rules="[rules.required]"
                          required
                          @keydown.space.prevent="focusField('first')"
                          @input="normalizationText('lastName')"
                        />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="data.firstName"
                          ref="first"
                          label="Имя"
                          required
                          :rules="[rules.required]"
                          @keydown.space.prevent="focusField('sur')"
                          @input="normalizationText('firstName')"
                        />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="data.surName"
                          ref="sur"
                          label="Отчество"
                          @keydown.space.prevent="focusField('birth')"
                          @input="normalizationText('surName')"
                        />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="data.birthday"
                          ref="birth"
                          label="Дата рождения"
                          type="date"
                          required
                          :rules="[rules.required]"
                          @keyup.enter="saveAbitData"
                        />
                      </v-col>

                      <v-spacer />

                      <v-btn
                        icon
                        @click="show = !show"
                      >
                        <v-icon>{{
                          show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                        }}</v-icon>
                      </v-btn>

                      <v-expand-transition>
                        <v-container>
                          <div v-show="show">
                            <v-divider></v-divider>
                            <v-row>
                              <v-col cols="3">
                                <v-text-field
                                  v-model="data.admission_date_reg"
                                  label="Дата регистрации заявления"
                                  type="date"
                                />
                              </v-col>
                              <v-col cols="3">
                                <v-text-field
                                  v-model="data.admission_date"
                                  label="Дата прибытия"
                                  type="date"
                                />
                              </v-col>
                              <v-col cols="3">
                                <v-autocomplete
                                  class="small-text"
                                  v-model="data.admission_commission"
                                  :items="commissions"
                                  :item-text="nameCommissions"
                                  item-value="id"
                                  label="Приёмная комиссия"
                                />
                              </v-col>
                              <v-col cols="3">
                                <v-autocomplete
                                  v-model="data.arrivedFrom"
                                  :items="militaryInstitute"
                                  item-value="id"
                                  item-text="name"
                                  label="Прибыл из"
                                />
                              </v-col>
                              <v-col cols="3"
                                ><v-radio-group
                                  v-model="data.sign"
                                  row
                                  @change="sendSign('sign', $event)"
                                  dense
                                >
                                  <v-radio
                                    label="Основной"
                                    value="Основной"
                                  ></v-radio>
                                  <v-radio
                                    label="Кадет"
                                    value="Кадет"
                                  ></v-radio>
                                  <v-radio
                                    label="ВУЗ"
                                    value="ВУЗ"
                                  ></v-radio>
                                  <v-radio
                                    label="Выездная группа"
                                    value="Выездная группа"
                                  ></v-radio>
                                  <!-- <v-radio
                                    label="Другой"
                                    value="Другой"
                                  ></v-radio> -->
                                </v-radio-group>
                              </v-col>
                              <v-col>
                                <v-autocomplete
                                  v-model="data.specialty_1"
                                  dense
                                  :items="specialty"
                                  :item-text="nameSpecialty"
                                  item-value="id"
                                  label="1 Специальность"
                                  @input="sendSpecialty('specialty_1', $event)"
                                />
                              </v-col>
                              <v-col>
                                <v-autocomplete
                                  v-model="data.specialty_2"
                                  dense
                                  :items="specialty"
                                  :item-text="nameSpecialty"
                                  item-value="id"
                                  label="2 Специальность"
                                />
                              </v-col>
                              <v-col>
                                <v-autocomplete
                                  v-model="data.specialty_3"
                                  dense
                                  :items="specialty"
                                  :item-text="nameSpecialty"
                                  item-value="id"
                                  label="3 Специальность"
                                />
                              </v-col>
                              <v-col>
                                <v-autocomplete
                                  v-model="data.specialty_4"
                                  dense
                                  :items="specialty"
                                  :item-text="nameSpecialty"
                                  item-value="id"
                                  label="4 Специальность"
                                />
                              </v-col>
                              <v-col>
                                <v-autocomplete
                                  v-model="data.specialty_5"
                                  dense
                                  :items="specialty"
                                  :item-text="nameSpecialty"
                                  item-value="id"
                                  label="5 Специальность"
                                />
                              </v-col>
                              <v-col cols="3">
                                <v-menu
                                  v-model="menuExaminationGroup"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template #activator="{ on, attrs }">
                                    <v-autocomplete
                                      v-model="data.admission_examination_group"
                                      :items="examinationGroups"
                                      item-text="name"
                                      item-value="id"
                                      dense
                                      label="Экз. группа"
                                      v-bind="attrs"
                                      v-on="on"
                                    />
                                  </template>
                                  <v-form
                                    ref="formGroup"
                                    v-model="formGroupValid"
                                  >
                                    <v-card>
                                      <v-card-title>
                                        <span class="text-h5">Выбрать</span>
                                      </v-card-title>

                                      <v-card-text>
                                        <v-container>
                                          <v-row>
                                            <v-col cols="8">
                                              <v-autocomplete
                                                v-model="
                                                  examinationGroup.abbreviation
                                                "
                                                dense
                                                label="Специальность"
                                                :items="abbreviations"
                                                item-value="abbreviation"
                                                item-text="abbreviation"
                                                :rules="[rules.required]"
                                              />
                                            </v-col>
                                            <v-col cols="4">
                                              <v-text-field
                                                v-model="
                                                  examinationGroup.number
                                                "
                                                dense
                                                type="number"
                                                label="Номер"
                                                :rules="[rules.required]"
                                              />
                                            </v-col>
                                          </v-row>
                                        </v-container>
                                      </v-card-text>

                                      <v-card-actions>
                                        <v-spacer />
                                        <v-btn
                                          color="primary"
                                          text
                                          dense
                                          @click="saveExaminationGroup"
                                          :disabled="!formGroupValid"
                                        >
                                          Сохранить
                                        </v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-form>
                                </v-menu>
                              </v-col>
                            </v-row>
                          </div>
                        </v-container>
                      </v-expand-transition>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                text
                @click="closeAdd"
              >
                Отмена
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="saveAbitData"
                :disabled="!formValid"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr
        :class="getClass(item)"
        @click="checkChangeAbit(item)"
        dense
      >
        <td
          class="fixed-column"
          style="font-size: 12px; padding: 0; margin: 0; text-align: center"
        >
          {{ item.id }}
        </td>
        <td
          class="fixed-column"
          style="font-size: 12px; padding: 0; margin: 0; text-align: center"
        >
          {{ item.personal_file_number }}
        </td>
        <td
          class="fixed-column"
          style="font-size: 12px; padding: 0; margin: 0; text-align: center"
        >
          {{
            item.admission_examination_group
              ? item.admission_examination_group.name
              : ''
          }}
        </td>
        <td
          class="fixed-column"
          style="font-size: 12px; padding: 0; margin: 0; text-align: start"
        >
          {{ item.lastName }} {{ item.firstName }} {{ item.surName }}
        </td>
        <td
          class="fixed-column"
          style="font-size: 12px; padding: 0; margin: 0; text-align: center"
        >
          {{ formatDate(item.birthday) }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DataTableComponent',
  props: ['message', 'residenceChild'],
  data() {
    return {
      data: {},
      search: '',
      show: false,
      formValid: false,
      headers: [
        {
          text: 'ID',
          value: 'id',
          width: '1%',
          align: 'center',
        },
        {
          text: '№ ЛД',
          value: 'personal_file_number',
          width: '1%',
          align: 'center',
        },
        {
          text: 'Группа',
          value: 'admission_examination_group',
          width: '1%',
          align: 'center',
        },
        {
          text: 'ФИО',
          value: 'lastName',
          align: 'center',
        },
        // {
        //   text: 'Имя',
        //   value: 'firstName',
        // },
        // {
        //   text: 'Отчество',
        //   value: 'surName',
        // },
        {
          text: 'Дата рождения',
          value: 'birthday',
          width: '1%',
          align: 'center',
        },
        // {
        //   text: 'Действия',
        //   value: 'actions',
        // },
      ],
      selectedAbitId: null,
      menu: false,
      dialogFilter: false,
      dialogAdd: false,
      dialogCheck: false,
      defaultAbit: {
        lastName: '',
        firstName: '',
        surName: '',
      },
      rules: {
        required: (value) => !!value || 'Обязательно.',
      },
      formValid: false,
      editBirthday: '',

      filters: [],
      values: [],
      filteredAbits: [],
      filterFields: [
        { name: 'Фамилия', id: 'lastName' },
        { name: 'Имя', id: 'firstName' },
        { name: 'Отчество', id: 'surName' },
        { name: 'ID', id: 'id' },
        { name: 'Национальность', id: 'nationality' },
        { name: 'Дата рождения', id: 'birthday' },
        { name: 'Примечание', id: 'note' },
        { name: 'Второе гражданство', id: 'secondCitizenship' },
        { name: 'Номер личного дела (счёт)', id: 'personal_file_number_count' },
        { name: 'Номер личного дела', id: 'personal_file_number' },
        { name: 'Наличие личного дела', id: 'personal_file_existence' },
        { name: 'Семейное положение', id: 'family_status' },
        { name: 'Адрес родителей', id: 'family_address' },
        { name: 'Социальный статус', id: 'family_social_status' },
        { name: 'Детей в семье', id: 'family_childrens' },
        { name: 'Наличие детей', id: 'abit_childrens' },
        { name: 'Личный номер', id: 'personal_number' },
        { name: 'Набор', id: 'recruitment' },
        { name: 'Признак', id: 'sign' },
        { name: 'Дата регистрации', id: 'admission_date_reg' },
        { name: 'Дата прибытия', id: 'admission_date' },
        { name: 'Причина отчисления', id: 'expulsion_reason' },
        { name: 'Дата отчисления', id: 'expulsion_date' },
        { name: 'Дата прибытия', id: 'admission_date' },
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
      abbreviations: ['ВУЗ', 'КШ', 'ВГ'],
      commission: {},
      examinationGroup: {},

      menuAdmission: false,
      menuCommission: false,
      menuExaminationGroup: false,
      formGroupValid: false,
      examinationGroup: {},
    }
  },

  computed: {
    ...mapGetters([
      'allAbits',
      'commissions',
      'examinationGroups',
      'specialty',
      'countGroup',
      'user',
      'selectedGroup',
      'militaryInstitute',
    ]),
  },

  async created() {
    this.fetchAbits()
    this.fetchAdmissionCommissions()
    this.fetchMilitaryInstitute()
    this.fetchExaminationGroups()
    await this.fetchSpecialty()
    this.specialty.forEach((title, index) => {
      this.abbreviations.push(title.abbreviation)
    })
  },

  methods: {
    moment,
    ...mapActions([
      'addAbit',
      'fetchAbits',
      'selectAbit',
      'fetchSpecialty',
      'fetchAdmissionCommissions',
      'addAdmissionCommission',
      'fetchExaminationGroups',
      'fetchMilitaryInstitute',
      'addExaminationGroup',
      'fetchCountGroup',
      'saveHistory',
      'updateExaminationGroup',
      'findExaminationGroup',
    ]),
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD-MM-YYYY')
    },

    saveHistoryAdd(createdAbit) {
      const history = {
        abitId: parseInt(createdAbit.id),
        oldValue: JSON.stringify({ create: '' }),
        newValue: JSON.stringify({ create: createdAbit.personal_file_number }),
        changedBy: JSON.parse(sessionStorage.getItem('user'))?.username,
      }
      this.saveHistory(history)
    },

    async saveAdd() {
      this.data.birthday = new Date(this.data.birthday)
      const newAbit = Object.assign({}, this.data)
      console.log(newAbit)
      await this.addAbit(newAbit)
      this.data = Object.assign({}, this.defaultAbit)
      this.dialogAdd = false
      this.$router.replace({
        name: 'abit',
        params: { id: this.allAbits[this.allAbits.length - 1].id },
      })
      this.selectedAbitId = this.allAbits[this.allAbits.length - 1].id
      const createdAbit = this.allAbits.find(
        (abit) => abit.id == this.allAbits[this.allAbits.length - 1].id,
      )
      this.saveHistoryAdd(createdAbit)
    },
    closeAdd() {
      this.dialogAdd = false
      this.data = Object.assign({}, this.defaultAbit)
    },
    checkChangeAbit(item) {
      if (`${item.id}` !== this.$route.path.split('/')[2]) {
        if (this.message || this.residenceChild) {
          this.dialogCheck = true
          this.selectedAbitId = item.id
        } else {
          this.selectedAbitId = item.id
          this.changeAbit()
        }
      }
    },
    cancelChange() {
      this.dialogCheck = false
      this.selectedAbitId = this.id
    },
    async changeAbit() {
      if (this.$route.path.split('/')[3]) {
        await this.$router.replace({
          name: 'component',
          params: { id: this.selectedAbitId },
        })
      } else {
        await this.$router.replace({
          name: 'abit',
          params: { id: this.selectedAbitId },
        })
      }
      this.dialogCheck = false
      this.$emit('checkSave')
    },
    saveAbitData() {
      if (this.$refs.form.validate()) {
        this.saveAdd()
      }
    },
    getClass(item) {
      if (this.$route.path.split('/')[2] === `${item.id}`) {
        return 'selected'
      } else if (
        item.expulsion_reason ? item.expulsion_reason != null : false
      ) {
        return 'expulsed'
      }
    },
    focusField(nextField) {
      if (nextField) {
        this.$refs[nextField].focus()
      }
    },
    normalizationText(key) {
      if (this.data[key].length > 0) {
        this.data[key] =
          this.data[key].charAt(0).toUpperCase() +
          this.data[key].slice(1).toLowerCase()
      }
    },

    async sendSign(key, value) {
      if (
        this.data.admission_examination_group == null &&
        (value == 'ВУЗ' || value == 'Кадет' || value == 'Выездная группа')
      ) {
        if (value == 'ВУЗ') {
          this.examinationGroup.abbreviation = 'ВУЗ'
        } else if (value == 'Кадет') {
          this.examinationGroup.abbreviation = 'КШ'
        } else if (value == 'Выездная группа') {
          this.examinationGroup.abbreviation = 'ВГ'
        }

        let test = null
        this.examinationGroups.forEach((title, index) => {
          if (
            this.examinationGroup.abbreviation == title.abbreviation &&
            title.number < 30
          ) {
            test = title
          }
        })
        if (this.examinationGroup.abbreviation == 'ВГ') {
          const region = this.commissions.find(
            (commission) => commission.id == this.data.admission_commission,
          ).region
          this.examinationGroup.number = parseInt(region)
        } else if (value == 'ВУЗ') {
          const abb = this.militaryInstitute.find(
            (inst) => inst.id == this.data.arrivedFrom,
          ).abbreviation
          this.examinationGroup.abbreviation = abb
          if (test != null) {
            await this.fetchCountGroup(test.id)
            await this.findExaminationGroup(test.id)
            if (this.countGroup < 30 && this.selectedGroup.close == false) {
              this.examinationGroup.number = test.number
            } else {
              this.examinationGroup.number = test.number + 1
              await this.updateExaminationGroup({ id: test.id, close: true })
            }
          } else {
            this.examinationGroup.number = 1
          }
        } else {
          if (test != null) {
            await this.fetchCountGroup(test.id)
            await this.findExaminationGroup(test.id)
            if (this.countGroup < 30 && this.selectedGroup.close == false) {
              this.examinationGroup.number = test.number
            } else {
              this.examinationGroup.number = test.number + 1
              await this.updateExaminationGroup({ id: test.id, close: true })
            }
          } else {
            this.examinationGroup.number = 1
          }
        }
        this.saveExaminationGroup()
      }
    },
    nameSpecialty(item) {
      return `(${item.abbreviation}) ${item.name}`
    },
    async sendSpecialty(key, value) {
      if (this.data.admission_examination_group == null) {
        this.specialty.forEach((title, index) => {
          if (value == title.id) {
            this.examinationGroup.abbreviation = title.abbreviation
          }
        })
        let test = null
        this.examinationGroups.forEach((title, index) => {
          if (
            this.examinationGroup.abbreviation == title.abbreviation &&
            title.number < 30
          ) {
            test = title
          }
        })
        if (test != null) {
          await this.fetchCountGroup(test.id)
          await this.findExaminationGroup(test.id)
          if (this.countGroup < 30 && this.selectedGroup.close == false) {
            this.examinationGroup.number = test.number
          } else {
            this.examinationGroup.number = test.number + 1
            await this.updateExaminationGroup({ id: test.id, close: true })
          }
        } else {
          this.examinationGroup.number = 1
        }
        this.saveExaminationGroup()
      }
    },
    nameCommissions(item) {
      return `${item.region}-${item.name}`
    },
    async saveExaminationGroup() {
      this.examinationGroup.name = `${this.examinationGroup.abbreviation}-${this.examinationGroup.number}`
      this.examinationGroup.number = parseInt(this.examinationGroup.number)
      const newExaminationGroup = Object.assign({}, this.examinationGroup)
      const m = []
      this.examinationGroups.forEach((title, index) => {
        m.push(title.name)
      })
      if (!m.includes(this.examinationGroup.name)) {
        await this.addExaminationGroup(newExaminationGroup)
      }
      await this.fetchExaminationGroups()
      this.examinationGroups.forEach((title, index) => {
        if (this.examinationGroup.name == title.name) {
          this.data.admission_examination_group = title.id
        }
      })
      this.menuExaminationGroup = false
      this.examinationGroup = {}
    },
  },
}
</script>

<style scoped>
.selected {
  background-color: rgb(115, 220, 255);
}

.expulsed {
  background-color: red;
}

.v-data-table {
  table-layout: fixed;
}

.fixed-column {
  width: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
