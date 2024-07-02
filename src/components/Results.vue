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
              <v-badge
                color="green"
                :value="
                  (abit.qualificationExam &&
                    JSON.parse(abit.qualificationExam).mark !==
                      qualificationExamJSON.mark) ||
                  (!abit.qualificationExam && qualificationExamJSON.mark !== ``)
                "
                dot
              >
                <v-autocomplete
                  v-model="qualificationExamJSON.mark"
                  :items="[5, 4, 3, 2]"
                  dense
                  label="КЭ"
                  @input="sendQualificationExam"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="
                  (abit.qualificationExam &&
                    JSON.parse(abit.qualificationExam).date !==
                      qualificationExamJSON.date) ||
                  (!abit.qualificationExam && qualificationExamJSON.date !== ``)
                "
                dot
              >
                <v-menu
                  v-model="menuQualificationExam"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      dense
                      :value="formatDate(qualificationExamJSON.date)"
                      label="Дата"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker @input="changeDateQualificationExam" />
                </v-menu>
              </v-badge>
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
                            :rules="[rules.score]"
                            label="Баллы"
                            type="number"
                            max="100"
                            min="0"
                            @input="updateSport(parseInt($event, 10))"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            :value="sportScore.exercises"
                            :items="exercises"
                            item-text="name"
                            item-value="id"
                            label="Норматив"
                            @input="updateSportExercises"
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
                      :disabled="!sportScore.score || !sportScore.exercises"
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
                            :rules="[rules.score]"
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
                            item-text="name"
                            item-value="id"
                            label="Предмет"
                            @input="updateEgeMarkSubject"
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
                      :disabled="
                        !egeMark.mark || !egeMark.subject || !egeMark.date
                      "
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
                            :rules="[rules.score]"
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
                            item-text="name"
                            item-value="id"
                            label="Предмет"
                            @input="updateEntranceTestMarkSubject"
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
                      :disabled="
                        !entranceTestMark.mark ||
                        !entranceTestMark.subject ||
                        !entranceTestMark.date
                      "
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
      differences: {},
      result: {},
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
      headersSport: [
        { value: 'exercises.name', text: 'Норматив' },
        { value: 'score', text: 'Баллы' },
        { value: 'actions', text: 'Действие' },
      ],
      rules: {
        score: (value) => value <= 100 || '100-бальная шкала',
      },
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
      return this.data.qualificationExam
        ? JSON.parse(this.data.qualificationExam)
        : {
            mark: '',
            date: '',
          }
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
    ]),
    updateEgeMark(event) {
      this.egeMark.mark = event
    },
    updateEgeMarkSubject(event) {
      this.egeMark.subject = this.subjects[event - 1]
    },
    editEgeMark(item) {
      this.egeMark = item
      this.dialog = true
    },
    updateEntranceTestMark(event) {
      this.entranceTestMark.mark = event
    },
    updateEntranceTestMarkSubject(event) {
      this.entranceTestMark.subject = this.subjects[event - 1]
    },
    editEntranceTest(item) {
      this.entranceTestMark = item
      this.dialogEntranceTest = true
    },
    updateSport(event) {
      this.sportScore.score = event
    },
    updateSportExercises(event) {
      this.sportScore.exercises = this.exercises[event - 1]
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
        this.egeMark.date = ''
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
        this.entranceTestMark.date = ''
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
        this.sportScore.exercises = ''
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
      this.send('qualificationExam', this.data.qualificationExam)
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
    changeDateQualificationExam(event) {
      this.qualificationExamJSON.date = new Date(event).toISOString()
      this.menuQualificationExam = false
      this.sendQualificationExam()
    },
  },
}
</script>

<style>
.v-badge {
  display: block;
}
</style>
