<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card
        tile
        height="284px"
      >
        <v-card-title> Результаты </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-badge
                color="success"
                :value="
                  abit.qualificationExam_mark !== data.qualificationExam_mark
                "
                dot
              >
                <v-autocomplete
                  v-model="data.qualificationExam_mark"
                  :items="[5, 4, 3, 2]"
                  dense
                  label="КЭ"
                  @input="send('qualificationExam_mark', $event)"
                />{{ this.data.qualificationExam_results }}
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-badge
                color="success"
                :value="
                  formatDate(abit.qualificationExam_date) !==
                  formatDate(data.qualificationExam_date)
                "
                dot
              >
                <v-text-field
                  :value="formatDate(data.qualificationExam_date)"
                  dense
                  type="date"
                  label="Дата"
                  @input="sendDate('qualificationExam_date', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="data.qualificationExam_group"
                dense
                label="Экзаменационная группа"
                @input="send('qualificationExam_group', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="ФП"
                readonly
                type="number"
                :value="this.fullAbit?.sport_score"
              />
            </v-col>
            <v-col cols="6">
              <v-badge
                color="success"
                :value="
                  formatDate(abit.sport_date) !== formatDate(data.sport_date)
                "
                dot
              >
                <v-text-field
                  :value="formatDate(data.sport_date)"
                  dense
                  type="date"
                  label="Дата"
                  @input="sendDate('sport_date', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Достижения"
                readonly
                type="number"
                :value="this.fullAbit?.personal_achievements_score"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Рейтинг"
                readonly
                type="number"
                :value="this.fullAbit?.rating"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card tile>
        <v-data-table
          :headers="headersSport"
          :items="sportScores"
          height="220px"
          dense
          disable-pagination
          hide-default-footer
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title> Физическая подготовка </v-toolbar-title>
              <v-spacer />
              <v-dialog
                v-model="dialogSport"
                max-width="500px"
                @click:outside="clickOutsideSport"
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
                <v-form
                  ref="formSport"
                  v-model="formSportValid"
                >
                  <v-card>
                    <v-card-title> Добавить </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-select
                              :value="sportScore.exercises"
                              :items="exercises"
                              item-text="name"
                              item-value="id"
                              :rules="[rules.required]"
                              label="Норматив"
                              @input="updateSportExercises"
                            />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              :value="sportScore.score"
                              :rules="[rules.score, rules.required]"
                              label="Баллы"
                              type="number"
                              max="100"
                              min="0"
                              @input="updateSport(parseInt($event, 10))"
                            />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              :value="sportScore.result"
                              label="Результат"
                              :rules="[rules.required]"
                              @input="updateSportRes($event)"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        text
                        @click="saveSportScore"
                        :disabled="!formSportValid"
                      >
                        Сохранить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
            </v-toolbar>
          </template>
          <template #item.actions="{ item }">
            <v-icon
              small
              @click="editSport(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card tile>
        <v-data-table
          :headers="headers"
          :items="egeMarks"
          height="220px"
          dense
          disable-pagination
          hide-default-footer
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title> ЕГЭ </v-toolbar-title>
              <v-spacer />
              <v-dialog
                v-model="dialog"
                max-width="500px"
                @click:outside="clickOutsideEGE"
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
                <v-form
                  ref="formEGE"
                  v-model="formEGEValid"
                >
                  <v-card>
                    <v-card-title> Добавить </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="6">
                            <v-text-field
                              :value="egeMark.mark"
                              :rules="[rules.score, rules.required]"
                              label="Оценка"
                              max="100"
                              min="0"
                              type="number"
                              @input="updateEgeMark(parseInt($event, 10))"
                            />
                          </v-col>
                          <v-col cols="6">
                            <v-select
                              v-model="egeMark.subject"
                              :items="subjects"
                              :rules="[rules.required]"
                              item-text="name"
                              item-value="id"
                              label="Предмет"
                              @input="updateEgeMarkSubject"
                            />
                          </v-col>
                          <v-col>
                            <v-autocomplete
                              v-model="egeMark.date"
                              :items="years"
                              :rules="[rules.required]"
                              label="год"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        text
                        @click="saveEgeMark"
                        :disabled="!formEGEValid"
                      >
                        Сохранить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
            </v-toolbar>
          </template>
          <template #item.date="{ item }">
            {{ formatDateEGE(item.date) }}
          </template>
          <template #item.actions="{ item }">
            <v-icon
              small
              @click="editEgeMark(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card tile>
        <v-data-table
          :headers="headersEntranceTest"
          :items="entranceTestMarks"
          height="220px"
          dense
          disable-pagination
          hide-default-footer
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title> Вступительные испытания </v-toolbar-title>
              <v-spacer />
              <v-dialog
                v-model="dialogEntranceTest"
                max-width="500px"
                @click:outside="clickOutsideEntranceTest"
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
                <v-form
                  ref="formEntrance"
                  v-model="formEntranceValid"
                >
                  <v-card>
                    <v-card-title> Добавить </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="6">
                            <v-text-field
                              :value="entranceTestMark.mark"
                              :rules="[rules.score, rules.required]"
                              label="Оценка"
                              max="100"
                              min="0"
                              type="number"
                              @input="
                                updateEntranceTestMark(parseInt($event, 10))
                              "
                            />
                          </v-col>
                          <v-col cols="6">
                            <v-select
                              :value="entranceTestMark.subject"
                              :items="subjects"
                              :rules="[rules.required]"
                              item-text="name"
                              item-value="id"
                              label="Предмет"
                              @input="updateEntranceTestMarkSubject"
                            />
                          </v-col>
                          <v-col cols="6">
                            <v-select
                              :value="entranceTestMark.form"
                              :items="formsEntranceTest"
                              :rules="[rules.required]"
                              item-text="name"
                              item-value="id"
                              label="Форма"
                              @input="updateEntranceTestForm"
                            />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              :value="formatDate(entranceTestMark.date)"
                              label="Дата"
                              :rules="[rules.required]"
                              type="date"
                              @input="changeDateEntranceTestMark"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        text
                        @click="saveEntranceTestMark"
                        :disabled="!formEntranceValid"
                      >
                        Сохранить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
            </v-toolbar>
          </template>
          <template #item.date="{ item }">
            {{ formatDate(item.date) }}
          </template>
          <template #item.actions="{ item }">
            <v-icon
              small
              @click="editEntranceTest(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ResultsComponent',
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
      egeMark: {},
      entranceTestMark: {},
      menuEgeMark: false,
      menuEntranceTestMark: false,
      menuQualificationExam: false,
      sportScore: { score: '', exercises: '' },
      dialog: false,
      dialogEntranceTest: false,
      dialogSport: false,
      headers: [
        { value: 'subject.name', text: 'Предмет' },
        { value: 'mark', text: 'Оценка' },
        { value: 'date', text: 'Дата' },
        { value: 'actions', text: 'Действие' },
      ],
      headersEntranceTest: [
        { value: 'subject.name', text: 'Предмет' },
        { value: 'mark', text: 'Оценка' },
        { value: 'date', text: 'Дата' },
        { value: 'form.name', text: 'Форма' },
        { value: 'actions', text: 'Действие' },
      ],
      headersSport: [
        { value: 'exercises.name', text: 'Норматив' },
        { value: 'score', text: 'Баллы' },
        { value: 'actions', text: 'Действие' },
      ],
      rules: {
        score: (value) => value <= 100 || '100-бальная шкала',
        required: (value) => !!value || 'Обязательно.',
      },
      formSportValid: false,
      formEGEValid: false,
      formEntranceValid: false,
    }
  },
  computed: {
    ...mapGetters([
      'fullAbit',
      'subjects',
      'exercises',
      'egeMarks',
      'entranceTestMarks',
      'sportScores',
      'formsEntranceTest',
      'personalAchievements',
    ]),
    sumSportScores() {
      var xew = 0
      for (var i = 0; i < this.sportScores.length; i++) {
        xew += this.sportScores[i].score
      }
      return xew
    },
    years() {
      const array = []
      for (let i = moment().year() - 4; i <= moment().year(); i++) {
        array.push(i.toString())
      }
      return array
    },
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
    },
    data() {
      if (this.data.id) {
        this.fetchEgeMark(this.data.id)
        this.fetchEntranceTestMark(this.data.id)
        this.fetchSportScore(this.data.id)
        this.fetchPersonalAchievements(this.data.id)
        this.selectFullAbit(this.data.id)
      }
    },
  },
  mounted() {
    this.data = { ...this.abit }
  },
  created() {
    this.fetchSubjects()
    this.fetchExercises()
    this.fetchFormsEntranceTest()
  },
  methods: {
    ...mapActions([
      'selectFullAbit',
      'fetchSubjects',
      'fetchExercises',
      'fetchEgeMark',
      'addEgeMark',
      'putEgeMark',
      'fetchEntranceTestMark',
      'addEntranceTestMark',
      'putEntranceTestMark',
      'fetchSportScore',
      'addSportScore',
      'putSportScore',
      'fetchFormsEntranceTest',
      'fetchPersonalAchievements',
    ]),
    clickOutsideSport() {
      this.sportScore = { score: 0, exercises: '' }
    },
    clickOutsideEGE() {
      this.egeMark = { mark: 0, subject: '', date: '' }
    },
    clickOutsideEntranceTest() {
      this.entranceTestMark = { mark: 0, subject: '', date: '' }
    },
    updateEgeMark(event) {
      this.egeMark.mark = event
    },
    updateEgeMarkSubject(event) {
      this.egeMark.subject = this.subjects[event - 1]
    },
    editEgeMark(item) {
      this.egeMark = item
      this.egeMark.subject = this.subjects[item.subject.id - 1]
      this.egeMark.date = this.formatDateEGE(item.date)
      this.dialog = true
    },
    updateEntranceTestMark(event) {
      this.entranceTestMark.mark = event
    },
    updateEntranceTestForm(event) {
      this.entranceTestMark.form = this.formsEntranceTest[event - 1]
    },
    updateEntranceTestMarkSubject(event) {
      this.entranceTestMark.subject = this.subjects[event - 1]
    },
    editEntranceTest(item) {
      this.entranceTestMark = item
      this.entranceTestMark.subject.id = item.subject.id
      this.dialogEntranceTest = true
    },
    updateSport(event) {
      this.sportScore.score = event
    },
    updateSportRes(event) {
      this.sportScore.result = event
    },
    updateSportExercises(event) {
      this.sportScore.exercises = this.exercises[event - 1]
    },
    editSport(item) {
      this.dialogSport = true
      this.sportScore = item
    },
    async saveEgeMark() {
      if (!this.egeMark.abitSubjectId) {
        this.egeMark.abitId = this.abit.id
        this.egeMark.date = moment(this.egeMark.date, 'YYYY').format(
          'YYYY-MM-DD',
        )
        await this.addEgeMark(this.egeMark)
        this.egeMark.mark = ''
        this.egeMark.subject = ''
        this.egeMark.date = ''
      } else {
        await this.putEgeMark(this.egeMark)
        this.dialog = false
      }
    },
    async saveEntranceTestMark() {
      if (!this.entranceTestMark.abitSubjectId) {
        this.entranceTestMark.abitId = this.abit.id
        await this.addEntranceTestMark(this.entranceTestMark)
        this.entranceTestMark.mark = ''
        this.entranceTestMark.subject = ''
        this.entranceTestMark.date = ''
        this.entranceTestMark.form = ''
      } else {
        await this.putEntranceTestMark(this.entranceTestMark)
        this.dialogEntranceTest = false
      }
    },
    async saveSportScore() {
      if (!this.sportScore.id) {
        this.sportScore.abitId = this.abit.id
        await this.addSportScore(this.sportScore)
        this.sportScore.score = ''
        this.sportScore.exercises = ''
      } else {
        await this.putSportScore(this.sportScore)
        this.dialogSport = false
      }
    },

    sendDate(key, value) {
      if (value != '') {
        this.data[key] = value
        this.differences[key] = value
      } else {
        this.data[key] = null
        this.differences[key] = null
      }
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    send(key, value) {
      if (typeof value == 'number' && isNaN(value)) {
        this.differences[key] = null
        this.data[key] = null
      } else if (value != '') {
        this.differences[key] = value
      } else if (value === false) {
        this.differences[key] = false
      } else {
        this.differences[key] = null
        this.data[key] = null
      }
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    formatDateEGE(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('YYYY')
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('YYYY-MM-DD')
    },
    changeDateEgeMark(event) {
      this.egeMark.date = moment(event, 'YYYY').format('YYYY-MM-DD')
      this.menuEgeMark = false
    },
    changeDateEntranceTestMark(event) {
      this.entranceTestMark.date = event
    },
  },
}
</script>

<style>
.v-badge {
  display: block;
}
</style>
