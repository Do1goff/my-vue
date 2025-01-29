<template>
  <v-container
    class="BGclr"
    style="height: 100vh"
    align="center"
    justify="center"
    fluid
  >
    <v-card
      align="center"
      justify="center"
    >
      <v-card-title class="ma-5">
        <h2>Занесение данных</h2>
      </v-card-title>
      <v-card-text>
        <v-row
          align="center"
          justify="space-between"
        >
          <v-col cols="2">
            <v-dialog v-model="dialogFilePPO">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  width="225px"
                >
                  <v-icon>mdi-download-circle-outline</v-icon>
                  Профотбор
                </v-btn>
              </template>
              <v-card>
                <v-card-title
                  ><span>Занесение результатов Профотбора</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="8">
                      <v-file-input
                        v-model="filePPO"
                        label="Выберите файл"
                        accept=".xls, .xlsx"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        :value="formatDate(QE_date)"
                        type="date"
                        label="Дата"
                        @input="sendDateQE"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="PpoSave"
                    text
                    color="primary"
                    :disabled="exportDataPPO.length == 0 || QE_date == null"
                    >Внести</v-btn
                  >
                  <v-btn
                    @click="PpoCheck"
                    text
                    color="primary"
                    :disabled="exportDataPPO.length == 0"
                    >Проверка</v-btn
                  >
                  <v-btn
                    @click="handleFilePPO"
                    text
                    color="primary"
                    >Просмотр</v-btn
                  >
                </v-card-actions>
                <v-card-text>
                  <v-data-table
                    :headers="exportHeadersPPO"
                    :items="exportDataPPO"
                    item-key="id"
                    height="600px"
                    dense
                    fixed-header
                    disable-pagination
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="2">
            <v-dialog v-model="dialogFileEGE">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  width="225px"
                >
                  <v-icon>mdi-download-circle-outline</v-icon>
                  ЕГЭ
                </v-btn>
              </template>
              <v-card>
                <v-card-title
                  ><span>Занесение результатов ЕГЭ</span>
                </v-card-title>
                <v-card-text>
                  <v-file-input
                    v-model="fileEGE"
                    label="Выберите файл"
                    accept=".xls, .xlsx"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="EGESave"
                    text
                    color="primary"
                    :disabled="exportDataEGE.length == 0"
                    >Внести</v-btn
                  >
                  <v-btn
                    @click="EgeCheck"
                    text
                    color="primary"
                    :disabled="exportDataEGE.length == 0"
                    >Проверить</v-btn
                  >
                  <v-btn
                    @click="handleFileEGE"
                    text
                    color="primary"
                    >Просмотр</v-btn
                  >
                </v-card-actions>
                <v-card-text>
                  <v-data-table
                    :headers="exportHeadersEGE"
                    :items="exportDataEGE"
                    item-key="id"
                    height="600px"
                    dense
                    fixed-header
                    disable-pagination
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="2">
            <v-dialog v-model="dialogFileENTRANCE">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  width="225px"
                >
                  <v-icon>mdi-download-circle-outline</v-icon>
                  Традиция
                </v-btn>
              </template>
              <v-card>
                <v-card-title
                  ><span>Занесение результатов традиционной формы</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="8">
                      <v-file-input
                        v-model="fileENTRANCE"
                        label="Выберите файл"
                        accept=".xls, .xlsx"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        v-model="formEntranceTest"
                        :items="formsEntranceTest"
                        item-text="name"
                        item-value="id"
                        label="Форма"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="ENTRANCESave"
                    text
                    color="primary"
                    :disabled="
                      exportDataENTRANCE.length == 0 || formEntranceTest == null
                    "
                    >Внести</v-btn
                  >
                  <v-btn
                    @click="EntranceCheck"
                    text
                    color="primary"
                    :disabled="exportDataENTRANCE.length == 0"
                    >Проверить</v-btn
                  >
                  <v-btn
                    @click="handleFileENTRANCE"
                    text
                    color="primary"
                    >Просмотр</v-btn
                  >
                </v-card-actions>
                <v-card-text>
                  <v-data-table
                    :headers="exportHeadersENTRANCE"
                    :items="exportDataENTRANCE"
                    item-key="id"
                    height="600px"
                    dense
                    fixed-header
                    disable-pagination
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="2">
            <v-dialog v-model="dialogFileSPORT">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  width="225px"
                >
                  <v-icon>mdi-download-circle-outline</v-icon>
                  ФП
                </v-btn>
              </template>
              <v-card>
                <v-card-title
                  ><span>Занесение результатов ФП</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="8">
                      <v-file-input
                        v-model="fileSPORT"
                        label="Выберите файл"
                        accept=".xls, .xlsx"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        :value="formatDate(sport_date)"
                        type="date"
                        label="Дата"
                        @input="sendDateSport"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="SPORTSave"
                    text
                    color="primary"
                    :disabled="
                      exportDataSPORT.length == 0 || sport_date == null
                    "
                    >Внести</v-btn
                  >
                  <v-btn
                    @click="SportCheck"
                    text
                    color="primary"
                    :disabled="exportDataSPORT.length == 0"
                    >Проверить</v-btn
                  >
                  <v-btn
                    @click="handleFileSPORT"
                    text
                    color="primary"
                    >Просмотр</v-btn
                  >
                </v-card-actions>
                <v-card-text>
                  <v-data-table
                    :headers="exportHeadersSPORT"
                    :items="exportDataSPORT"
                    item-key="id"
                    height="600px"
                    dense
                    fixed-header
                    disable-pagination
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="2">
            <v-dialog v-model="dialogFileCALLS">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  width="225px"
                >
                  <v-icon>mdi-download-circle-outline</v-icon>
                  Вызовы
                </v-btn>
              </template>
              <v-card>
                <v-card-title><span>Занесение вызовов</span> </v-card-title>
                <v-card-text>
                  <v-file-input
                    v-model="fileCALLS"
                    label="Выберите файл"
                    accept=".xls, .xlsx"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="CALLSSave"
                    text
                    color="primary"
                    :disabled="exportDataCALLS.length == 0"
                    >Внести</v-btn
                  >
                  <v-btn
                    @click="CALLSCheck"
                    text
                    color="primary"
                    :disabled="exportDataCALLS.length == 0"
                    >Проверить</v-btn
                  >
                  <v-btn
                    @click="handleFileCALLS"
                    text
                    color="primary"
                    >Просмотр</v-btn
                  >
                </v-card-actions>
                <v-card-text>
                  <v-data-table
                    :headers="exportHeadersCALLS"
                    :items="exportDataCALLS"
                    item-key="id"
                    height="600px"
                    dense
                    fixed-header
                    disable-pagination
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
          v-if="this.fox"
        >
          <v-col cols="3">
            <v-dialog v-model="dialogFile">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="warning"
                  width="300px"
                >
                  <v-icon>mdi-download-circle-outline</v-icon>
                  Данные
                </v-btn>
              </template>
              <v-card>
                <v-card-title><span>Занесение данных</span> </v-card-title>
                <v-card-text>
                  <v-file-input
                    v-model="file"
                    label="Выберите файл"
                    accept=".xls, .xlsx"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="Save"
                    text
                    color="primary"
                    :disabled="exportData.length == 0"
                    >Внести</v-btn
                  >
                  <v-btn
                    @click="handleFile"
                    text
                    color="primary"
                    >Просмотр</v-btn
                  >
                </v-card-actions>
                <v-card-text>
                  <v-data-table
                    :headers="exportHeaders"
                    :items="exportData"
                    item-key="id"
                    height="600px"
                    dense
                    fixed-header
                    disable-pagination
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import moment from 'moment'
import 'moment/locale/ru'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UploadComponent',
  data() {
    return {
      dialogFile: false,
      dialogFilePPO: false,
      dialogFileEGE: false,
      dialogFileENTRANCE: false,
      dialogFileSPORT: false,
      dialogFileCALLS: false,
      file: null,
      filePPO: null,
      QE_date: null,
      fileEGE: null,
      fileENTRANCE: null,
      formEntranceTest: null,
      fileSPORT: null,
      sport_date: null,
      fileCALLS: null,
      exportData: [],
      exportDataPPO: [],
      exportDataEGE: [],
      exportDataENTRANCE: [],
      exportDataSPORT: [],
      exportDataCALLS: [],
      exportHeaders: [],
      exportHeadersPPO: [],
      exportHeadersEGE: [],
      exportHeadersENTRANCE: [],
      exportHeadersSPORT: [],
      exportHeadersCALLS: [],
      fox: null,
    }
  },
  computed: {
    ...mapGetters([
      'ppo_group',
      'ppo_results',
      'ege_results',
      'entrance_results',
      'sport_results',
      'calls_results',
      'subjects',
      'exercises',
      'importedData',
      'allAbits',
      'user',
      'formsEntranceTest',
    ]),
  },
  watch: {},
  mounted() {
    this.fox = JSON.parse(sessionStorage.getItem('user'))?.access == 'Админ'
  },
  created() {
    this.fetchSubjects()
    this.fetchExercises()
    this.fetchAbits()
    this.fetchFormsEntranceTest()
  },

  methods: {
    ...mapActions([
      'fetchSubjects',
      'fetchExercises',
      'fetchAbits',
      'egeFromExcel',
      'entranceFromExcel',
      'sportFromExcel',
      'ppoFromExcel',
      'callsFromExcel',
      'importFromExcel',
      'exportToWord',
      'updateAbit',
      'addEgeMark',
      'addEntranceTestMark',
      'addSportScore',
      'saveHistory',
      'fetchFormsEntranceTest',
    ]),
    async Save() {
      this.exportData = []
      for (let x in this.importedData) {
        var upAbit = {}
        for (let y in this.exportHeaders) {
          if (this.exportHeaders[y].value != 'abitId') {
            upAbit[this.exportHeaders[y].value] =
              this.importedData[x][this.exportHeaders[y].value]
          }
        }
        this.updateAbit({
          ...upAbit,
          id: this.importedData[x].abitId,
        })
      }
    },
    async handleFile() {
      const formData = new FormData()
      formData.append('file', this.file)
      await this.importFromExcel(formData)

      const keys = Object.keys(this.importedData[0])
      const headersKeys = []
      for (let x in keys) {
        headersKeys.push({ text: keys[x], value: keys[x] })
      }
      this.exportHeaders = headersKeys
      this.exportData = this.importedData
    },

    saveHistoryMessage(data) {
      const newValueKeys = Object.keys(data)
      let old = {}
      for (let key in newValueKeys) {
        old[newValueKeys[key]] = this.allAbits.find(
          (abit) => abit.id == data.id,
        )[newValueKeys[key]]
      }
      const history = {
        abitId: parseInt(data.id ? data.id : data.abitId),
        oldValue: JSON.stringify(old),
        newValue: JSON.stringify(data),
        changedBy: JSON.parse(sessionStorage.getItem('user'))?.username,
      }
      this.saveHistory(history)
    },

    async PpoSave() {
      moment.locale('ru')
      this.exportDataPPO = []
      let items = []
      for (let x in this.ppo_results) {
        if (this.ppo_results[x].test == true) {
          const updatedData = {
            id: this.ppo_results[x].abitId,
            qualificationExam_mark: this.ppo_results[x].mark,
            qualificationExam_date: moment(this.QE_date).format('YYYY-MM-DD'),
            qualificationExam_group: this.ppo_group,
            qualificationExam_results: this.ppo_results[x].results,
          }
          this.updateAbit(updatedData)
          this.saveHistoryMessage(updatedData)
          const item = this.allAbits.find(
            (abit) => abit.id == this.ppo_results[x].abitId,
          )
          items.push({
            num: `${items.length + 1}.`,
            fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName}`,
            personal_file_number: `${item.personal_file_number}`,
            mark: `${this.ppo_results[x].mark}`,
          })
        } else {
          this.exportDataPPO.push(this.ppo_results[x])
        }
      }
      const data = {
        date: `${moment(this.QE_date).format('DD MMMM YYYY')} г.`,
        group: `${this.ppo_group}`,
        items: items,
      }
      const fileName = 'Ведомость ППО.docx'
      await this.exportToWord({ data, fileName })
    },
    async PpoCheck() {
      this.exportDataPPO = []
      for (let x in this.ppo_results) {
        if (this.ppo_results[x].test == false) {
          this.exportDataPPO.push(this.ppo_results[x])
        }
      }
    },
    async handleFilePPO() {
      const formData = new FormData()
      formData.append('file', this.filePPO)
      await this.ppoFromExcel(formData)

      const keys = Object.keys(this.ppo_results[0])
      const headersKeys = []
      for (let x in keys) {
        headersKeys.push({ text: keys[x], value: keys[x] })
      }
      this.exportHeadersPPO = headersKeys
      this.exportDataPPO = this.ppo_results
    },
    async EGESave() {
      this.exportDataEGE = []
      for (let x in this.ege_results) {
        if (this.ege_results[x].test !== null) {
          this.ege_results[x].subject =
            this.ege_results[x].subject.toLowerCase() == 'математика профильная'
              ? 'математика'
              : this.ege_results[x].subject
          this.addEgeMark({
            abitId: this.ege_results[x].test,
            mark: this.ege_results[x].mark,
            date: moment(this.ege_results[x].date, 'M/DD/YYYY').format(
              'YYYY-MM-DD',
            ),
            subject: this.subjects.find(
              (sub) =>
                sub.name.toLowerCase() ===
                this.ege_results[x].subject.toLowerCase(),
            ),
          })
        } else {
          this.exportDataEGE.push(this.ege_results[x])
        }
      }
    },
    async EgeCheck() {
      this.exportDataEGE = []
      for (let x in this.ege_results) {
        if (this.ege_results[x].test == null) {
          this.exportDataEGE.push(this.ege_results[x])
        }
      }
    },
    async handleFileEGE() {
      const formData = new FormData()
      formData.append('file', this.fileEGE)
      await this.egeFromExcel(formData)

      const keys = Object.keys(this.ege_results[0])
      const headersKeys = []
      for (let x in keys) {
        headersKeys.push({ text: keys[x], value: keys[x] })
      }
      this.exportHeadersEGE = headersKeys
      this.exportDataEGE = this.ege_results
    },
    async SPORTSave() {
      this.exportDataSPORT = []
      for (let x in this.sport_results) {
        if (this.sport_results[x].test !== null) {
          const updatedData = {
            id: this.sport_results[x].test,
            sport_date: this.sport_date,
          }
          this.updateAbit(updatedData)
          this.addSportScore({
            abitId: this.sport_results[x].test,
            score: this.sport_results[x].exercise_1_score,
            result: this.sport_results[x].exercise_1_result,
            exercises: this.exercises.find((sub) =>
              sub.name.includes(`№${this.sport_results[x].exercise_1_num} `),
            ),
          })
          this.addSportScore({
            abitId: this.sport_results[x].test,
            score: this.sport_results[x].exercise_2_score,
            result: this.sport_results[x].exercise_2_result,
            exercises: this.exercises.find((sub) =>
              sub.name.includes(`№${this.sport_results[x].exercise_2_num} `),
            ),
          })
          this.addSportScore({
            abitId: this.sport_results[x].test,
            score: this.sport_results[x].exercise_3_score,
            result: this.sport_results[x].exercise_3_result,
            exercises: this.exercises.find((sub) =>
              sub.name.includes(`№${this.sport_results[x].exercise_3_num} `),
            ),
          })
        } else {
          this.exportDataSPORT.push(this.sport_results[x])
        }
      }
    },
    async SportCheck() {
      this.exportDataSPORT = []
      for (let x in this.sport_results) {
        if (this.sport_results[x].test == null) {
          this.exportDataSPORT.push(this.sport_results[x])
        }
      }
    },
    async handleFileSPORT() {
      const formData = new FormData()
      formData.append('file', this.fileSPORT)
      await this.sportFromExcel(formData)
      const keys = Object.keys(this.sport_results[0])
      const headersKeys = []
      for (let x in keys) {
        headersKeys.push({ text: keys[x], value: keys[x] })
      }
      this.exportHeadersSPORT = headersKeys
      this.exportDataSPORT = this.sport_results
    },
    async ENTRANCESave() {
      moment.locale('ru')
      this.exportDataENTRANCE = []
      const items = []
      for (let x in this.entrance_results) {
        if (this.entrance_results[x].test !== null) {
          this.addEntranceTestMark({
            abitId: this.entrance_results[x].test,
            mark: this.entrance_results[x].mark,
            date: this.entrance_results[x].date,
            subject: this.subjects.find(
              (sub) =>
                sub.name.toLowerCase() ===
                this.entrance_results[x].subject.toLowerCase(),
            ),
            form: this.formEntranceTest,
          })
          const item = this.allAbits.find(
            (abit) => abit.id == this.entrance_results[x].test,
          )
          items.push({
            num: `${items.length + 1}.`,
            fio: `${item.militaryService_rank?.name ?? ''} ${item.lastName.toUpperCase()} ${item.firstName} ${item.surName}`,
            personal_file_number: `${item.personal_file_number}`,
            mark: `${this.entrance_results[x].mark}`,
          })
        } else {
          this.exportDataENTRANCE.push(this.ppo_results[x])
        }
      }
      const fileName = 'Традиция.docx'
      const datas = []
      for (let i = 0; i < items.length; i += 30) {
        const chunk = items.slice(i, i + 30)
        datas.push(chunk)
      }
      const sklonenie = require('sklonenie')
      for (let i in datas) {
        const data = {
          subject: sklonenie(
            this.entrance_results[0].subject.toLowerCase(),
          )[2][0],
          date: `${moment(this.entrance_results[0].date).format('DD MMMM YYYY')} г.`,
          items: datas[i],
          state: parseInt(i) + 1,
        }
        await this.exportToWord({ data, fileName })
      }
    },
    async EntranceCheck() {
      this.exportDataENTRANCE = []
      for (let x in this.entrance_results) {
        if (this.entrance_results[x].id == null) {
          this.exportDataENTRANCE.push(this.entrance_results[x])
        }
      }
    },
    async handleFileENTRANCE() {
      const formData = new FormData()
      formData.append('file', this.fileENTRANCE)
      await this.entranceFromExcel(formData)

      const keys = Object.keys(this.entrance_results[0])
      const headersKeys = []
      for (let x in keys) {
        headersKeys.push({ text: keys[x], value: keys[x] })
      }
      this.exportHeadersENTRANCE = headersKeys
      this.exportDataENTRANCE = this.entrance_results
    },
    async CALLSSave() {
      moment.locale('ru')
      this.exportDataCALLS = []
      for (let x in this.calls_results) {
        if (this.calls_results[x].test == true) {
          const updatedData = {
            id: this.allAbits.find(
              (abit) => abit.personal_file_number == this.calls_results[x].ld,
            ).id,
            call_number: this.calls_results[x].num,
            call_date: moment(this.calls_results[x].date, 'M/DD/YYYY').format(
              'YYYY-MM-DD',
            ),
            call_date_admission: moment(
              this.calls_results[x].date_admission,
              'D MMMM YYYY г.',
            ).format('YYYY-MM-DD'),
          }
          this.updateAbit(updatedData)
          this.saveHistoryMessage(updatedData)
        } else {
          this.exportDataCALLS.push(this.calls_results[x])
        }
      }
    },
    async CALLSCheck() {
      this.exportDataCALLS = []
      for (let x in this.calls_results) {
        if (this.calls_results[x].test == false) {
          this.exportDataCALLS.push(this.calls_results[x])
        }
      }
    },
    async handleFileCALLS() {
      const formData = new FormData()
      formData.append('file', this.fileCALLS)
      await this.callsFromExcel(formData)

      const keys = Object.keys(this.calls_results[0])
      const headersKeys = []
      for (let x in keys) {
        headersKeys.push({ text: keys[x], value: keys[x] })
      }
      this.exportHeadersCALLS = headersKeys
      this.exportDataCALLS = this.calls_results
    },

    sendDateQE(event) {
      this.QE_date = event
    },
    sendDateSport(event) {
      this.sport_date = event
    },
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('YYYY-MM-DD')
    },
  },
}
</script>
<style>
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
