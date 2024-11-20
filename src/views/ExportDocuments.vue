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
      <v-card-title>
        <span>Вывод документов</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-dialog v-model="dialogExcel">
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
                <v-card-actions>
                  <v-btn
                    @click="Export"
                    text
                    color="primary"
                    >Внести</v-btn
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
          <v-col cols="3">
            <v-dialog v-model="dialogWord">
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  width="300px"
                >
                  <v-icon>mdi-download-circle-outline</v-icon>
                  Данные Word
                </v-btn>
              </template>
              <v-card>
                <v-card-title><span>Занесение данных</span> </v-card-title>
                <v-card-actions>
                  <v-btn
                    @click="ExportWord"
                    text
                    color="primary"
                    >Внести</v-btn
                  >
                </v-card-actions>
                <v-card-text>
                  <v-text-field
                    label="COntent"
                    v-model="wordContent"
                    @input="log"
                  />
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
                  Word
                </v-btn>
              </template>
              <v-card>
                <v-card-title><span>Занесение данных</span> </v-card-title>
                <v-card-text>
                  <v-file-input
                    v-model="file"
                    label="Выберите файл"
                    accept=".doc, .docx"
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    >Просмотр</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ExportDocumentsComponent',
  data() {
    return {
      dialogExcel: false,
      dialogWord: false,
      wordContent: null,
      file: null,
      exportData: [],
      exportHeaders: [],

      dialogFile: false,
      file: null,
    }
  },
  computed: {
    ...mapGetters(['subjects', 'importedData', 'exportedData']),
  },
  watch: {},
  mounted() {},
  created() {
    this.fetchSubjects()
  },

  methods: {
    ...mapActions([
      'fetchSubjects',
      'importFromExcel',
      'importFromWord',
      'updateAbit',
      'exportToExcel',
      'exportToWord',
    ]),
    async Export() {
      await this.exportToExcel()
      console.log(this.exportedData)
    },
    async ExportWord() {
      await this.exportToWord(this.wordContent)
      console.log(this.exportedData)
    },
    log() {
      console.log(this.wordContent)
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
