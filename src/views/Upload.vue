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
        <v-row>
          <v-col cols="3">
            <v-dialog v-model="dialogFilePPO">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  width="300px"
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
                  <v-file-input
                    v-model="filePPO"
                    label="Выберите файл"
                    accept=".xls, .xlsx"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="PpoSave"
                    text
                    color="primary"
                    >Внести</v-btn
                  >
                  <v-btn
                    @click="PpoCheck"
                    text
                    color="primary"
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
          <v-col cols="3">
            <v-dialog v-model="dialogFileEGE">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  width="300px"
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
                    >Внести</v-btn
                  >
                  <v-btn
                    @click="EgeCheck"
                    text
                    color="primary"
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
          <v-col cols="3">
            <v-dialog v-model="dialogFileENTRANCE">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  width="300px"
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
                  <v-file-input
                    v-model="fileENTRANCE"
                    label="Выберите файл"
                    accept=".xls, .xlsx"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="ENTRANCESave"
                    text
                    color="primary"
                    >Внести</v-btn
                  >
                  <v-btn
                    @click="EntranceCheck"
                    text
                    color="primary"
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
          <v-col cols="3">
            <v-dialog v-model="dialogFile">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UploadComponent',
  data() {
    return {
      dialogFile: false,
      dialogFilePPO: false,
      dialogFileEGE: false,
      dialogFileENTRANCE: false,
      file: null,
      filePPO: null,
      fileEGE: null,
      fileENTRANCE: null,
      exportData: [],
      exportDataPPO: [],
      exportDataEGE: [],
      exportDataENTRANCE: [],
      exportHeaders: [],
      exportHeadersPPO: [],
      exportHeadersEGE: [],
      exportHeadersENTRANCE: [],
    }
  },
  computed: {
    ...mapGetters([
      'ppo_group',
      'ppo_results',
      'ege_results',
      'entrance_results',
      'subjects',
      'importedData',
      'allAbits',
    ]),
  },
  watch: {},
  mounted() {},
  created() {
    this.fetchSubjects()
    this.fetchAbits()
  },

  methods: {
    ...mapActions([
      'fetchSubjects',
      'fetchAbits',
      'egeFromExcel',
      'entranceFromExcel',
      'ppoFromExcel',
      'importFromExcel',
      'exportToWord',
      'updateAbit',
      'addEgeMark',
      'addEntranceTestMark',
    ]),
    async Save() {
      this.exportData = []
      for (let x in this.importedData) {
        var upAbit = {}
        for (let y in this.exportHeaders) {
          upAbit[this.exportHeaders[y].value] =
            this.importedData[x][this.exportHeaders[y].value]
        }
        console.log(upAbit)
        // this.updateAbit({
        //   id: this.importedData[x].abitId,
        // })
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
    async PpoSave() {
      this.exportDataPPO = []
      let items = []
      for (let x in this.ppo_results) {
        if (this.ppo_results[x].test == true) {
          console.log(this.ppo_results[x])
          this.updateAbit({
            id: this.ppo_results[x].abitId,
            qualificationExam_mark: this.ppo_results[x].mark,
            qualificationExam_date: moment().format('YYYY-MM-DD'),
            qualificationExam_group: this.ppo_group,
            qualificationExam_results: this.ppo_results[x].results,
          })
          const item = this.allAbits.find(
            (abit) => abit.id == this.ppo_results[x].abitId
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
        date: `${moment().format('DD.MM.YYYY')} г.`,
        group: `${this.ppo_group}`,
        items: items,
      }
      const fileName = 'export.docx'
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
        if (this.ege_results[x].id !== null) {
          this.addEgeMark({
            abitId: this.ege_results[x].id,
            mark: this.ege_results[x].mark,
            date: this.ege_results[x].date,
            subject: this.subjects.find(
              (sub) =>
                sub.name.toLowerCase() ===
                this.ege_results[x].subject.toLowerCase()
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
    async ENTRANCESave() {
      this.exportDataENTRANCE = []
      for (let x in this.entrance_results) {
        if (this.entrance_results[x].id !== null) {
          this.addEntranceTestMark({
            abitId: this.entrance_results[x].id,
            mark: this.entrance_results[x].mark,
            date: this.entrance_results[x].date,
            subject: this.subjects.find(
              (sub) =>
                sub.name.toLowerCase() ===
                this.entrance_results[x].subject.toLowerCase()
            ),
          })
        } else {
          this.exportDataENTRANCE.push(this.entrance_results[x])
        }
      }
    },
    async EntranceCheck() {
      this.exportDataENTRANCE = []
      for (let x in this.entrance_results) {
        if (this.entrance_results[x].test == null) {
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
