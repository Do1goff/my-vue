<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card>
          <v-card-title> Комиссия </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :value="abit.admission_commission"
                  :items="commissions"
                  item-text="name"
                  label="Комиссия"
                  @input="updateData('admission_commission', $event)"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-dialog
              v-model="dialogCommission"
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
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            :value="commission.name"
                            label="Комиссия"
                            @input="updateCommission('name', $event)"
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
            </v-dialog>
          </v-card-actions>
        </v-card>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-autocomplete
                  dense
                  :value="abit.specialty_1"
                  :items="specialty"
                  item-text="name"
                  item-value="id"
                  label="1 Специальность"
                  @input="updateData('specialty_1', $event)"
                />
              </v-col>
              <v-col cols="4">
                <v-autocomplete
                  dense
                  :value="abit.specialty_2"
                  :items="specialty"
                  item-text="name"
                  item-value="id"
                  label="2 Специальность"
                  @input="updateData('specialty_2', $event)"
                />
              </v-col>
              <v-col cols="4">
                <v-autocomplete
                  dense
                  :value="abit.specialty_3"
                  :items="specialty"
                  item-text="name"
                  item-value="id"
                  label="3 Специальность"
                  @input="updateData('specialty_3', $event)"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            <v-text-field
              :value="abit.admission_note"
              label="Примечания"
              @input="updateData('admission_note', $event)"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title> Экзаменационная группа </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :value="abit.admission_examination_group"
                  :items="examinationGroups"
                  item-text="name"
                  label="Экзаменационная группа"
                  @input="updateData('admission_examination_group', $event)"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-dialog
              v-model="dialogExaminationGroup"
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
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            :value="examinationGroup.name"
                            label="Экзаменационная группа"
                            @input="updateExaminationGroup('name', $event)"
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
                    @click="saveExaminationGroup"
                  >
                    Сохранить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
        <v-card>
          <v-card-text>
            <v-autocomplete
              :value="abit.admission_source_information"
              :items="source_information"
              item-text="name"
              label="Источники информации"
              multiple
              @input="updateData('admission_source_information', $event)"
            />
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title> Отчисление </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  :value="expulsionJSON.reason"
                  label="Причина"
                  @input="updateExpulsion('reason', $event)"
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
                      dense
                      :value="formatDate(expulsionJSON.date)"
                      label="Дата"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker @input="changeDate('date', $event)" />
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      color="blue darken-1"
      text
      @click="save"
    >
      Сохранить
    </v-btn>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
  name: 'AdmissionComponent',
  props: ['abit'],
  data() {
    return {
      data: {},
      commission: {},
      dialogCommission: false,
      examinationGroup: {},
      dialogExaminationGroup: false,
      expulsion: {},
      menu: false,
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
    commissions() {
      return this.$store.getters.commissions
    },
    examinationGroups() {
      return this.$store.getters.examinationGroups
    },
    specialty() {
      return this.$store.getters.specialty
    },
    expulsionJSON() {
      return this.abit.expulsion
        ? JSON.parse(this.abit.expulsion)
        : this.expulsion
    },
  },
  created() {
    this.$store.dispatch('fetchAdmissionCommissions')
    this.$store.dispatch('fetchExaminationGroups')
    this.$store.dispatch('fetchSpecialty')
  },
  methods: {
    ...mapActions([
      'updateAbit',
      'addAdmissionCommission',
      'addExaminationGroup',
    ]),

    updateData(fieldName, event) {
      this.data[fieldName] = event
    },
    updateCommission(fieldName, event) {
      this.commission[fieldName] = event
    },
    updateExaminationGroup(fieldName, event) {
      this.examinationGroup[fieldName] = event
    },
    updateExpulsion(fieldName, event) {
      this.expulsionJSON[fieldName] = event
    },
    save() {
      this.data.id = this.abit.id
      this.data.expulsion = JSON.stringify(this.expulsionJSON)
      this.updateAbit(this.data)
    },
    saveCommission() {
      const newCommission = Object.assign({}, this.commission)
      this.addAdmissionCommission(newCommission)
      this.dialogCommission = false
    },
    saveExaminationGroup() {
      const newExaminationGroup = Object.assign({}, this.examinationGroup)
      this.addExaminationGroup(newExaminationGroup)
      this.dialogExaminationGroup = false
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD-MM-YYYY')
    },
    changeDate(fieldName, event) {
      this.expulsionJSON[fieldName] = new Date(event).toISOString()
      this.menu = false
    },
  },
}
</script>
