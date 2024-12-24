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
            <v-btn
              @click="ExportCALLS"
              color="secondary"
              width="300px"
            >
              <v-icon>mdi-download-circle-outline</v-icon>
              Вызовы
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              @click="ExportMED"
              color="secondary"
              width="300px"
            >
              <v-icon>mdi-download-circle-outline</v-icon>
              Медицина
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              @click="ExportAchievements"
              color="secondary"
              width="300px"
            >
              <v-icon>mdi-download-circle-outline</v-icon>
              Достижения
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn
              @click="ExportEgeToCSV"
              color="secondary"
              width="300px"
            >
              <v-icon>mdi-download-circle-outline</v-icon>
              ЕГЭ csv
            </v-btn>
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
  name: 'ExportDocumentsComponent',
  data() {
    return {
      dialogExcel: false,

      exportData: [],
      exportHeaders: [],
    }
  },
  computed: {
    ...mapGetters(['exportedData', 'fullAbits']),
  },
  watch: {},
  mounted() {},
  async created() {
    await this.fetchFullAbits()
  },

  methods: {
    ...mapActions([
      'exportToExcel',
      'exportToWord',
      'exportCALLStoExcel',
      'exportToTemplateExcel',
      'fetchFullAbits',
      'egeToCSV',
    ]),
    async Export() {
      await this.exportToExcel()
    },
    async ExportMED() {
      let items = []
      for (let item of this.fullAbits) {
        items.push({
          num: `${items.length + 1}`,
          personal_file_number: `${item.personal_file_number}`,
          rank: `${item.militaryService_rank ?? ''}`,
          fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName}`,
        })
      }
      const fileName = 'Med.docx'
      const data = { items: items }
      await this.exportToWord({ data, fileName })
    },
    async ExportAchievements() {
      let items = []
      console.log(this.fullAbits)
      for (let item of this.fullAbits) {
        const note = item.personal_achievements
          .map((achievement) =>
            achievement.test
              ? `${achievement.achievement.name}-${achievement.achievement.value}`
              : ''
          )
          .join('; \n')
        items.push({
          num: `${items.length + 1}`,
          ld: `${item.personal_file_number}`,
          fio: `${item.militaryService_rank ?? ''} ${item.lastName.toUpperCase()} ${item.firstName} ${item.surName}`,
          score: `${item.personal_achievements_score}`,
          note: note,
        })
      }
      const fileName = 'Achievements.xlsx'
      const data = { items: items }
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportCALLS() {
      let items = []
      for (let item of this.fullAbits) {
        if (item.militaryService_unit) {
          items.push({
            num: `${items.length + 1}`,
            personal_file_number: `${item.personal_file_number}`,
            rank: `${item.militaryService_rank ?? ''}`,
            fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName}`,
            birthday: `${moment(item.birthday).format('DD.MM.YYYY')}`,
            region: ``,
            militaryCommissariat: `${item.militaryService_unit}(${item.militaryService_place})\r\nДислокация:${item.militaryService_unit_address}`,
          })
        } else if (item.education_category?.includes('МО')) {
          items.push({
            num: `${items.length + 1}`,
            personal_file_number: `${item.personal_file_number}`,
            rank: ``,
            fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName}`,
            birthday: `${moment(item.birthday).format('DD.MM.YYYY')}`,
            region: `суворовец`,
            militaryCommissariat: `${item.education_institute}`,
          })
        } else {
          items.push({
            num: `${items.length + 1}`,
            personal_file_number: `${item.personal_file_number}`,
            rank: `${item.militaryService_rank ?? ''}`,
            fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName}`,
            birthday: `${moment(item.birthday).format('DD.MM.YYYY')}`,
            region: `${item.militaryCommissariat_region_address}`,
            militaryCommissariat: `${item.militaryCommissariat_name}`,
          })
        }
      }
      const fileName = 'CALLS.xlsx'
      const data = { items: items }
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportEgeToCSV() {
      await this.egeToCSV()
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
