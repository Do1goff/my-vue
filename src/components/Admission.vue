<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card>
        <v-card-title>Дата регистрации заявления</v-card-title>
        <v-card-text>
          <v-menu
            v-model="menuAdmission"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-badge
                color="green"
                :value="data.admission_date !== abit.admission_date"
                dot
              >
                <v-text-field
                  dense
                  :value="formatDate(data.admission_date)"
                  label="Дата"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </v-badge>
            </template>
            <v-date-picker @input="changeDateAdmission" />
          </v-menu>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title> Комиссия </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-badge
                color="green"
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
                  v-model="data.admission_commission"
                  :items="commissions"
                  item-text="name"
                  item-value="id"
                  label="Комиссия"
                  @input="send('admission_commission', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-menu
                v-model="menuCommission"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
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
                              v-model="commission.name"
                              label="Комиссия"
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
                      @click="saveCommission"
                    >
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
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
                  item-text="name"
                  item-value="id"
                  label="1 Специальность"
                  @input="send('specialty_1', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="green"
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
                  item-text="name"
                  item-value="id"
                  label="2 Специальность"
                  @input="send('specialty_2', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="green"
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
                  item-text="name"
                  item-value="id"
                  label="3 Специальность"
                  @input="send('specialty_3', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title> Экзаменационная группа </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-badge
                color="green"
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
                <v-autocomplete
                  v-model="data.admission_examination_group"
                  :items="examinationGroups"
                  item-text="name"
                  item-value="id"
                  label="Экзаменационная группа"
                  @input="send('admission_examination_group', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-menu
                v-model="menuExaminationGroup"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
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
                              v-model="examinationGroup.name"
                              dense
                              label="Экзаменационная группа"
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
                      @click="saveExaminationGroup"
                    >
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-card-title> Наличие документов подлинников </v-card-title>
        <v-row>
          <v-col cols="4">
            <v-badge
              color="green"
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
              color="green"
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
              color="green"
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
      <v-card>
        <v-card-text>
          <v-badge
            color="green"
            :value="
              data.admission_source_information !==
              abit.admission_source_information
            "
            dot
          >
            <v-select
              v-model="data.admission_source_information"
              :items="source_information"
              item-text="name"
              label="Источники информации об академии"
              multiple
              dense
              chips
              @input="send('admission_source_information', $event)"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.name }}</span>
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
      <v-card height="168px">
        <v-card-text>
          <v-badge
            color="green"
            :value="data.admission_note !== abit.admission_note"
            dot
          >
            <v-textarea
              v-model="data.admission_note"
              label="Примечания"
              rows="3"
              @input="send('admission_note', $event)"
            />
          </v-badge>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          <v-badge
            color="green"
            :value="badgeColorExpulsion()"
            dot
          >
            Отчисление
          </v-badge>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="expulsionJSON.reason"
                label="Причина"
                dense
                @input="sendExpulsion"
              />
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="menuExpulsion"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    dense
                    :value="formatDate(expulsionJSON.date)"
                    label="Дата"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker @input="changeDateExpulsion" />
              </v-menu>
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
      menuCommission: false,
      menuExaminationGroup: false,
      menuExpulsion: false,
      menuAdmission: false,
      source_information: [
        { value: 'family', name: 'Родственники' },
        { value: 'friends', name: 'Друзья/знакомые' },
        { value: 'education', name: 'Место учёбы' },
        { value: 'military_commissariat', name: 'Военкомат' },
        { value: 'website', name: 'Сайт МО' },
        { value: 'vk_group', name: 'Группа ВК' },
        { value: 'telegram', name: 'Телеграм-канал' },
        { value: 'academy', name: 'Обращение в академию' },
      ],
    }
  },
  computed: {
    ...mapGetters(['commissions', 'examinationGroups', 'specialty']),
    expulsionJSON() {
      return this.data.expulsion ? JSON.parse(this.data.expulsion) : {}
    },
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
    },
  },
  mounted() {
    this.data = { ...this.abit }
  },
  created() {
    this.fetchAdmissionCommissions()
    this.fetchExaminationGroups()
    this.fetchSpecialty()
  },
  methods: {
    ...mapActions([
      'addAdmissionCommission',
      'addExaminationGroup',
      'fetchSpecialty',
      'fetchExaminationGroups',
      'fetchAdmissionCommissions',
    ]),
    badgeColorExpulsion() {
      if (
        (this.abit.expulsion &&
          this.abit.expulsion !== JSON.stringify(this.expulsionJSON)) ||
        (!this.abit.expulsion && JSON.stringify(this.expulsionJSON) !== '{}')
      ) {
        return true
      } else return false
    },
    send(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    sendExpulsion() {
      this.data.expulsion = JSON.stringify(this.expulsionJSON)
      this.differences.expulsion = this.data.expulsion
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
    saveExaminationGroup() {
      const newExaminationGroup = Object.assign({}, this.examinationGroup)
      this.addExaminationGroup(newExaminationGroup)
      this.menuExaminationGroup = false
      this.fetchExaminationGroups()
      this.examinationGroup = {}
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD-MM-YYYY')
    },
    changeDateExpulsion(event) {
      this.expulsionJSON.date = new Date(event).toISOString()
      this.menuExpulsion = false
      this.sendExpulsion()
    },
    changeDateAdmission(event) {
      this.data.admission_date = new Date(event).toISOString()
      this.menuAdmission = false
      this.send('admission_date', this.data.admission_date)
    },
  },
}
</script>
