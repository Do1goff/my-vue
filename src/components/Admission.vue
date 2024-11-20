<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card tile>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-badge
                color="success"
                :value="
                  formatDate(data.admission_date_reg) !==
                  formatDate(abit.admission_date_reg)
                "
                dot
              >
                <v-text-field
                  :value="formatDate(data.admission_date_reg)"
                  label="Дата регистрации заявления"
                  dense
                  type="date"
                  @input="sendDate('admission_date_reg', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="success"
                :value="
                  formatDate(data.admission_date) !==
                  formatDate(abit.admission_date)
                "
                dot
              >
                <v-text-field
                  :value="formatDate(data.admission_date)"
                  label="Дата прибытия"
                  dense
                  type="date"
                  @input="sendDate('admission_date', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card tile>
        <v-card-title>
          <v-badge
            color="success"
            :value="data.sign !== abit.sign"
            dot
            >Признак</v-badge
          ></v-card-title
        >
        <v-card-text>
          <v-radio-group
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
              label="Хабаровск"
              value="Хабаровск"
            ></v-radio>
            <v-radio
              label="Другой"
              value="Другой"
            ></v-radio>
            <v-radio
              label="Выездная группа"
              value="Выездная группа"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>

      <v-card tile>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-badge
                color="success"
                :value="
                  (Object.assign({}, abit.specialty_1).id !==
                    data.specialty_1 &&
                    Object.assign({}, abit.specialty_1).id !==
                      Object.assign({}, data.specialty_1).id) ||
                  (abit.specialty_1 === null && data.specialty_1)
                "
                dot
              >
                <v-autocomplete
                  v-model="data.specialty_1"
                  dense
                  :items="specialty"
                  :item-text="nameSpecialty"
                  item-value="id"
                  label="1 Специальность"
                  @input="sendSpecialty('specialty_1', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="success"
                :value="
                  (Object.assign({}, abit.specialty_2).id !==
                    data.specialty_2 &&
                    Object.assign({}, abit.specialty_2).id !==
                      Object.assign({}, data.specialty_2).id) ||
                  (abit.specialty_2 === null && data.specialty_2)
                "
                dot
              >
                <v-autocomplete
                  v-model="data.specialty_2"
                  dense
                  :items="specialty"
                  :item-text="nameSpecialty"
                  item-value="id"
                  label="2 Специальность"
                  @input="send('specialty_2', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="success"
                :value="
                  (Object.assign({}, abit.specialty_3).id !==
                    data.specialty_3 &&
                    Object.assign({}, abit.specialty_3).id !==
                      Object.assign({}, data.specialty_3).id) ||
                  (abit.specialty_3 === null && data.specialty_3)
                "
                dot
              >
                <v-autocomplete
                  v-model="data.specialty_3"
                  dense
                  :items="specialty"
                  :item-text="nameSpecialty"
                  item-value="id"
                  label="3 Специальность"
                  @input="send('specialty_3', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card tile>
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-badge
                color="success"
                :value="
                  (Object.assign({}, abit.admission_commission).id !==
                    data.admission_commission &&
                    Object.assign({}, abit.admission_commission).id !==
                      Object.assign({}, data.admission_commission).id) ||
                  (abit.admission_commission === null &&
                    data.admission_commission)
                "
                dot
              >
                <v-autocomplete
                  class="small-text"
                  v-model="data.admission_commission"
                  :items="commissions"
                  :item-text="nameCommissions"
                  item-value="id"
                  dense
                  label="Приёмная комиссия"
                  @input="send('admission_commission', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="success"
                :value="
                  (Object.assign({}, abit.admission_examination_group).id !==
                    data.admission_examination_group &&
                    Object.assign({}, abit.admission_examination_group).id !==
                      Object.assign({}, data.admission_examination_group).id) ||
                  (abit.admission_examination_group === null &&
                    data.admission_examination_group)
                "
                dot
              >
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
                      @input="send('admission_examination_group', $event)"
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
                                v-model="examinationGroup.abbreviation"
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
                                v-model="examinationGroup.number"
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
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card
        height="180px"
        tile
      >
        <v-card-text>
          <v-badge
            color="success"
            :value="data.admission_note !== abit.admission_note"
            dot
          >
            <v-textarea
              v-model="data.admission_note"
              hide-details
              label="Примечания"
              rows="5"
              @input="send('admission_note', $event)"
            />
          </v-badge>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card tile>
        <v-card-title> Наличие документов подлинников </v-card-title>
        <v-row>
          <v-col cols="4">
            <v-badge
              color="success"
              :value="
                data.document_passport_presence !==
                abit.document_passport_presence
              "
              dot
            >
              <v-checkbox
                v-model="data.document_passport_presence"
                dense
                label="Паспорт РФ"
                @change="send('document_passport_presence', $event)"
              />
            </v-badge>
          </v-col>
          <v-col cols="4">
            <v-badge
              color="success"
              :value="
                data.document_birthday_presence !==
                abit.document_birthday_presence
              "
              dot
            >
              <v-checkbox
                v-model="data.document_birthday_presence"
                dense
                label="Свидетельство о рождении"
                @change="send('document_birthday_presence', $event)"
              />
            </v-badge>
          </v-col>
          <v-col cols="4">
            <v-badge
              color="success"
              :value="
                data.document_education_presence !==
                abit.document_education_presence
              "
              dot
            >
              <v-checkbox
                v-model="data.document_education_presence"
                dense
                label="Документ об образовании"
                @change="send('document_education_presence', $event)"
              />
            </v-badge>
          </v-col>
        </v-row>
      </v-card>
      <v-card tile>
        <v-card-text>
          <v-badge
            color="success"
            :value="
              data.admission_source_information !==
              abit.admission_source_information
            "
            dot
          >
            <v-select
              v-model="data.admission_source_information"
              :items="source_information"
              label="Источники информации об академии"
              multiple
              dense
              chips
              @input="send('admission_source_information', $event)"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="black--text text-caption"
                >
                  (+{{ data.admission_source_information.length - 2 }})
                </span>
              </template>
            </v-select>
          </v-badge>
        </v-card-text>
      </v-card>
      <v-card
        height="220px"
        tile
      >
        <v-card-title> Отчисление </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-badge
                color="success"
                :value="data.expulsion_reason !== abit.expulsion_reason"
                dot
              >
                <v-autocomplete
                  class="small-text"
                  v-model="data.expulsion_reason"
                  :items="reasonExpulsion"
                  item-text="name"
                  item-value="id"
                  clearable
                  dense
                  label="Причина"
                  @input="send('expulsion_reason', $event)"
                >
                  <template #no-data>
                    <v-menu
                      v-model="menuReasonExpulsion"
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
                                    v-model="reason.name"
                                    dense
                                    label="Причина"
                                  />
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                        </v-card>

                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            color="primary"
                            text
                            dense
                            @click="saveReasonExpulsion"
                          >
                            Сохранить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </template>
                </v-autocomplete>
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="success"
                :value="
                  formatDate(data.expulsion_date) !==
                  formatDate(abit.expulsion_date)
                "
                dot
              >
                <v-text-field
                  :value="formatDate(data.expulsion_date)"
                  label="Дата"
                  dense
                  type="date"
                  @input="send('expulsion_date', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="12">
              <v-badge
                color="success"
                :value="data.expulsion_note !== abit.expulsion_note"
                dot
              >
                <v-textarea
                  class="small-text"
                  rows="2"
                  dense
                  v-model="data.expulsion_note"
                  label="Комментарий"
                  @input="send('expulsion_note', $event)"
                ></v-textarea>
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card tile>
        <v-card-title>
          <v-badge
            color="success"
            :value="data.recruitment !== abit.recruitment"
            dot
            >Волна</v-badge
          ></v-card-title
        >
        <v-card-text>
          <v-radio-group
            v-model="data.recruitment"
            row
            @change="send('recruitment', $event)"
            dense
          >
            <v-radio
              label="Основная"
              value="Основная"
            ></v-radio>
            <v-radio
              label="Кадет"
              value="Кадет"
            ></v-radio>
            <v-radio
              label="Донабор"
              value="Донабор"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card tile>
        <v-card-text>
          <v-badge
            color="success"
            :value="
              (Object.assign({}, abit.arrivedFrom).id !== data.arrivedFrom &&
                Object.assign({}, abit.arrivedFrom).id !==
                  Object.assign({}, data.arrivedFrom).id) ||
              (abit.arrivedFrom === null && data.arrivedFrom)
            "
            dot
          >
            <v-autocomplete
              v-model="data.arrivedFrom"
              :items="militaryInstitute"
              item-value="id"
              item-text="name"
              label="Прибыл из"
              @input="send('arrivedFrom', $event)"
            />
          </v-badge>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card tile>
        <v-card-text>
          <v-badge
            color="success"
            :value="
              (Object.assign({}, abit.goneIn).id !== data.goneIn &&
                Object.assign({}, abit.goneIn).id !==
                  Object.assign({}, data.goneIn).id) ||
              (abit.goneIn === null && data.goneIn)
            "
            dot
          >
            <v-autocomplete
              v-model="data.goneIn"
              label="Убыл в"
              :items="militaryInstitute"
              item-value="id"
              item-text="name"
              @input="send('goneIn', $event)"
            />
          </v-badge>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AdmissionComponent',
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
      commission: {},
      examinationGroup: {},
      reason: {},
      menuAdmission: false,
      menuCommission: false,
      menuExaminationGroup: false,
      menuExpulsion: false,
      menuReasonExpulsion: false,
      source_information: [
        'Родственники',
        'Друзья/знакомые',
        'Место учёбы',
        'Военкомат',
        'Сайт МО',
        'Группа ВК',
        'Телеграм-канал',
        'Обращение в академию',
      ],
      abbreviations: ['ХАБ', 'КАД', 'ВГ'],
      formGroupValid: false,
      rules: {
        required: (value) => !!value || 'Обязательно.',
      },
    }
  },
  computed: {
    ...mapGetters([
      'commissions',
      'examinationGroups',
      'specialty',
      'reasonExpulsion',
      'militaryInstitute',
      'countGroup',
    ]),
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
    },
  },
  mounted() {
    this.data = { ...this.abit }
  },
  async created() {
    this.fetchAdmissionCommissions()
    this.fetchExaminationGroups()
    await this.fetchSpecialty()
    this.specialty.forEach((title, index) => {
      this.abbreviations.push(title.abbreviation)
    })
    this.fetchReasonExpulsion()
    this.fetchMilitaryInstitute()
  },
  methods: {
    ...mapActions([
      'fetchSpecialty',
      'fetchAdmissionCommissions',
      'addAdmissionCommission',
      'fetchExaminationGroups',
      'addExaminationGroup',
      'fetchReasonExpulsion',
      'addReasonExpulsion',
      'fetchMilitaryInstitute',
      'fetchCountGroup',
    ]),
    nameCommissions(item) {
      return `${item.region}-${item.name}`
    },
    nameSpecialty(item) {
      return `(${item.abbreviation}) ${item.name}`
    },
    async sendSpecialty(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
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
          if (this.countGroup < 30) {
            this.examinationGroup.number = test.number
          } else {
            this.examinationGroup.number = test.number + 1
          }
        } else {
          this.examinationGroup.number = 1
        }
        this.saveExaminationGroup()
      }
    },
    async sendSign(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}

      if (
        this.data.admission_examination_group == null &&
        (value == 'Хабаровск' || value == 'Кадет' || value == 'Выездная группа')
      ) {
        if (value == 'Хабаровск') {
          this.examinationGroup.abbreviation = 'ХАБ'
        } else if (value == 'Кадет') {
          this.examinationGroup.abbreviation = 'КАД'
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
        if (test != null) {
          await this.fetchCountGroup(test.id)
          if (this.countGroup < 30) {
            this.examinationGroup.number = test.number
          } else {
            this.examinationGroup.number = test.number + 1
          }
        } else {
          this.examinationGroup.number = 1
        }
        this.saveExaminationGroup()
      }
    },
    send(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    saveCommission() {
      const newCommission = Object.assign({}, this.commission)
      this.addAdmissionCommission(newCommission)
      this.menuCommission = false
      this.fetchAdmissionCommissions()
      this.commission = {}
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
      this.send(
        'admission_examination_group',
        this.data.admission_examination_group
      )
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('YYYY-MM-DD')
    },
    sendDate(key, value) {
      this.data[key] = value
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    saveReasonExpulsion() {
      const newReason = Object.assign({}, this.reason)
      this.addReasonExpulsion(newReason)
      this.menuReasonExpulsion = false
      this.fetchReasonExpulsion()
      this.reason = {}
    },
  },
}
</script>

<style>
.small-text {
  font-size: 0.9em;
}
</style>
