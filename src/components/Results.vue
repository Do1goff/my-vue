<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-row
    no-gutters
    display:flex
  >
    <v-col cols="6">
      <v-card>
        <v-card-title> Результаты </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="qualificationExamJSON.mark"
                dense
                label="КЭ"
                @input="sendQualificationExam"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="qualificationExamJSON.date"
                dense
                label="Дата"
                @input="sendQualificationExam"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                :value="sumSportScores"
                dense
                readonly
                label="ФП"
                @input="send"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="result.sportDate"
                dense
                label="Дата"
                @input="send"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
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
                  <v-card-title> Добавить </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            :value="sportScore.score"
                            label="Баллы"
                            type="number"
                            max="100"
                            min="0"
                            @input="updateSport('score', parseInt($event, 10))"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            :value="sportScore.exercises"
                            :items="exercises"
                            item-text="name"
                            item-value="id"
                            label="Норматив"
                            @input="updateSportExercises('exercises', $event)"
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
              @click="editSport(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
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
                  <v-card-title> Добавить </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            :value="egeMark.mark"
                            label="Оценка"
                            max="100"
                            min="0"
                            type="number"
                            @input="updateEgeMark('mark', parseInt($event, 10))"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="egeMark.subject"
                            :items="subjects"
                            item-text="name"
                            item-value="id"
                            label="Предмет"
                            @input="updateEgeMarkSubject('subject', $event)"
                          />
                        </v-col>
                        <v-col>
                          <v-menu
                            v-model="menuEgeMark"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                dense
                                :value="formatDate(egeMark.date)"
                                label="Дата"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker @input="changeDateEgeMark" />
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      text
                      @click="saveEgeMark"
                    >
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template #item.date="{ item }">
            {{ formatDate(item.date) }}
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
      <v-card>
        <v-data-table
          :headers="headers"
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
                  <v-card-title> Добавить </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            :value="entranceTestMark.mark"
                            label="Оценка"
                            max="100"
                            min="0"
                            type="number"
                            @input="
                              updateEntranceTestMark(
                                'mark',
                                parseInt($event, 10)
                              )
                            "
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            :value="entranceTestMark.subject"
                            :items="subjects"
                            item-text="name"
                            item-value="id"
                            label="Предмет"
                            @input="
                              updateEntranceTestMarkSubject('subject', $event)
                            "
                          />
                        </v-col>
                        <v-col>
                          <v-menu
                            v-model="menuEntranceTestMark"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                dense
                                :value="formatDate(entranceTestMark.date)"
                                label="Дата"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              @input="changeDateEntranceTestMark"
                            />
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      text
                      @click="saveEntranceTestMark"
                    >
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
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
      result: {},
      egeMark: {},
      entranceTestMark: {},
      menuEgeMark: false,
      menuEntranceTestMark: false,
      sportScore: {},
      dialog: false,
      dialogEntranceTest: false,
      dialogSport: false,
      headers: [
        { value: 'subject.name', text: 'Предмет' },
        { value: 'mark', text: 'Оценка' },
        { value: 'date', text: 'Дата' },
        { value: 'actions', text: 'Действие' },
      ],
      headersSport: [
        { value: 'exercises.name', text: 'Норматив' },
        { value: 'score', text: 'Баллы' },
        { value: 'actions', text: 'Действие' },
      ],
      SUM: 0,
    }
  },
  computed: {
    ...mapGetters([
      'subjects',
      'exercises',
      'egeMarks',
      'entranceTestMarks',
      'sportScores',
    ]),
    qualificationExamJSON() {
      return this.abit.qualificationExam
        ? JSON.parse(this.abit.qualificationExam)
        : {}
    },
    sumSportScores() {
      var xew = 0
      for (var i = 0; i < this.sportScores.length; i++) {
        xew += this.sportScores[i].score
      }
      return xew
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
      }
    },
  },
  mounted() {
    this.data = { ...this.abit }
  },
  created() {
    this.fetchSubjects()
    this.fetchExercises()
  },
  methods: {
    ...mapActions([
      'addEgeMark',
      'putEgeMark',
      'addEntranceTestMark',
      'putEntranceTestMark',
      'addSportScore',
      'putSportScore',
      'fetchSubjects',
      'fetchExercises',
      'fetchEgeMark',
      'fetchEntranceTestMark',
      'fetchSportScore',
    ]),

    updateEgeMark(fieldName, event) {
      this.egeMark[fieldName] = event
    },
    updateEgeMarkSubject(fieldName, event) {
      this.egeMark[fieldName] = this.subjects[event - 1]
    },
    editEgeMark(item) {
      this.egeMark = item
      this.dialog = true
    },
    updateEntranceTestMark(fieldName, event) {
      this.entranceTestMark[fieldName] = event
    },
    updateEntranceTestMarkSubject(fieldName, event) {
      this.entranceTestMark[fieldName] = this.subjects[event - 1]
    },
    editEntranceTest(item) {
      this.entranceTestMark = item
      this.dialogEntranceTest = true
    },
    updateSport(fieldName, event) {
      this.sportScore[fieldName] = event
    },
    updateSportExercises(fieldName, event) {
      this.sportScore[fieldName] = this.exercises[event - 1]
    },
    editSport(item) {
      this.dialogSport = true
      this.sportScore = item
    },
    saveEgeMark() {
      if (!this.egeMark.abitSubjectId) {
        this.egeMark.abitId = this.abit.id
        this.addEgeMark(this.egeMark)
        this.egeMark.mark = ''
        this.egeMark.subject = ''
      } else {
        this.putEgeMark(this.egeMark)
        this.dialog = false
      }
    },
    saveEntranceTestMark() {
      if (!this.entranceTestMark.abitSubjectId) {
        this.entranceTestMark.abitId = this.abit.id
        this.addEntranceTestMark(this.entranceTestMark)
        this.entranceTestMark.mark = ''
        this.entranceTestMark.subject = ''
      } else {
        this.putEntranceTestMark(this.entranceTestMark)
        this.dialogEntranceTest = false
      }
    },
    saveSportScore() {
      if (!this.sportScore.id) {
        this.sportScore.abitId = this.abit.id
        this.addSportScore(this.sportScore)
        this.sportScore.score = ''
        this.sportScore.exercise = ''
      } else {
        this.putSportScore(this.sportScore)
        this.dialogSport = false
      }
    },
    send(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    sendQualificationExam() {
      this.data.qualificationExam = JSON.stringify(this.qualificationExamJSON)
      this.differences.qualificationExam = this.data.qualificationExam
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD-MM-YYYY')
    },
    changeDateEgeMark(event) {
      this.egeMark.date = new Date(event).toISOString()
      this.menuEgeMark = false
    },
    changeDateEntranceTestMark(event) {
      this.entranceTestMark.date = new Date(event).toISOString()
      this.menuEntranceTestMark = false
    },
  },
}
</script>
