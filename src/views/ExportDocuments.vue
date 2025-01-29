<template>
  <v-container
    class="BGclr"
    style="height: 100vh"
    justify="center"
    fluid
  >
    <v-card justify="center">
      <v-card-title>
        <span>Вывод документов</span>
      </v-card-title>
      <v-card-text>
        <v-alert
          border="left"
          colored-border
          color="primary"
          elevation="2"
        >
          <v-row>
            <v-col cols="3">
              <v-btn
                @click="ExportMED"
                color="secondary"
                rounded
                width="300px"
              >
                Медицина
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportAchievements"
                color="secondary"
                rounded
                width="300px"
              >
                Достижения
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportCheckEGE"
                color="secondary"
                rounded
                width="300px"
              >
                Проверка ЕГЭ
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportCheckSport"
                color="secondary"
                rounded
                width="300px"
              >
                Проверка ФП
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <v-alert
          border="left"
          colored-border
          color="primary"
          elevation="2"
        >
          <v-row>
            <v-col cols="3">
              <v-btn
                @click="ExportCALLS"
                color="secondary"
                width="300px"
                rounded
              >
                Вызовы
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportEgeToCSV"
                color="secondary"
                width="300px"
                rounded
              >
                ЕГЭ csv
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportSport"
                color="secondary"
                width="300px"
                rounded
              >
                ФП_все
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <v-alert
          border="left"
          colored-border
          color="primary"
          elevation="2"
        >
          <v-row>
            <v-col cols="3">
              <v-btn
                @click="ExportLS"
                color="secondary"
                width="300px"
                rounded
              >
                Расход
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportRating"
                color="secondary"
                width="300px"
                rounded
              >
                Конкурс
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportReference"
                color="secondary"
                width="300px"
                rounded
              >
                Справка
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <v-alert
          border="left"
          colored-border
          color="primary"
          elevation="2"
        >
          <v-row>
            <v-col cols="3">
              <v-btn
                @click="ExportEGE"
                color="secondary"
                width="300px"
                rounded
              >
                Талмут_ЕГЭ
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportSphere"
                color="secondary"
                width="300px"
                rounded
              >
                Сфера
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportFaculty"
                color="secondary"
                width="300px"
                rounded
              >
                Факультетам
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportFacultyFinish"
                color="secondary"
                width="300px"
                rounded
              >
                Факультетам_финиш
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <v-alert
          border="left"
          colored-border
          color="primary"
          elevation="2"
        >
          <v-row>
            <v-col cols="3">
              <v-btn
                @click="ExportRatingGUK"
                color="secondary"
                width="300px"
                rounded
              >
                Рейтинг_ГУК
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportExpulsionGUK"
                color="secondary"
                width="300px"
                rounded
              >
                Отказано_ГУК
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="Export29GUK"
                color="secondary"
                width="300px"
                rounded
              >
                29ГУК
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="Export33GUK"
                color="secondary"
                width="300px"
                rounded
              >
                33ГУК
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportBase"
                color="secondary"
                width="300px"
                rounded
              >
                Статистика
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportOVY"
                color="secondary"
                width="300px"
                rounded
              >
                Статистика ОВУ
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportSpec"
                color="secondary"
                width="300px"
                rounded
              >
                Статистика ВСП
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportSVY"
                color="secondary"
                width="300px"
                rounded
              >
                Статистика СВУ
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportYongArmy"
                color="secondary"
                width="300px"
                rounded
              >
                Статистика Юнармия
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportCossack"
                color="secondary"
                width="300px"
                rounded
              >
                Статистика Казаки
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportStatMil"
                color="secondary"
                width="300px"
                rounded
              >
                Статистика ВС
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                @click="ExportCharacteristic"
                color="secondary"
                width="300px"
                rounded
              >
                Статистика КХ
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
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
    return {}
  },
  computed: {
    ...mapGetters([
      'fullAbits',
      'specialty',
      'regions',
      'nationality',
      'militaryPlaces',
      'cossack_society',
    ]),
  },
  watch: {},
  mounted() {},
  async created() {
    await this.fetchFullAbits()
    await this.fetchSpecialty()
    await this.fetchRegions()
    await this.fetchNationality()
    await this.fetchMilitaryPlaces()
    await this.fetchCossackSociety()
  },

  methods: {
    ...mapActions([
      'exportToExcel',
      'exportToWord',
      'exportToTemplateExcel',
      'exportToTemplateExcelLists',
      'egeToCSV',
      'fetchFullAbits',
      'fetchSpecialty',
      'fetchRegions',
      'fetchNationality',
      'fetchMilitaryPlaces',
      'fetchCossackSociety',
    ]),
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD.MM.YYYY')
    },
    async Export() {
      await this.exportToExcel()
    },

    async ExportMED() {
      let items = []
      for (let item of this.fullAbits) {
        items.push({
          num: `${items.length + 1}`,
          personal_file_number: `${item.personal_file_number}`,
          rank: `${item.militaryService_dismissed == false ? (item.militaryService_rank ?? '') : ''}`,
          fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName}`,
        })
      }
      const fileName = 'Медицина.docx'
      const data = { items: items }
      await this.exportToWord({ data, fileName })
    },
    async ExportAchievements() {
      let items = []
      for (let item of this.fullAbits) {
        const note = item.personal_achievements
          .map((achievement) =>
            achievement.test
              ? `${achievement.achievement.name}-${achievement.achievement.value}`
              : '',
          )
          .join('; \n')
        if (item.personal_achievements_score != 0) {
          items.push({
            num: `${items.length + 1}`,
            ld: `${item.personal_file_number}`,
            fio: `${item.militaryService_dismissed == false ? (item.militaryService_rank ?? '') : ''} ${item.lastName.toUpperCase()} ${item.firstName} ${item.surName}`,
            score: `${item.personal_achievements_score}`,
            note: note,
          })
        }
      }
      const fileName = 'Достижения.xlsx'
      const data = { items: items }
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportCheckEGE() {
      let items = []
      for (let item of this.fullAbits) {
        items.push({
          num: `${items.length + 1}`,
          fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName ?? ''}, ${moment(item.birthday).format('DD-MM-YYYY[г.р.]') ?? ''}`,
          ege_math: `${item.ege_math ?? ''}`,
          ege_rus: `${item.ege_rus ?? ''}`,
          ege_phiz: `${item.ege_phiz ?? ''}`,
          ege_inf: `${item.ege_inf ?? ''}`,
          ege_geo: `${item.ege_geo ?? ''}`,
          ege_hist: `${item.ege_hist ?? ''}`,
          ege_obsh: `${item.ege_obsh ?? ''}`,
        })
      }
      const fileName = 'Ведомость проверки ЕГЭ.docx'
      const data = { items: items }
      await this.exportToWord({ data, fileName })
    },
    async ExportCheckSport() {
      moment.locale('ru')
      let items = []
      let abits = []
      for (let item of this.fullAbits.filter(
        (abit) => abit.sport_score != null,
      )) {
        abits.push({
          num: `${items.length + 1}`,
          personal_file_number: `${item.personal_file_number}`,
          rank: `${item.militaryService_dismissed == false ? (item.militaryService_rank ?? '') : ''}`,
          fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName ?? ''}`,
          score: `${item.sport_score}`,
          date: `${item.sport_date}`,
        })
      }
      const dates = [...new Set(abits.map((abit) => abit.date))]
      const y = []

      for (let item of dates) {
        for (
          let i = 0;
          i < abits.filter((abit) => abit.date == item).length;
          i += 30
        ) {
          y.push({
            date: item,
            number: y.length + 1,
            abits: abits.filter((abit) => abit.date == item).slice(i, i + 30),
          })
        }
      }
      for (let item of y) {
        items.push({
          date: moment(item.date).format('DD MMMM YYYY[г.]'),
          number: item.number,
          abits: item.abits,
        })
      }
      const fileName = 'Ведомости ФП.docx'
      const data = { items: items }
      await this.exportToWord({ data, fileName })
    },

    async ExportCALLS() {
      let items = []
      for (let item of this.fullAbits) {
        if (
          item.militaryService_rank &&
          item.militaryService_dismissed == false
        ) {
          items.push({
            num: `${items.length + 1}`,
            personal_file_number: `${item.personal_file_number}`,
            rank: `${item.militaryService_dismissed == false ? (item.militaryService_rank ?? '') : ''}`,
            fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName}`,
            birthday: `${moment(item.birthday).format('DD.MM.YYYY')}`,
            region: ``,
            militaryCommissariat: `${item.militaryService_unit}(${item.militaryService_place})\r\nДислокация:${item.militaryService_unit_address}`,
          })
        } else if (item.sign == 'Кадет') {
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
            rank: ``,
            fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName}`,
            birthday: `${moment(item.birthday).format('DD.MM.YYYY')}`,
            region: `${item.militaryCommissariat_region_address}`,
            militaryCommissariat: `${item.militaryCommissariat_name}`,
          })
        }
      }
      const fileName = 'Вызовы.xlsx'
      const data = { items: items }
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportEgeToCSV() {
      await this.egeToCSV()
    },
    async ExportSport() {
      let items = []
      for (let item of this.fullAbits) {
        items.push({
          num: `${item.id}`,
          group: `${item.admission_examination_group ?? ''}`,
          rank: `${item.militaryService_rank ?? ''}`,
          fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName ?? ''}`,
          reg: `${item.admission_commission_region ?? ''}`,
          bd: `${this.formatDate(item.birthday) ?? ''}`,
          score: `${item.sport_score ?? ''}`,
          date: `${this.formatDate(item.sport_date) ?? ''}`,
          expulsion: `${item.expulsion_reason ?? ''}`,
        })
      }
      const fileName = 'ФП_все.xlsx'
      const data = { items: items }
      await this.exportToTemplateExcel({ data, fileName })
    },

    async ExportLS() {
      let data = {}
      data.date = moment().format('DD.MM.YYYY [г.]')
      data.all = this.fullAbits.length
      for (let item of this.specialty) {
        data[item.abbreviation] = {
          all: this.fullAbits
            .filter((abit) => abit.specialty_1 == item.abbreviation)
            .filter((abit) => abit.expulsion_reason == null).length,
          group: this.fullAbits
            .filter(
              (abit) =>
                abit.specialty_1 == item.abbreviation &&
                abit.expulsion_reason == null,
            )
            .filter((abit) => abit.sign == 'Выездная группа').length,
          group_Hab: this.fullAbits
            .filter(
              (abit) =>
                abit.specialty_1 == item.abbreviation &&
                abit.expulsion_reason == null,
            )
            .filter(
              (abit) =>
                abit.sign == 'Выездная группа' &&
                abit.admission_commission_region == '27',
            ).length,
          gp_suvorovtsy: this.fullAbits
            .filter(
              (abit) =>
                abit.specialty_1 == item.abbreviation &&
                abit.expulsion_reason == null,
            )
            .filter(
              (abit) =>
                (abit.militaryService_rank == null ||
                  (abit.militaryService_dismissed == true &&
                    abit.militaryService_rank != null)) &&
                abit.sign == 'Кадет',
            ).length,
          gp_plp: this.fullAbits
            .filter(
              (abit) =>
                abit.specialty_1 == item.abbreviation &&
                abit.expulsion_reason == null,
            )
            .filter(
              (abit) =>
                (abit.militaryService_rank == null ||
                  (abit.militaryService_dismissed == true &&
                    abit.militaryService_rank != null)) &&
                abit.education_category_abbreviation == 'ОШИ с ПЛП',
            ).length,
          gp_other: this.fullAbits
            .filter(
              (abit) =>
                abit.specialty_1 == item.abbreviation &&
                abit.expulsion_reason == null,
            )
            .filter(
              (abit) =>
                (abit.militaryService_rank == null ||
                  (abit.militaryService_dismissed == true &&
                    abit.militaryService_rank != null)) &&
                abit.education_category_abbreviation != 'ОШИ с ПЛП' &&
                abit.sign != 'Кадет',
            ).length,
          military_contract: this.fullAbits
            .filter(
              (abit) =>
                abit.specialty_1 == item.abbreviation &&
                abit.expulsion_reason == null,
            )
            .filter(
              (abit) =>
                abit.militaryService_rank != null &&
                abit.militaryService_dismissed == false &&
                abit.militaryService_category == 'Контракт',
            ).length,
          military_conscription: this.fullAbits
            .filter(
              (abit) =>
                abit.specialty_1 == item.abbreviation &&
                abit.expulsion_reason == null,
            )
            .filter(
              (abit) =>
                abit.militaryService_rank != null &&
                abit.militaryService_dismissed == false &&
                abit.militaryService_category == 'По призыву',
            ).length,
          expulsed_notWish: this.fullAbits
            .filter((abit) => abit.specialty_1 == item.abbreviation)
            .filter((abit) => abit.expulsion_reason == 'нежел.').length,
          expulsed_stupid: this.fullAbits
            .filter((abit) => abit.specialty_1 == item.abbreviation)
            .filter((abit) => abit.expulsion_reason?.includes('(')).length,
          expulsed_notDiscipline: this.fullAbits
            .filter((abit) => abit.specialty_1 == item.abbreviation)
            .filter((abit) => abit.expulsion_reason == 'дисц.').length,
          expulsed_notHealth: this.fullAbits
            .filter((abit) => abit.specialty_1 == item.abbreviation)
            .filter((abit) => abit.expulsion_reason == 'сост. здоровья').length,
          expulsed_notPPo: this.fullAbits
            .filter((abit) => abit.specialty_1 == item.abbreviation)
            .filter((abit) => abit.expulsion_reason == 'КЭ').length,
          expulsed_institute: this.fullAbits
            .filter((abit) => abit.specialty_1 == item.abbreviation)
            .filter((abit) => abit.expulsion_reason == 'убыл в другой ВВУЗ')
            .length,
          expulsed_other: this.fullAbits
            .filter((abit) => abit.specialty_1 == item.abbreviation)
            .filter(
              (abit) =>
                abit.expulsion_reason != null &&
                abit.expulsion_reason != 'нежел.' &&
                !abit.expulsion_reason.includes('(') &&
                abit.expulsion_reason != 'дисц.' &&
                abit.expulsion_reason != 'сост. здоровья' &&
                abit.expulsion_reason != 'КЭ' &&
                abit.expulsion_reason != 'убыл в другой ВВУЗ',
            ).length,
        }
      }
      const fileName = 'Расход.xlsx'
      await this.exportToTemplateExcel({ data, fileName })
    },
    //квота с параметром выше
    async ExportRating() {
      let items = []
      for (let item of this.fullAbits) {
        items.push({
          faculty: `${item.faculty ?? ''}`,
          specialty: `${item.specialty_1 ?? ''}`,
          personal_file_number: `${item.personal_file_number ?? ''}`,
          fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName ?? ''}, ${this.formatDate(item.birthday) ?? ''}`,
          admission_examination_group: `${item.admission_examination_group ?? ''}`,
          sport_score: `${item.sport_score ?? ''}`,
          qualificationExam_mark: `${item.qualificationExam_mark ?? ''}`,
          personal_achievements_score: `${item.personal_achievements_score ?? ''}`,
          cadet: `${item.sign == 'Кадет' ? 'V' : ''}`,
          priorityRight_test: `${item.priorityRight_test ? 'V' : ''}`,
          separateQuota_test: `${item.separateQuota_test ? 'V' : ''}`,
          establishedQuota_test: `${item.establishedQuota_test ? 'V' : ''}`,
          math:
            (item.ege_math ?? 0) < (item.entrance_math ?? 0)
              ? `${item.entrance_math}т`
              : `${item.ege_math ?? ''}`,
          rus:
            (item.ege_rus ?? 0) < (item.entrance_rus ?? 0)
              ? `${item.entrance_rus}т`
              : `${item.ege_rus ?? ''}`,
          inf:
            (item.ege_inf ?? 0) < (item.entrance_inf ?? 0)
              ? `${item.entrance_inf}т`
              : `${item.ege_inf ?? ''}`,
          phiz:
            (item.ege_phiz ?? 0) < (item.entrance_phiz ?? 0)
              ? `${item.entrance_phiz}т`
              : `${item.ege_phiz ?? ''}`,
          geo:
            (item.ege_geo ?? 0) < (item.entrance_geo ?? 0)
              ? `${item.entrance_geo}т`
              : `${item.ege_geo ?? ''}`,
          hist:
            (item.ege_hist ?? 0) < (item.entrance_hist ?? 0)
              ? `${item.entrance_hist}т`
              : `${item.ege_hist ?? ''}`,
          obsh:
            (item.ege_obsh ?? 0) < (item.entrance_obsh ?? 0)
              ? `${item.entrance_obsh}т`
              : `${item.ege_obsh ?? ''}`,
          rating: `${item.rating ?? ''}`,
          education_category_abbreviation: `${item.education_category_abbreviation ?? ''}`,
          phone: `${item.phone_1 ?? ''} ${item.phone_2 ?? ''}`,
          expulsion: `${item.expulsion_reason ? 'V' : ''}`,
        })
      }
      items.sort((a, b) => {
        if (a.specialty != b.specialty) {
          return b.rating - a.rating
        }
        if (a.sign == 'Кадет' && b.sign != 'Кадет') {
          return -10000
        }
        if (b.sign == 'Кадет' && a.sign != 'Кадет') {
          return -10000
        }
        if (a.separateQuota_test && !b.separateQuota_test) {
          return -1000
        }
        if (!a.separateQuota_test && b.separateQuota_test) {
          return 1000
        }
        if (a.establishedQuota_test && !b.establishedQuota_test) {
          return -100
        }
        if (!a.establishedQuota_test && b.establishedQuota_test) {
          return 100
        }
        if (a.qualificationExam_mark > 3 && b.qualificationExam_mark == 3) {
          return -10
        }
        if (a.qualificationExam_mark == 3 && b.qualificationExam_mark > 3) {
          return 10
        }
        if (
          a.priorityRight_test &&
          !b.priorityRight_test &&
          a.rating == b.rating
        ) {
          return -1
        }
        if (
          b.priorityRight_test &&
          !a.priorityRight_test &&
          a.rating == b.rating
        ) {
          return 1
        }
        return b.rating - a.rating
      })
      items = items.map((abit) => ({
        ...abit,
        num: `${items.indexOf(abit) + 1}`,
      }))
      const fileName = 'Конкурс.xlsx'
      const data = { items: items }
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportReference() {
      let test = this.fullAbits.length
      moment.locale('ru')
      let data = {}
      data.date = moment().format('DD MMMM YYYY [г.]')
      data.military_contract = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_category == 'Контракт',
      ).length
      data.military_conscription = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_category == 'По призыву',
      ).length
      data.PLP = this.fullAbits.filter(
        (abit) =>
          abit.education_category_abbreviation == 'ОШИ с ПЛП' &&
          abit.militaryService_rank == null,
      ).length
      data.yongArmy = this.fullAbits.filter((abit) =>
        abit.personal_achievements
          .map((ach) => ach.achievement?.name)
          .includes('Юнармеец'),
      ).length
      data.VUZ = this.fullAbits.filter(
        (abit) =>
          abit.uncanceledEducation_category_level == 'высшее' &&
          abit.education_category_abbreviation != 'ОШИ с ПЛП' &&
          abit.sign != 'Кадет' &&
          abit.militaryService_rank == null,
      ).length
      data.SPO = this.fullAbits.filter(
        (abit) =>
          abit.education_category_level == 'СПО' &&
          abit.militaryService_rank == null &&
          abit.uncanceledEducation_category_level != 'высшее' &&
          !abit.personal_achievements
            .map((ach) => ach.achievement?.name)
            .includes('Юнармеец'),
      ).length
      data.KK = this.fullAbits.filter(
        (abit) =>
          abit.education_category_abbreviation == 'КК' &&
          abit.militaryService_rank == null,
      ).length
      data.SVY = this.fullAbits.filter(
        (abit) =>
          (abit.education_category_abbreviation == 'СВУ' ||
            abit.education_category_abbreviation == 'ВМУ') &&
          abit.militaryService_rank == null,
      ).length
      data.PKY = this.fullAbits.filter(
        (abit) =>
          abit.education_category_abbreviation == 'ПКУ' &&
          abit.militaryService_rank == null,
      ).length
      data.other1 =
        this.fullAbits.length -
        data.KK -
        data.PKY -
        data.SVY -
        data.SPO -
        data.VUZ -
        data.military_conscription -
        data.military_contract
      data.MVO_mil_admission = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.militaryService_dismissed == false &&
          abit.admission_date &&
          abit.militaryService_place == 'МВО',
      ).length
      data.LVO_mil_admission = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.militaryService_dismissed == false &&
          abit.admission_date &&
          abit.militaryService_place == 'ЛенВО',
      ).length
      data.VVO_mil_admission = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.militaryService_dismissed == false &&
          abit.admission_date &&
          abit.militaryService_place == 'ВВО',
      ).length
      data.CVO_mil_admission = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.militaryService_dismissed == false &&
          abit.admission_date &&
          abit.militaryService_place == 'ЦВО',
      ).length
      data.UVO_mil_admission = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.militaryService_dismissed == false &&
          abit.admission_date &&
          abit.militaryService_place == 'ЮВО',
      ).length
      data.MVO_mil_success = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.specialty_admission != undefined &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_place == 'МВО',
      ).length
      data.LVO_mil_success = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.specialty_admission != undefined &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_place == 'ЛенВО',
      ).length
      data.VVO_mil_success = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.specialty_admission != undefined &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_place == 'ВВО',
      ).length
      data.CVO_mil_success = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.specialty_admission != undefined &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_place == 'ЦВО',
      ).length
      data.UVO_mil_success = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.specialty_admission != undefined &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_place == 'ЮВО',
      ).length
      data.MVO_mil = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_place == 'МВО',
      ).length
      data.LVO_mil = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_place == 'ЛенВО',
      ).length
      data.VVO_mil = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_place == 'ВВО',
      ).length
      data.CVO_mil = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_place == 'ЦВО',
      ).length
      data.UVO_mil = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_place == 'ЮВО',
      ).length
      data.MVO = this.fullAbits.filter((abit) =>
        abit.militaryService_rank == null ||
        (abit.militaryService_rank != null &&
          abit.militaryService_dismissed == true)
          ? abit.militaryDistrict == 'МВО'
          : abit.militaryService_place == 'МВО',
      ).length
      data.LVO = this.fullAbits.filter((abit) =>
        abit.militaryService_rank == null ||
        (abit.militaryService_rank != null &&
          abit.militaryService_dismissed == true)
          ? abit.militaryDistrict == 'ЛенВО'
          : abit.militaryService_place == 'ЛенВО',
      ).length
      data.VVO = this.fullAbits.filter((abit) =>
        abit.militaryService_rank == null ||
        (abit.militaryService_rank != null &&
          abit.militaryService_dismissed == true)
          ? abit.militaryDistrict == 'ВВО'
          : abit.militaryService_place == 'ВВО',
      ).length
      data.CVO = this.fullAbits.filter((abit) =>
        abit.militaryService_rank == null ||
        (abit.militaryService_rank != null &&
          abit.militaryService_dismissed == true)
          ? abit.militaryDistrict == 'ЦВО'
          : abit.militaryService_place == 'ЦВО',
      ).length
      data.UVO = this.fullAbits.filter((abit) =>
        abit.militaryService_rank == null ||
        (abit.militaryService_rank != null &&
          abit.militaryService_dismissed == true)
          ? abit.militaryDistrict == 'ЮВО'
          : abit.militaryService_place == 'ЮВО',
      ).length
      data.VO_other =
        this.fullAbits.length -
        data.MVO -
        data.VVO -
        data.CVO -
        data.UVO -
        data.LVO
      data.soc_military = this.fullAbits.filter(
        (abit) => abit.family_social_status == 'военнослужащих',
      ).length
      data.soc_gos = this.fullAbits.filter(
        (abit) => abit.family_social_status == 'госслужащих',
      ).length
      data.soc_teacher = this.fullAbits.filter(
        (abit) => abit.family_social_status == 'преподавателей',
      ).length
      data.soc_service = this.fullAbits.filter(
        (abit) => abit.family_social_status == 'работников сферы услуг',
      ).length
      data.soc_seller = this.fullAbits.filter(
        (abit) => abit.family_social_status == 'работников торговли',
      ).length
      data.soc_work = this.fullAbits.filter(
        (abit) => abit.family_social_status == 'рабочих',
      ).length
      data.soc_serv = this.fullAbits.filter(
        (abit) => abit.family_social_status == 'служащих',
      ).length
      data.soc_science = this.fullAbits.filter(
        (abit) => abit.family_social_status == 'ученых',
      ).length
      data.soc_not = this.fullAbits.filter(
        (abit) => abit.family_social_status == '- нет данных',
      ).length
      data.soc_other =
        this.fullAbits.length -
        data.soc_military -
        data.soc_gos -
        data.soc_science -
        data.soc_seller -
        data.soc_serv -
        data.soc_service -
        data.soc_not -
        data.soc_work
      data.soc_military_admission = this.fullAbits.filter(
        (abit) =>
          abit.admission_date && abit.family_social_status == 'военнослужащих',
      ).length
      data.soc_gos_admission = this.fullAbits.filter(
        (abit) =>
          abit.admission_date && abit.family_social_status == 'госслужащих',
      ).length
      data.soc_teacher_admission = this.fullAbits.filter(
        (abit) =>
          abit.admission_date && abit.family_social_status == 'преподавателей',
      ).length
      data.soc_service_admission = this.fullAbits.filter(
        (abit) =>
          abit.admission_date &&
          abit.family_social_status == 'работников сферы услуг',
      ).length
      data.soc_seller_admission = this.fullAbits.filter(
        (abit) =>
          abit.admission_date &&
          abit.family_social_status == 'работников торговли',
      ).length
      data.soc_work_admission = this.fullAbits.filter(
        (abit) => abit.admission_date && abit.family_social_status == 'рабочих',
      ).length
      data.soc_serv_admission = this.fullAbits.filter(
        (abit) =>
          abit.admission_date && abit.family_social_status == 'служащих',
      ).length
      data.soc_science_admission = this.fullAbits.filter(
        (abit) => abit.admission_date && abit.family_social_status == 'ученых',
      ).length
      data.soc_not_admission = this.fullAbits.filter(
        (abit) =>
          abit.admission_date && abit.family_social_status == '- нет данных',
      ).length
      data.soc_other_admission =
        this.fullAbits.length -
        data.soc_military_admission -
        data.soc_gos_admission -
        data.soc_science_admission -
        data.soc_seller_admission -
        data.soc_serv_admission -
        data.soc_service_admission -
        data.soc_not_admission -
        data.soc_work_admission
      data.soc_military_success = this.fullAbits.filter(
        (abit) =>
          abit.specialty_admission != undefined &&
          abit.family_social_status == 'военнослужащих',
      ).length
      data.soc_gos_success = this.fullAbits.filter(
        (abit) =>
          abit.specialty_admission != undefined &&
          abit.family_social_status == 'госслужащих',
      ).length
      data.soc_teacher_success = this.fullAbits.filter(
        (abit) =>
          abit.specialty_admission != undefined &&
          abit.family_social_status == 'преподавателей',
      ).length
      data.soc_service_success = this.fullAbits.filter(
        (abit) =>
          abit.specialty_admission != undefined &&
          abit.family_social_status == 'работников сферы услуг',
      ).length
      data.soc_seller_success = this.fullAbits.filter(
        (abit) =>
          abit.specialty_admission != undefined &&
          abit.family_social_status == 'работников торговли',
      ).length
      data.soc_work_success = this.fullAbits.filter(
        (abit) =>
          abit.specialty_admission != undefined &&
          abit.family_social_status == 'рабочих',
      ).length
      data.soc_serv_success = this.fullAbits.filter(
        (abit) =>
          abit.specialty_admission != undefined &&
          abit.family_social_status == 'служащих',
      ).length
      data.soc_science_success = this.fullAbits.filter(
        (abit) =>
          abit.specialty_admission != undefined &&
          abit.family_social_status == 'ученых',
      ).length
      data.soc_not_success = this.fullAbits.filter(
        (abit) =>
          abit.specialty_admission != undefined &&
          abit.family_social_status == '- нет данных',
      ).length
      data.soc_other_success =
        this.fullAbits.length -
        data.soc_military_success -
        data.soc_gos_success -
        data.soc_science_success -
        data.soc_seller_success -
        data.soc_serv_success -
        data.soc_service_success -
        data.soc_not_success -
        data.soc_work_admission
      const Suvorovtsy = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank == null &&
          (abit.education_category_abbreviation == 'ОШИ с ПЛП' ||
            abit.sign == 'Кадет'),
      )

      for (let i = 1; i <= 43; i += 1) {
        data[`suvorov_${i}`] = Suvorovtsy.filter(
          (abit) => abit.education_institute_id == i,
        ).length
        data[`suvorov_admission_${i}`] = Suvorovtsy.filter(
          (abit) => abit.education_institute_id == i && abit.admission_date,
        ).length
        data[`suvorov_success_${i}`] = Suvorovtsy.filter(
          (abit) =>
            abit.education_institute_id == i &&
            abit.specialty_admission != undefined,
        ).length
        data[`suvorov_other_${i}`] = Suvorovtsy.filter(
          (abit) =>
            abit.education_institute_id == i &&
            abit.expulsion_reason != null &&
            abit.expulsion_reason != 'конкурс' &&
            abit.expulsion_reason != 'ФП' &&
            !abit.expulsion_reason?.includes('(') &&
            abit.expulsion_reason != 'дисц.' &&
            abit.expulsion_reason != 'сост. здоровья' &&
            abit.expulsion_reason != 'нежел.' &&
            abit.expulsion_reason != 'КЭ',
        ).length
        data[`suvorov_notRating_${i}`] = Suvorovtsy.filter(
          (abit) =>
            abit.education_institute_id == i &&
            abit.expulsion_reason == 'конкурс',
        ).length
        data[`suvorov_notSport_${i}`] = Suvorovtsy.filter(
          (abit) =>
            abit.education_institute_id == i && abit.expulsion_reason == 'ФП',
        ).length
        data[`suvorov_notWish_${i}`] = Suvorovtsy.filter(
          (abit) =>
            abit.education_institute_id == i &&
            abit.expulsion_reason == 'нежел.',
        ).length
        data[`suvorov_notPPO_${i}`] = Suvorovtsy.filter(
          (abit) =>
            abit.education_institute_id == i && abit.expulsion_reason == 'КЭ',
        ).length
        data[`suvorov_notHealth_${i}`] = Suvorovtsy.filter(
          (abit) =>
            abit.education_institute_id == i &&
            abit.expulsion_reason == 'сост. здоровья',
        ).length
        data[`suvorov_notEducation_${i}`] = Suvorovtsy.filter(
          (abit) =>
            abit.education_institute_id == i &&
            abit.expulsion_reason == 'Не соотв. ФЗ в обр.',
        ).length
        data[`suvorov_stupid_${i}`] = Suvorovtsy.filter(
          (abit) =>
            abit.education_institute_id == i &&
            abit.expulsion_reason?.includes('('),
        ).length
      }

      for (let i of this.regions) {
        data[`region_${i.region}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryCommissariat_region == i.region &&
            (abit.militaryService_rank == null ||
              (abit.militaryService_rank &&
                abit.militaryService_dismissed == true)),
        ).length
        test -= data[`region_${i.region}`]
        data[`region_admission_${i.region}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryCommissariat_region == i.region &&
            abit.admission_date &&
            (abit.militaryService_rank == null ||
              (abit.militaryService_rank &&
                abit.militaryService_dismissed == true)),
        ).length
        data[`region_success_${i.region}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryCommissariat_region == i.region &&
            abit.specialty_admission != undefined &&
            (abit.militaryService_rank == null ||
              (abit.militaryService_rank &&
                abit.militaryService_dismissed == true)),
        ).length
      }
      for (let i of this.militaryPlaces) {
        data[`mil_place_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false,
        ).length
        test -= data[`mil_place_${i.abbreviation}`]
        data[`mil_place_admission_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.admission_date &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false,
        ).length
        data[`mil_place_success_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_admission != undefined &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false,
        ).length
      }
      data.test = test
      data.notNat = this.fullAbits.filter(
        (abit) => abit.nationality == undefined,
      ).length
      data.notNat_admission = this.fullAbits.filter(
        (abit) => abit.nationality == undefined && abit.admission_date,
      ).length
      data.notNat_success = this.fullAbits.filter(
        (abit) =>
          abit.nationality == undefined &&
          abit.specialty_admission != undefined,
      ).length
      let nats = []
      for (let item of this.nationality) {
        if (item.abit?.length != '0') {
          nats.push({
            num: `${nats.length + 1}`,
            name: `${item.name}`,
            abits: item.abit?.length,
            abits_admission: item.abit?.filter((abit) => abit.admission_date)
              .length,
            abits_success: item.abit?.filter(
              (abit) => abit.specialty_admission != undefined,
            ).length,
          })
        }
      }
      data = { ...data, nats }
      const fileName = 'Справка (Махинов).xlsx'
      const lists = 8
      await this.exportToTemplateExcelLists({ data, fileName, lists })
    },

    async ExportEGE() {
      let items = []
      for (let item of this.fullAbits) {
        items.push({
          num: `${items.length + 1}`,
          ld: `${item.personal_file_number}`,
          group: `${item.admission_examination_group ?? ''}`,
          specialty: `${item.specialty_1 ?? ''}`,
          fio: `${item.lastName.toUpperCase()} ${item.firstName} ${item.surName ?? ''}`,
          bd: `${this.formatDate(item.birthday) ?? ''}`,
          education_category_abbreviation: `${item.education_category_abbreviation ?? ''}`,
          education_date_end: `${item.education_date_end ? moment(item.education_date_end).format('YYYY') : ''}`,
          passport: `${item.passport_series ?? ''} ${item.passport_num ?? ''}`,
          ege_math: `${item.ege_math ?? ''}`,
          ege_rus: `${item.ege_rus ?? ''}`,
          ege_phiz: `${item.ege_phiz ?? ''}`,
          ege_inf: `${item.ege_inf ?? ''}`,
          ege_geo: `${item.ege_geo ?? ''}`,
          ege_hist: `${item.ege_hist ?? ''}`,
          ege_obsh: `${item.ege_obsh ?? ''}`,
          ege_math_year: `${
            item.egeMarks?.find((ege) => ege.subject?.name == 'Математика')
              ? moment(
                  item.egeMarks?.find(
                    (ege) => ege.subject?.name == 'Математика',
                  )?.date,
                ).format('YYYY')
              : ''
          }`,
          ege_rus_year: `${
            item.egeMarks?.find((ege) => ege.subject?.name == 'Русский язык')
              ? moment(
                  item.egeMarks?.find(
                    (ege) => ege.subject?.name == 'Русский язык',
                  )?.date,
                ).format('YYYY')
              : ''
          }`,
          ege_phiz_year: `${
            item.egeMarks?.find((ege) => ege.subject?.name == 'Физика')
              ? moment(
                  item.egeMarks?.find((ege) => ege.subject?.name == 'Физика')
                    ?.date,
                ).format('YYYY')
              : ''
          }`,
          ege_inf_year: `${
            item.egeMarks?.find((ege) => ege.subject?.name == 'Информатика')
              ? moment(
                  item.egeMarks?.find(
                    (ege) => ege.subject?.name == 'Информатика',
                  )?.date,
                ).format('YYYY')
              : ''
          }`,
          ege_geo_year: `${
            item.egeMarks?.find((ege) => ege.subject?.name == 'География')
              ? moment(
                  item.egeMarks?.find((ege) => ege.subject?.name == 'География')
                    ?.date,
                ).format('YYYY')
              : ''
          }`,
          ege_hist_year: `${
            item.egeMarks?.find((ege) => ege.subject?.name == 'История')
              ? moment(
                  item.egeMarks?.find((ege) => ege.subject?.name == 'История')
                    ?.date,
                ).format('YYYY')
              : ''
          }`,
          ege_obsh_year: `${
            item.egeMarks?.find((ege) => ege.subject?.name == 'Обществознание')
              ? moment(
                  item.egeMarks?.find(
                    (ege) => ege.subject?.name == 'Обществознание',
                  )?.date,
                ).format('YYYY')
              : ''
          }`,
          expulsion: `${item.expulsion_reason ?? ''}`,
        })
      }
      const fileName = 'Талмут_ЕГЭ.xlsx'
      const data = { items: items }
      await this.exportToTemplateExcel({ data, fileName })
    },
    //уточнить в/с
    async ExportSphere() {
      let items = []
      for (let item of this.fullAbits) {
        items.push({
          num: `${items.length + 1}`,
          personal_number: `${item.personal_number ?? ''}`,
          faculty: `${item.faculty ?? ''}`,
          specialty: `${item.specialty_1 ?? ''}`,
          militaryService_rank: `${item.militaryService_rank ?? ''}`,
          militaryService_category: `${item.militaryService_category ?? ''}`,
          lastName: `${item.lastName ?? ''}`,
          firstName: `${item.firstName ?? ''}`,
          surName: `${item.surName ?? ''}`,
          birthday: `${this.formatDate(item.birthday) ?? ''}`,
          militaryService_place: `${item.militaryService_place ?? ''}`,
          militaryService_post: `${item.militaryService_post ?? ''}`,
          militaryService_unit: `${item.militaryService_unit ?? ''}`,
          militaryService_unit_address: `${item.militaryService_unit_address ?? ''}`,
          document_inn: `${item.document_inn ?? ''}`,
          nationality: `${item.nationality ?? ''}`,
          family_status: `${item.family_status ?? ''}`,
          abit_childrens: `${item.abit_childrens ?? ''}`,
          passport: `${item.passport_series} ${item.passport_num ?? ''}`,
          passport_date_issue: `${this.formatDate(item.passport_date_issue) ?? ''}`,
          passport_issued_by: `${item.passport_issued_by ?? ''}`,
          passport_department_code: `${item.passport_department_code ?? ''}`,
          passport_birthplace: `${item.passport_birthplace ?? ''}`,
          secondCitizenship: `${item.secondCitizenship ?? ''}`,
          phone_1: `${item.phone_1 ?? ''}`,
          phone_2: `${item.phone_2 ?? ''}`,
          militaryCommissariat: `${item.militaryCommissariat ?? ''}`,
          militaryCommissariat_name: `${item.militaryCommissariat_name ?? ''}`,
          militaryCommissariat_region: `${item.militaryCommissariat_region ?? ''}`,
          militaryCommissariat_region_name: `${this.regions.find((reg) => reg.region == item.militaryCommissariat_region)?.name ?? ''}`,
          militaryCommissariat_region_name_full: `${this.regions.find((reg) => reg.region == item.militaryCommissariat_region)?.name ?? ''} ${this.regions.find((reg) => reg.region == item.militaryCommissariat_region)?.status?.name ?? ''}`,
          militaryDistrict: `${item.militaryDistrict ?? ''}`,
          militaryDistrict_name: `${item.militaryDistrict_name ?? ''}`,
          family_fulled: `${item.father_fail && item.mother_fail ? 'сирота' : item.father_fail ? 'без отца' : item.mother_fail ? 'без матери' : ''}`,
          family_social_status: `${item.family_social_status ?? ''}`,
          father_kinship: `${item.father_lastName ? 'отец' : ''}`,
          mother_kinship: `${item.mother_lastName ? 'Мать' : ''}`,
          father_lastName: `${item.father_lastName ?? ''}`,
          father_lastName_second: `${item.father_lastName_second ?? ''}`,
          father_firstName: `${item.father_firstName ?? ''}`,
          father_surName: `${item.father_surName ?? ''}`,
          father_birthday: `${this.formatDate(item.father_birthday) ?? ''}`,
          father_status: `${item.father_status ?? ''}`,
          mother_lastName: `${item.mother_lastName ?? ''}`,
          mother_lastName_second: `${item.mother_lastName_second ?? ''}`,
          mother_firstName: `${item.mother_firstName ?? ''}`,
          mother_surName: `${item.mother_surName ?? ''}`,
          mother_birthday: `${this.formatDate(item.mother_birthday) ?? ''}`,
          mother_status: `${item.mother_status ?? ''}`,
          family_childrens: `${item.family_childrens ?? ''}`,
          family_address: `${item.family_address ?? ''}`,
          priorityRight: `${item.priorityRight ?? ''}`,
          document_secrets_access: `${item.document_secrets_access?.charAt(0) ?? ''}`,
          document_mvd_prosecution_adm: `${item.document_mvd_prosecution?.includes('Административная') ? 'V' : ''}`,
          document_mvd_prosecution_ygol: `${item.document_mvd_prosecution?.includes('Уголовная') ? 'V' : ''}`,
          militaryService_SVO: `${item.militaryService_SVO ?? ''}`,
          veteran: `${item.establishedQuota == 'Ветеран боевых действий' ?? ''}`,
          education_date_end: `${moment(item.education_date_end).format('YYYY') ?? ''}`,
          education_category: `${item.education_category ?? ''}`,
          education_category_abbreviation: `${item.education_category_abbreviation ?? ''}`,
          education_institute: `${item.education_institute ?? ''}`,
          education_institute_address: `${item.education_institute_address ?? ''}`,
          education_document: `${item.education_document ?? ''}`,
          expulsion_date: `${this.formatDate(item.expulsion_date) ?? ''}`,
        })
      }
      const fileName = 'Сфера.xlsx'
      const data = { items: items }
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportFaculty() {
      let items = []
      let spec = []
      for (let s of this.specialty) {
        spec.push({
          fac: `${s.faculty}`,
          specialty: `${s.abbreviation}`,
          abits: `${s.abit_MC?.length}`,
        })
      }
      spec.push({
        fac: '-',
        specialty: '-',
        abits: this.fullAbits.filter(
          (abit) => abit.specialty_military_commissariat == undefined,
        ).length,
      })
      let fac = []
      const facs = [...new Set(this.specialty.map((s) => s?.faculty))]
      facs.sort((a, b) => {
        return a - b
      })
      for (let f of facs) {
        fac.push({
          fac: `${f}`,
          abits: `${this.fullAbits.filter((abit) => abit.faculty_MC == f).length}`,
        })
        const Aitems = []
        for (let item of this.fullAbits.filter(
          (abit) =>
            this.specialty.find(
              (s) => s.abbreviation == abit.specialty_military_commissariat,
            )?.faculty == f,
        )) {
          Aitems.push({
            num: `${items.length + 1}`,
            specialty: `${item.specialty_military_commissariat ?? ''}`,
            fio: `${item.militaryService_dismissed == false ? (item.militaryService_rank ?? '') : ''} ${item.lastName.toUpperCase()} ${item.firstName} ${item.surName ?? ''}, ${this.formatDate(item.birthday) ?? ''}`,
            personal_file_number: `${item.personal_file_number ?? ''}`,
            militaryCommissariat: item.militaryService_rank
              ? `${item.militaryService_unit ?? ''}: ${item.militaryService_unit_address ?? ''}`
              : `${item.militaryCommissariat ?? ''}`,
            father_status: `${item.father_status ?? ''}`,
            mother_status: `${item.mother_status ?? ''}`,
            education: `${moment(item.education_date_end).format('YYYY') ?? ''} ${item.education_category ?? ''}`,
            note: `${item.note ?? ''}`,
            phone: `${item.phone_1 ?? ''} ${item.phone_2 ?? ''}`,
            alg: `${
              item.schoolMarks?.find((ege) => ege.subject?.name == 'Алгебра')
                ?.mark ?? ''
            }`,
            geom: `${
              item.schoolMarks?.find((ege) => ege.subject?.name == 'Геометрия')
                ?.mark ?? ''
            }`,
            math: `${
              item.schoolMarks?.find((ege) => ege.subject?.name == 'Математика')
                ?.mark ?? ''
            }`,
            phiz: `${
              item.schoolMarks?.find((ege) => ege.subject?.name == 'Физика')
                ?.mark ?? ''
            }`,
            rus: `${
              item.schoolMarks?.find(
                (ege) => ege.subject?.name == 'Русский язык',
              )?.mark ?? ''
            }`,
            inf: `${
              item.schoolMarks?.find(
                (ege) => ege.subject?.name == 'Информатика',
              )?.mark ?? ''
            }`,
            geo: `${
              item.schoolMarks?.find((ege) => ege.subject?.name == 'География')
                ?.mark ?? ''
            }`,
            obsh: `${
              item.schoolMarks?.find(
                (ege) => ege.subject?.name == 'Обществознание',
              )?.mark ?? ''
            }`,
            hist: `${
              item.schoolMarks?.find((ege) => ege.subject?.name == 'История')
                ?.mark ?? ''
            }`,
            sport: `${
              item.schoolMarks?.find(
                (ege) => ege.subject?.name == 'Физкультура',
              )?.mark ?? ''
            }`,
          })
        }
        items.push(Aitems)
      }
      fac.push({
        fac: '-',
        abits: this.fullAbits.filter(
          (abit) => abit.specialty_military_commissariat == undefined,
        ).length,
      })
      const Aitems = []
      for (let item of this.fullAbits.filter(
        (abit) =>
          this.specialty.find(
            (s) => s.abbreviation == abit.specialty_military_commissariat,
          )?.faculty == undefined,
      )) {
        Aitems.push({
          num: `${items.length + 1}`,
          specialty: `${item.specialty_military_commissariat ?? ''}`,
          fio: `${item.militaryService_dismissed == false ? (item.militaryService_rank ?? '') : ''} ${item.lastName.toUpperCase()} ${item.firstName} ${item.surName ?? ''}, ${this.formatDate(item.birthday) ?? ''}`,
          personal_file_number: `${item.personal_file_number ?? ''}`,
          militaryCommissariat: item.militaryService_rank
            ? `${item.militaryService_unit ?? ''}: ${item.militaryService_unit_address ?? ''}`
            : `${item.militaryCommissariat ?? ''}`,
          father_status: `${item.father_status ?? ''}`,
          mother_status: `${item.mother_status ?? ''}`,
          education: `${moment(item.education_date_end).format('YYYY') ?? ''} ${item.education_category ?? ''}`,
          note: `${item.note ?? ''}`,
          phone: `${item.phone_1 ?? ''} ${item.phone_2 ?? ''}`,
          alg: `${
            item.schoolMarks?.find((ege) => ege.subject?.name == 'Алгебра')
              ?.mark ?? ''
          }`,
          geom: `${
            item.schoolMarks?.find((ege) => ege.subject?.name == 'Геометрия')
              ?.mark ?? ''
          }`,
          math: `${
            item.schoolMarks?.find((ege) => ege.subject?.name == 'Математика')
              ?.mark ?? ''
          }`,
          phiz: `${
            item.schoolMarks?.find((ege) => ege.subject?.name == 'Физика')
              ?.mark ?? ''
          }`,
          rus: `${
            item.schoolMarks?.find((ege) => ege.subject?.name == 'Русский язык')
              ?.mark ?? ''
          }`,
          inf: `${
            item.schoolMarks?.find((ege) => ege.subject?.name == 'Информатика')
              ?.mark ?? ''
          }`,
          geo: `${
            item.schoolMarks?.find((ege) => ege.subject?.name == 'География')
              ?.mark ?? ''
          }`,
          obsh: `${
            item.schoolMarks?.find(
              (ege) => ege.subject?.name == 'Обществознание',
            )?.mark ?? ''
          }`,
          hist: `${
            item.schoolMarks?.find((ege) => ege.subject?.name == 'История')
              ?.mark ?? ''
          }`,
          sport: `${
            item.schoolMarks?.find((ege) => ege.subject?.name == 'Физкультура')
              ?.mark ?? ''
          }`,
        })
      }
      items.push(Aitems)
      const fileName = 'Факультетам.xlsx'
      const lists = 15
      const data = { fac: fac, spec: spec, items: items }
      await this.exportToTemplateExcelLists({ data, fileName, lists })
    },
    async ExportFacultyFinish() {
      let items = []
      let spec = []
      for (let s of this.specialty) {
        spec.push({
          fac: `${s.faculty}`,
          specialty: `${s.abbreviation}`,
          abits: `${s.abit?.length}`,
        })
      }
      let fac = []
      const facs = [...new Set(this.specialty.map((s) => s?.faculty))]
      facs.sort((a, b) => {
        return a - b
      })
      for (let f of facs) {
        fac.push({
          fac: `${f}`,
          abits: `${this.fullAbits.filter((abit) => abit.faculty == f).length}`,
        })
        const Aitems = []
        for (let item of this.fullAbits.filter((abit) => abit.faculty == f)) {
          Aitems.push({
            num: `${items.length + 1}`,
            specialty: `${item.specialty_1 ?? ''}`,
            fio: `${item.militaryService_dismissed == false ? (item.militaryService_rank ?? '') : ''} ${item.lastName.toUpperCase()} ${item.firstName} ${item.surName ?? ''}, ${this.formatDate(item.birthday) ?? ''}`,
            personal_file_number: `${item.personal_file_number ?? ''}`,
            militaryCommissariat: item.militaryService_rank
              ? `${item.militaryService_unit ?? ''}: ${item.militaryService_unit_address ?? ''}`
              : `${item.militaryCommissariat ?? ''}`,
            father_status: `${item.father_status ?? ''}`,
            mother_status: `${item.mother_status ?? ''}`,
            education: `${moment(item.education_date_end).format('YYYY') ?? ''} ${item.education_category ?? ''}`,
            note: `${item.note ?? ''}`,
            phone: `${item.phone_1 ?? ''} ${item.phone_2 ?? ''}`,
            math: `${Math.max(item.ege_math ?? 0, item.entrance_math ?? 0)}`,
            rus: `${Math.max(item.ege_rus ?? 0, item.entrance_rus ?? 0)}`,
            phiz: `${Math.max(item.ege_phiz ?? 0, item.entrance_phiz ?? 0)}`,
            inf: `${Math.max(item.ege_inf ?? 0, item.entrance_inf ?? 0)}`,
            geo: `${Math.max(item.ege_geo ?? 0, item.entrance_geo ?? 0)}`,
            obsh: `${Math.max(item.ege_obsh ?? 0, item.entrance_obsh ?? 0)}`,
            hist: `${Math.max(item.ege_hist ?? 0, item.entrance_hist ?? 0)}`,
            sport: `${item.sport_score ?? ''}`,
            rating: `${item.rating ?? ''}`,
            atestat:
              item.schoolMarks.length > 0
                ? `${item.schoolMarks?.map((SM) => SM?.mark)?.reduce((acc, val) => acc + val) / item.schoolMarks?.length}`
                : '',
          })
        }
        items.push(Aitems)
      }
      const fileName = 'Факультетам_финиш.xlsx'
      const lists = 14
      const data = { fac: fac, spec: spec, items: items }
      await this.exportToTemplateExcelLists({ data, fileName, lists })
    },

    async ExportRatingGUK() {
      let items = {}
      let abits = []
      for (let s of this.specialty) {
        for (let item of this.fullAbits.filter(
          (abit) => abit.specialty_1 == s.abbreviation,
        )) {
          abits.push({
            specialty: `${item.specialty_1 ?? ''}`,
            fio: `${item.lastName} ${item.firstName} ${item.surName ?? ''}`,
            birthday: `${moment(item.birthday).format('DD.MM.YYYY')}`,
            sport_score: `${item.sport_score ?? ''}`,
            qualificationExam_mark: `${item.qualificationExam_mark ?? ''}`,
            personal_achievements_score: `${item.personal_achievements_score ?? ''}`,
            sign: `${item.sign ?? ''}`,
            priorityRight_test: `${item.priorityRight_test ? 'V' : ''}`,
            separateQuota_test: `${item.separateQuota_test ? 'V' : ''}`,
            establishedQuota_test: `${item.establishedQuota_test ? 'V' : ''}`,
            militaryCommissariat: `${item.militaryCommissariat ?? ''}`,
            district: `${item.militaryDistrict ?? ''}`,
            education: `${item.education_category_abbreviation ?? ''}`,
            subject_1: `${Math.max(item.egeMarks.find((ege) => ege.subject == item.specialty?.egeSubject_1)?.mark ?? 0, item.entranceTest.find((ege) => ege.subject == item.specialty?.egeSubject_1)?.mark ?? 0)}`,
            subject_2: `${Math.max(item.ege_rus ?? 0, item.entrance_rus ?? 0)}`,
            subject_3: `${Math.max(Math.max(item.egeMarks.find((ege) => ege.subject == item.specialty.egeSubject_2)?.mark ?? 0, item.entranceTest.find((ege) => ege.subject == item.specialty.egeSubject_2)?.mark ?? 0), Math.max(item.egeMarks.find((ege) => ege.subject == item.specialty.egeSubject_3)?.mark ?? 0, item.entranceTest.find((ege) => ege.subject == item.specialty.egeSubject_3)?.mark ?? 0), Math.max(item.egeMarks.find((ege) => ege.subject == item.specialty.egeSubject_4)?.mark ?? 0, item.entranceTest.find((ege) => ege.subject == item.specialty.egeSubject_4)?.mark ?? 0))}`,
            decision: `${item.sign == 'Кадет' ? 'Рекомендовать к зачислению на учебные места для СВУ' : item.establishedQuota_test ? 'Рекомендовать к зачислению в пределах установленной квоты' : item.separateQuota_test ? 'Рекомендовать к зачислению в пределах отдельной квоты' : 'Рекомендовать к зачислению'}`,
          })
        }
        abits.sort((a, b) => {
          if (a.specialty != b.specialty) {
            return b.rating - a.rating
          }
          if (a.sign == 'Кадет' && b.sign != 'Кадет') {
            return -10000
          }
          if (b.sign == 'Кадет' && a.sign != 'Кадет') {
            return 10000
          }
          if (a.separateQuota_test && !b.separateQuota_test) {
            return -1000
          }
          if (!a.separateQuota_test && b.separateQuota_test) {
            return 1000
          }
          if (a.establishedQuota_test && !b.establishedQuota_test) {
            return -100
          }
          if (!a.establishedQuota_test && b.establishedQuota_test) {
            return 100
          }
          if (a.qualificationExam_mark > 3 && b.qualificationExam_mark == 3) {
            return -10
          }
          if (a.qualificationExam_mark == 3 && b.qualificationExam_mark > 3) {
            return 10
          }
          if (
            a.priorityRight_test &&
            !b.priorityRight_test &&
            a.rating == b.rating
          ) {
            return -1
          }
          if (
            b.priorityRight_test &&
            !a.priorityRight_test &&
            a.rating == b.rating
          ) {
            return 1
          }
          return b.rating - a.rating
        })
        abits = abits.map((abit) => ({
          ...abit,
          num: `${abits.indexOf(abit) + 1}`,
        }))
        items[s.abbreviation] = abits
        abits = []
      }
      const fileName = 'ВУНЦ=КОНКУРС.xlsx'
      const data = items
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportExpulsionGUK() {
      let items = []
      for (let item of this.fullAbits.filter((abit) => abit.expulsion_reason)) {
        items.push({
          num: `${items.length + 1}`,
          fio: `${item.lastName} ${item.firstName} ${item.surName ?? ''}`,
          birthday: `${moment(item.birthday).format('DD.MM.YYYY')}`,
          expulsion: `${item.expulsion_reason == 'КЭ' ? 'по результатам ППО' : item.expulsion_reason == 'нежел.' ? 'по нежеланию учиться' : item.expulsion_reason == 'КЭ' ? 'по результатам ППО' : item.expulsion_reason == 'сост. здоровья' ? 'по состоянию здоровья' : item.expulsion_reason == 'ФП' ? 'по физической подготовленности' : item.expulsion_reason == 'дисц.' ? 'по недисциплинированности' : item.expulsion_reason.includes('ЕГЭ') ? 'по результатм ЕГЭ' : item.expulsion_reason.includes('ТФ') ? 'по дисциплинам вступительных экзаменов' : 'по другим причинам'}`,
          sport_score: `${item.sport_score ?? ''}`,
          qualificationExam_mark: `${item.qualificationExam_mark == 5 ? 'I' : item.qualificationExam_mark == 4 ? 'II' : item.qualificationExam_mark == 3 ? 'III' : item.qualificationExam_mark == 2 ? 'IV' : ''}`,
          personal_achievements_score: `${item.personal_achievements_score ?? ''}`,
          militaryCommissariat: `${item.militaryService_rank && item.militaryService_dismissed == false ? (item.militaryService_unit ?? '') : (item.militaryCommissariat ?? '')}`,
          militaryDistrict: `${item.militaryService_rank && item.militaryService_dismissed == false ? (item.militaryService_place ?? '') : (item.militaryDistrict ?? '')}`,
          education: `${item.education_institute ?? ''} (${item.education_category_level ?? ''}, ${item.education_date_end ? moment(item.education_date_end).format('DD.MM.YYYY') : ''})`,
          quota: `${item.establishedQuota_test ? item.establishedQuota_text : item.separateQuota_test ? item.separateQuota_text : item.priorityRight_test ? item.priorityRight_text : ''}`,
          subject_1: `${
            Math.max(
              item.egeMarks.find(
                (ege) => ege.subject?.name == item.specialty?.egeSubject_1,
              )?.mark ?? 0,
              item.entranceTest.find(
                (ege) => ege.subject?.name == item.specialty?.egeSubject_1,
              )?.mark ?? 0,
            ) != 0
              ? Math.max(
                  item.egeMarks.find(
                    (ege) => ege.subject?.name == item.specialty?.egeSubject_1,
                  )?.mark ?? 0,
                  item.entranceTest.find(
                    (ege) => ege.subject?.name == item.specialty?.egeSubject_1,
                  )?.mark ?? 0,
                )
              : ''
          }`,
          subject_2: `${Math.max(item.ege_rus ?? 0, item.entrance_rus ?? 0) != 0 ? Math.max(item.ege_rus ?? 0, item.entrance_rus ?? 0) : ''}`,
          subject_3: `${
            Math.max(
              item.egeMarks.find(
                (ege) => ege.subject?.name == item.specialty?.egeSubject_2,
              )?.mark ?? 0,
              item.entranceTest.find(
                (ege) => ege.subject?.name == item.specialty?.egeSubject_2,
              )?.mark ?? 0,
            ) != 0
              ? Math.max(
                  item.egeMarks.find(
                    (ege) => ege.subject?.name == item.specialty?.egeSubject_2,
                  )?.mark ?? 0,
                  item.entranceTest.find(
                    (ege) => ege.subject?.name == item.specialty?.egeSubject_2,
                  )?.mark ?? 0,
                )
              : ''
          }`,
          subject_4: `${
            Math.max(
              item.egeMarks.find(
                (ege) => ege.subject?.name == item.specialty?.egeSubject_3,
              )?.mark ?? 0,
              item.entranceTest.find(
                (ege) => ege.subject?.name == item.specialty?.egeSubject_3,
              )?.mark ?? 0,
            ) != 0
              ? Math.max(
                  item.egeMarks.find(
                    (ege) => ege.subject?.name == item.specialty?.egeSubject_3,
                  )?.mark ?? 0,
                  item.entranceTest.find(
                    (ege) => ege.subject?.name == item.specialty?.egeSubject_3,
                  )?.mark ?? 0,
                )
              : ''
          }`,
          subject_5: `${
            Math.max(
              item.egeMarks.find(
                (ege) => ege.subject?.name == item.specialty?.egeSubject_4,
              )?.mark ?? 0,
              item.entranceTest.find(
                (ege) => ege.subject?.name == item.specialty?.egeSubject_4,
              )?.mark ?? 0,
            ) != 0
              ? Math.max(
                  item.egeMarks.find(
                    (ege) => ege.subject?.name == item.specialty?.egeSubject_4,
                  )?.mark ?? 0,
                  item.entranceTest.find(
                    (ege) => ege.subject?.name == item.specialty?.egeSubject_4,
                  )?.mark ?? 0,
                )
              : ''
          }`,
        })
      }
      const fileName = 'ВУНЦ=ОТКАЗАНО.xlsx'
      const data = { items: items }
      await this.exportToTemplateExcel({ data, fileName })
    },
    async Export33GUK() {
      let test = this.fullAbits.length
      moment.locale('ru')
      let data = {}
      data.date = moment().format('DD MMMM YYYY [г.]')
      data.military_contract = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_category == 'Контракт',
      ).length
      data.military_conscription = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank &&
          abit.militaryService_dismissed == false &&
          abit.militaryService_category == 'По призыву',
      ).length
      data.military_end = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank && abit.militaryService_dismissed == true,
      ).length
      data.military_not = this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank == null &&
          abit.cossack_society == undefined &&
          abit.education_category_abbreviation != 'ОШИ с ПЛП' &&
          abit.sign != 'Кадет' &&
          !abit.personal_achievements
            .map((ach) => ach.achievement?.name)
            .includes('Юнармеец'),
      ).length
      data.PLP = this.fullAbits.filter(
        (abit) =>
          abit.education_category_abbreviation == 'ОШИ с ПЛП' &&
          abit.militaryService_rank == null,
      ).length
      data.yongArmy = this.fullAbits.filter(
        (abit) =>
          abit.personal_achievements
            .map((ach) => ach.achievement?.name)
            .includes('Юнармеец') &&
          abit.education_category_abbreviation != 'ОШИ с ПЛП' &&
          abit.sign != 'Кадет' &&
          abit.militaryService_rank == null,
      ).length
      data.cossack_society = this.fullAbits.filter(
        (abit) =>
          abit.cossack_society != undefined &&
          !abit.personal_achievements
            .map((ach) => ach.achievement?.name)
            .includes('Юнармеец') &&
          abit.education_category_abbreviation != 'ОШИ с ПЛП' &&
          abit.sign != 'Кадет' &&
          abit.militaryService_rank == null,
      ).length
      const Suvorovtsy = this.fullAbits.filter(
        (abit) => abit.militaryService_rank == null && abit.sign == 'Кадет',
      )
      test -=
        data.PLP +
        data.cossack_society +
        data.military_conscription +
        data.military_contract +
        data.military_end +
        data.military_not +
        data.yongArmy
      for (let i = 1; i <= 34; i += 1) {
        data[`suvorov_${i}`] = Suvorovtsy.filter(
          (abit) => abit.education_institute_id == i,
        ).length
        test -= data[`suvorov_${i}`]
      }
      if (test != 0) {
        data.military_not += test
      }

      const fileName = '33ГУК.xlsx'
      await this.exportToTemplateExcel({ data, fileName })
    },
    async Export29GUK() {
      let items = []
      let items_mil = []
      for (let item of this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank == null ||
          (abit.militaryService_rank && abit.militaryService_dismissed == true),
      )) {
        items.push({
          num: `${items.length + 1}`,
          personal_number: `${item.personal_number ?? ''}`,
          militaryService_rank: `${item.militaryService_rank ?? ''}`,
          lastName: `${item.lastName ?? ''}`,
          firstName: `${item.firstName ?? ''}`,
          surName: `${item.surName ?? ''}`,
          birthday: `${this.formatDate(item.birthday) ?? ''}`,
          gender: `${'муж.'}`,
          VUZ: `${'ВУНЦ ВВС "ВВА"(Воронеж)'}`,
          status: `${item.establishedQuota_test ? item.establishedQuota?.text : item.separateQuota_test ? item.separateQuota?.text : ''}`,
          suvorov: `${item.sign == 'Кадет' ? item.education_institute : ''}`,
          militaryDistrict: `${item.militaryDistrict ?? ''}`,
          residence_region: `${item.residence_region ?? ''}`,
          militaryCommissariat: `${item.militaryCommissariat ?? ''}`,
          call_number: `${item.call_number ?? ''}`,
          call_date: `${this.formatDate(item.call_date) ?? ''}`,
          call_result: `${item.call_result ?? ''}`,
          call_note: `${item.call_note ?? ''}`,
          personal_file_reg: `${item.personal_file_reg ?? ''}`,
          personal_file_date_reg: `${this.formatDate(item.personal_file_date_reg) ?? ''}`,
        })
      }
      for (let item of this.fullAbits.filter(
        (abit) =>
          abit.militaryService_rank != null &&
          abit.militaryService_dismissed == false,
      )) {
        items_mil.push({
          num: `${items_mil.length + 1}`,
          personal_number: `${item.personal_number ?? ''}`,
          militaryService_rank: `${item.militaryService_rank ?? ''}`,
          lastName: `${item.lastName ?? ''}`,
          firstName: `${item.firstName ?? ''}`,
          surName: `${item.surName ?? ''}`,
          birthday: `${this.formatDate(item.birthday) ?? ''}`,
          gender: `${'муж.'}`,
          VUZ: `${'ВУНЦ ВВС "ВВА"(Воронеж)'}`,
          status: `${item.establishedQuota_test ? item.establishedQuota?.text : item.separateQuota_test ? item.separateQuota?.text : ''}`,
          suvorov: `${''}`,
          militaryDistrict: `${item.militaryService_place ?? ''}`,
          residence_region: `${item.militaryService_unit ?? ''}`,
          militaryCommissariat: `${item.militaryService_category ?? ''}`,
          call_number: `${item.call_number ?? ''}`,
          call_date: `${this.formatDate(item.call_date) ?? ''}`,
          call_result: `${item.call_result ?? ''}`,
          call_note: `${item.call_note ?? ''}`,
          personal_file_reg: `${item.personal_file_reg ?? ''}`,
          personal_file_date_reg: `${this.formatDate(item.personal_file_date_reg) ?? ''}`,
        })
      }
      const fileName = '29ГУК.xlsx'
      const data = { items: items, items_mil: items_mil }
      const lists = 2
      await this.exportToTemplateExcelLists({ data, fileName, lists })
    },
    async ExportBase() {
      let items = []
      for (let item of this.fullAbits) {
        items.push({
          num: `${items.length + 1}`,
          specialty: `${item.specialty?.name ?? ''}`,
          access: `${'есть'}`,
          PO: `${item.sign == 'Выездная группа' ? 'ВГ' : item.admission_date ? 'ВУЗ' : 'не прибыл'}`,
          gender: `муж.`,
          category: `${item.militaryService_rank ? (item.militaryService_dismissed ? 'прошедший ВС' : item.militaryService_mobilization ? 'в/с по мобилизации' : item.militaryService_category == 'Контракт' ? 'в/с по контракту' : 'в/с по призыву') : 'не проходивший ВС'}`,
          rank: `${item.militaryService_rank ?? ''} ${item.militaryService_rank ? (item.militaryService_dismissed ? ' запаса' : '') : ''}`,
          personal_number: `${item.personal_number ?? ''}`,
          lastName: `${item.lastName ?? ''}`,
          firstName: `${item.firstName ?? ''}`,
          surName: `${item.surName ?? ''}`,
          birthday: `${this.formatDate(item.birthday)}`,
          selection: `${item.militaryService_rank && item.militaryService_dismissed == false ? (item.militaryService_place == 'ФСБ' || item.militaryService_place == 'ФСО' || item.militaryService_place == 'ФС ВНГ' || item.militaryService_place == 'МЧС' ? 'ФОИВ' : 'ОВУ') : 'ВК'}`,
          OSK: `${item.militaryService_rank && item.militaryService_dismissed == false ? item.militaryService_place : item.militaryDistrict}`,
          MC_region: `${item.militaryService_rank && item.militaryService_dismissed == false ? '' : (item.militaryCommissariat_region_name ?? '')}`,
          MC: `${item.militaryService_rank && item.militaryService_dismissed == false ? item.militaryService_unit : item.militaryCommissariat_name}`,
          education_level: `${item.education_category_level == 'СПО' ? 'СПО' : 'среднее'}`,
          education_ved: `${item.sign == 'Кадет' ? 'МО_РФ' : 'Минпросвещения'}`,
          education_type: `${item.education_category_abbreviation ?? ''}`,
          education_name: `${item.sign == 'Кадет' ? item.education_institute_abbreviation : (item.education_institute ?? '')}`,
          education_year: `${item.education_date_end ? moment(item.education_date_end).format('YYYY') : ''}`,
          education_ball:
            item.schoolMarks.length > 1
              ? `${item.schoolMarks?.map((SM) => SM?.mark)?.reduce((acc, val) => acc + val) / item.schoolMarks?.length}`
              : '',
          education_excellent: `${
            item.personal_achievements
              .map((ach) => ach.achievement?.name)
              ?.includes('Аттестат (золотая медаль)')
              ? 'золотая медаль'
              : item.personal_achievements
                    .map((ach) => ach.achievement?.name)
                    .includes('Аттестат (серебряная медаль)')
                ? 'серебренная медаль'
                : item.personal_achievements
                      .map((ach) => ach.achievement?.name)
                      .includes('Аттестат с отличием')
                  ? 'диплом с отличием'
                  : ''
          }`,
          family_fulled: `${item.mother_fail == true || item.father_fail || item.establishedQuota == 'Сирота' ? 'неполная' : 'полная'}`,
          family_social_status: `${item.family_social_status ?? ''}`,
          establishedQuota: `${item.establishedQuota ?? ''}`,
          establishedQuota_select:
            item.establishedQuota != undefined && item.separateQuota_test
              ? `${item.establishedQuota_code}`
              : '',
          separateQuota: `${item.separateQuota_text ?? ''}`,
          separateQuota_select:
            item.separateQuota != undefined
              ? `${item.establishedQuota_code}`
              : '',
          participation: `${item.sign == 'Кадет' ? 'на учебные места для СВУ' : item.separateQuota_test ? 'на места в пределах отдельной квоты' : item.establishedQuota_test ? 'на места в пределах установленной квоты' : item.expulsion_reason == 'нежел.' ? 'отказался' : 'на общих основаниях'}`,
          priorityRight: `${priorityRight_test ? (item.priorityRight_text ?? '') : ''}`,
          nationality: `${item.nationality ?? ''}`,
          add_training: `${
            item.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('Юнармеец')
              ? 'юнармеец'
              : item.cossack_society != undefined
                ? 'казак'
                : item.education_category_abbreviation == 'ОШИ с ПЛП'
                  ? 'ОШИ с ПЛП'
                  : ''
          }`,
          sport_achievement: `${
            item.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('МС (олимпийский/ВП вид спорта)') ||
            item.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('МС (прочие виды спорта)')
              ? 'МС'
              : item.personal_achievements
                    .map((ach) => ach.achievement?.name)
                    .includes('КМС (олимпийский/ВП вид спорта)') ||
                  item.personal_achievements
                    .map((ach) => ach.achievement?.name)
                    .includes('КМС (прочие виды спорта)')
                ? 'КМС'
                : item.personal_achievements
                      .map((ach) => ach.achievement?.name)
                      .includes('1 разряд (олимпийский/ВП вид спорта)')
                  ? '1 разряд'
                  : ''
          }`,
          GTO: `${
            item.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('ГТО (золотой знак)')
              ? 'есть'
              : 'нет'
          }`,
          med: `ГОДЕН`,
          qualificationExam_mark: `${item.qualificationExam_mark == 5 ? 'I' : item.qualificationExam_mark == 4 ? 'II' : item.qualificationExam_mark == 3 ? 'III' : item.qualificationExam_mark == 2 ? 'IV' : ''}`,
          rus:
            Math.max(item.ege_rus ?? 0, item.entrance_rus ?? 0) != 0
              ? Math.max(item.ege_rus ?? 0, item.entrance_rus ?? 0)
              : '',
          math:
            Math.max(item.ege_math ?? 0, item.entrance_math ?? 0) != 0
              ? Math.max(item.ege_math ?? 0, item.entrance_math ?? 0)
              : '',
          phiz:
            Math.max(item.ege_phiz ?? 0, item.entrance_phiz ?? 0) != 0
              ? Math.max(item.ege_phiz ?? 0, item.entrance_phiz ?? 0)
              : '',
          inf:
            Math.max(item.ege_inf ?? 0, item.entrance_inf ?? 0) != 0
              ? Math.max(item.ege_inf ?? 0, item.entrance_inf ?? 0)
              : '',
          geo:
            Math.max(item.ege_geo ?? 0, item.entrance_geo ?? 0) != 0
              ? Math.max(item.ege_geo ?? 0, item.entrance_geo ?? 0)
              : '',
          hist:
            Math.max(item.ege_hist ?? 0, item.entrance_hist ?? 0) != 0
              ? Math.max(item.ege_hist ?? 0, item.entrance_hist ?? 0)
              : '',
          obsh:
            Math.max(item.ege_obsh ?? 0, item.entrance_obsh ?? 0) != 0
              ? Math.max(item.ege_obsh ?? 0, item.entrance_obsh ?? 0)
              : '',
          sport_score: `${item.sport_score ?? ''}`,
          personal_achievements_score: `${item.personal_achievements_score ?? ''}`,
          decision: `${item.expulsion_reason != undefined ? (item.expulsion_reason == 'нежел.' ? 'Отказать по нежеланию учиться' : item.expulsion_reason == 'КЭ' ? 'Отказать по ППО' : item.expulsion_reason == 'сост. здоровья' ? 'Отказать по ВВК' : item.expulsion_reason == 'ФП' ? 'Отказать по ФП' : item.expulsion_reason == 'конкурс' ? 'Отказать по конкурсу' : item.expulsion_reason == 'дисц.' ? 'Отказать по недисциплинированности' : item.expulsion_reason == 'убыл в другой ВВУЗ' ? 'Переориентирован в другой вуз' : item.expulsion_reason.includes('(') ? 'Отказать по вступительным экзаменам (ЕГЭ)' : 'Отказать по другим причинам') : item.sign == 'Кадет' ? 'Рекомендовать к зачислению на учебные места для СВУ' : item.establishedQuota ? 'Рекомендовать к зачислению в пределах установленной квоты' : item.separateQuota ? 'Рекомендовать к зачислению в пределах отдельной квоты' : 'Рекомендовать к зачислению'}`,
        })
      }
      const fileName = 'ВУНЦ=П1_База-24.xlsx'
      const data = { items: items }
      const lists = 5
      await this.exportToTemplateExcelLists({ data, fileName, lists })
    },
    async ExportOVY() {
      let data = {}
      for (let i of this.militaryPlaces) {
        data[`mil_place_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryDistrict == i.abbreviation &&
            abit.militaryService_rank == null,
        ).length
        data[`mil_place_admission_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.admission_date &&
            abit.militaryDistrict == i.abbreviation &&
            abit.militaryService_rank == null,
        ).length
        data[`mil_place_expulsion_notWish_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.militaryService_place == i.abbreviation &&
              abit.expulsion_reason == 'нежел.',
          ).length
        data[`mil_place_expulsion_stupid_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason?.includes('(') &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_place_expulsion_notSport_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'ФП' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_place_expulsion_notPPO_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'КЭ' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_place_expulsion_notHealth_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'сост. здоровья' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_place_expulsion_notDisc_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'дисц.' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_place_expulsion_other_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason != null &&
              abit.expulsion_reason != 'дисц.' &&
              abit.expulsion_reason != 'нежел.' &&
              abit.expulsion_reason != 'КЭ' &&
              abit.expulsion_reason != 'ФП' &&
              !abit.expulsion_reason?.includes('(') &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_place_notExpulsion_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.admission_date &&
              abit.expulsion_reason == null &&
              abit.militaryDistrict == i.abbreviation &&
              abit.militaryService_rank == null,
          ).length
        data[`mil_place_success_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_admission != undefined &&
            abit.militaryDistrict == i.abbreviation &&
            abit.militaryService_rank == null,
        ).length
        data[`mil_place_military_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false,
        ).length
        data[`mil_place_military_admission_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.admission_date != undefined &&
              abit.militaryService_place == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false,
          ).length
        data[`mil_place_military_notExpulsion_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.admission_date &&
              abit.expulsion_reason == null &&
              abit.militaryService_place == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false,
          ).length
        data[`mil_place_military_success_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.specialty_admission != undefined &&
              abit.militaryService_place == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false,
          ).length
        data[`mil_place_dismissed_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryDistrict == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == true,
        ).length
        data[`mil_place_dismissed_admission_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.admission_date &&
              abit.militaryDistrict == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == true,
          ).length
        data[`mil_place_dismissed_notExpulsion_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.admission_date &&
              abit.expulsion_reason == null &&
              abit.militaryDistrict == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == true,
          ).length
        data[`mil_place_dismissed_success_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.specialty_admission != undefined &&
              abit.militaryDistrict == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == true,
          ).length
      }
      const fileName = 'ВУНЦ=П2_ОВУ-24.xlsx'
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportSpec() {
      let data = {}
      for (let i of this.specialty) {
        data[`spec_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_1 == i.abbreviation &&
            abit.militaryService_rank == null,
        ).length
        data[`spec_military_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_1 == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false,
        ).length
        data[`spec_dismissed_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_1 == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == true,
        ).length
        data[`spec_admission_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) => abit.admission_date && abit.specialty_1 == i.abbreviation,
        ).length
        data[`spec_expulsion_notWish_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.specialty_1 == i.abbreviation &&
              abit.expulsion_reason == 'нежел.',
          ).length
        data[`spec_expulsion_stupid_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason?.includes('(') &&
            abit.specialty_1 == i.abbreviation,
        ).length
        data[`spec_expulsion_notSport_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'ФП' &&
              abit.specialty_1 == i.abbreviation,
          ).length
        data[`spec_expulsion_notPPO_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason == 'КЭ' && abit.specialty_1 == i.abbreviation,
        ).length
        data[`spec_expulsion_notHealth_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'сост. здоровья' &&
              abit.specialty_1 == i.abbreviation,
          ).length
        data[`spec_expulsion_notDisc_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'дисц.' &&
              abit.specialty_1 == i.abbreviation,
          ).length
        data[`spec_expulsion_other_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason != null &&
            abit.expulsion_reason != 'дисц.' &&
            abit.expulsion_reason != 'нежел.' &&
            abit.expulsion_reason != 'КЭ' &&
            abit.expulsion_reason != 'ФП' &&
            !abit.expulsion_reason?.includes('(') &&
            abit.specialty_1 == i.abbreviation,
        ).length
        data[`spec_success_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_admission != undefined &&
            abit.specialty_1 == i.abbreviation &&
            abit.militaryService_rank == null,
        ).length
        data[`spec_military_success_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_admission != undefined &&
            abit.specialty_1 == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false,
        ).length
        data[`spec_dismissed_success_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.specialty_admission != undefined &&
              abit.specialty_1 == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == true,
          ).length
      }
      const fileName = 'ВУНЦ=П3_ВСП-24.xlsx'
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportSVY() {
      let data = {}
      const Suvorovtsy = this.fullAbits.filter((abit) => abit.sign == 'Кадет')
      for (let i of this.specialty) {
        for (let s = 1; s <= 34; s += 1) {
          data[`spec_${i.abbreviation}_${s}`] = Suvorovtsy.filter(
            (abit) =>
              abit.specialty_1 == i.abbreviation &&
              abit.education_institute_id == s,
          ).length
          data[`spec_success_${i.abbreviation}_${s}`] = Suvorovtsy.filter(
            (abit) =>
              abit.specialty_admission != undefined &&
              abit.specialty_1 == i.abbreviation &&
              abit.education_institute_id == s,
          ).length
        }
        data[`spec_admission_${i.abbreviation}`] = Suvorovtsy.filter(
          (abit) => abit.admission_date && abit.specialty_1 == i.abbreviation,
        ).length
        data[`spec_expulsion_notWish_${i.abbreviation}`] = Suvorovtsy.filter(
          (abit) =>
            abit.specialty_1 == i.abbreviation &&
            abit.expulsion_reason == 'нежел.',
        ).length
        data[`spec_expulsion_stupid_${i.abbreviation}`] = Suvorovtsy.filter(
          (abit) =>
            abit.expulsion_reason?.includes('(') &&
            abit.specialty_1 == i.abbreviation,
        ).length
        data[`spec_expulsion_notSport_${i.abbreviation}`] = Suvorovtsy.filter(
          (abit) =>
            abit.expulsion_reason == 'ФП' && abit.specialty_1 == i.abbreviation,
        ).length
        data[`spec_expulsion_notPPO_${i.abbreviation}`] = Suvorovtsy.filter(
          (abit) =>
            abit.expulsion_reason == 'КЭ' && abit.specialty_1 == i.abbreviation,
        ).length
        data[`spec_expulsion_notHealth_${i.abbreviation}`] = Suvorovtsy.filter(
          (abit) =>
            abit.expulsion_reason == 'сост. здоровья' &&
            abit.specialty_1 == i.abbreviation,
        ).length
        data[`spec_expulsion_notDisc_${i.abbreviation}`] = Suvorovtsy.filter(
          (abit) =>
            abit.expulsion_reason == 'дисц.' &&
            abit.specialty_1 == i.abbreviation,
        ).length
        data[`spec_expulsion_other_${i.abbreviation}`] = Suvorovtsy.filter(
          (abit) =>
            abit.expulsion_reason != null &&
            abit.expulsion_reason != 'дисц.' &&
            abit.expulsion_reason != 'нежел.' &&
            abit.expulsion_reason != 'КЭ' &&
            abit.expulsion_reason != 'ФП' &&
            !abit.expulsion_reason?.includes('(') &&
            abit.specialty_1 == i.abbreviation,
        ).length
      }
      const fileName = 'ВУНЦ=П4_СВУ-24.xlsx'
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportCossack() {
      let data = {}
      for (let i of this.cossack_society) {
        data[`cossack_${i.name}`] = this.fullAbits.filter(
          (abit) =>
            abit.cossack_society == i.name && abit.militaryService_rank == null,
        ).length
        data[`cossack_military_${i.name}`] = this.fullAbits.filter(
          (abit) =>
            abit.cossack_society == i.name &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false,
        ).length
        data[`cossack_admission_${i.name}`] = this.fullAbits.filter(
          (abit) => abit.admission_date && abit.cossack_society == i.name,
        ).length
        data[`cossack_expulsion_notWish_${i.name}`] = this.fullAbits.filter(
          (abit) =>
            abit.cossack_society == i.name && abit.expulsion_reason == 'нежел.',
        ).length
        data[`cossack_expulsion_stupid_${i.name}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason?.includes('(') &&
            abit.cossack_society == i.name,
        ).length
        data[`cossack_expulsion_notSport_${i.name}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason == 'ФП' && abit.cossack_society == i.name,
        ).length
        data[`cossack_expulsion_notPPO_${i.name}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason == 'КЭ' && abit.cossack_society == i.name,
        ).length
        data[`cossack_expulsion_notHealth_${i.name}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason == 'сост. здоровья' &&
            abit.cossack_society == i.name,
        ).length
        data[`cossack_expulsion_notDisc_${i.name}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason == 'дисц.' && abit.cossack_society == i.name,
        ).length
        data[`cossack_expulsion_other_${i.name}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason != null &&
            abit.expulsion_reason != 'дисц.' &&
            abit.expulsion_reason != 'нежел.' &&
            abit.expulsion_reason != 'КЭ' &&
            abit.expulsion_reason != 'ФП' &&
            !abit.expulsion_reason?.includes('(') &&
            abit.cossack_society == i.name,
        ).length
        data[`cossack_success_${i.name}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_admission != undefined &&
            abit.cossack_society == i.name &&
            abit.militaryService_rank == null,
        ).length
        data[`cossack_military_success_${i.name}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_admission != undefined &&
            abit.cossack_society == i.name &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false,
        ).length
      }
      const fileName = 'ВУНЦ=П7_Казаки-24.xlsx'
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportYongArmy() {
      let data = {}
      for (let i of this.specialty) {
        data[`YA_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_1 == i.abbreviation &&
            abit.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('Юнармеец'),
        ).length
        data[`YA_admission_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.admission_date &&
            abit.specialty_1 == i.abbreviation &&
            abit.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('Юнармеец'),
        ).length
        data[`YA_expulsion_notWish_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_1 == i.abbreviation &&
            abit.expulsion_reason == 'нежел.' &&
            abit.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('Юнармеец'),
        ).length
        data[`YA_expulsion_stupid_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason?.includes('(') &&
            abit.specialty_1 == i.abbreviation &&
            abit.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('Юнармеец'),
        ).length
        data[`YA_expulsion_notSport_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason == 'ФП' &&
            abit.specialty_1 == i.abbreviation &&
            abit.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('Юнармеец'),
        ).length
        data[`YA_expulsion_notPPO_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason == 'КЭ' &&
            abit.specialty_1 == i.abbreviation &&
            abit.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('Юнармеец'),
        ).length
        data[`YA_expulsion_notHealth_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'сост. здоровья' &&
              abit.specialty_1 == i.abbreviation &&
              abit.personal_achievements
                .map((ach) => ach.achievement?.name)
                .includes('Юнармеец'),
          ).length
        data[`YA_expulsion_notDisc_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason == 'дисц.' &&
            abit.specialty_1 == i.abbreviation &&
            abit.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('Юнармеец'),
        ).length
        data[`YA_expulsion_other_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason != null &&
            abit.expulsion_reason != 'дисц.' &&
            abit.expulsion_reason != 'нежел.' &&
            abit.expulsion_reason != 'КЭ' &&
            abit.expulsion_reason != 'ФП' &&
            !abit.expulsion_reason?.includes('(') &&
            abit.specialty_1 == i.abbreviation &&
            abit.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('Юнармеец'),
        ).length
        data[`YA_notExpulsion_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason == null &&
            abit.specialty_1 == i.abbreviation &&
            abit.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('Юнармеец'),
        ).length
        data[`YA_success_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.specialty_admission != undefined &&
            abit.specialty_1 == i.abbreviation &&
            abit.personal_achievements
              .map((ach) => ach.achievement?.name)
              .includes('Юнармеец'),
        ).length
      }
      const fileName = 'ВУНЦ=П6_Юнармия-24.xlsx'
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportStatMil() {
      let data = {}
      for (let i of this.militaryPlaces) {
        data[`mil_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'По призыву',
        ).length
        data[`mil_contract_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'Контракт',
        ).length
        data[`mil_mob_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_mobilization == true,
        ).length
        data[`mil_admission_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.admission_date &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'По призыву',
        ).length
        data[`mil_admission_contract_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.admission_date &&
              abit.militaryService_place == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_category == 'Контракт',
          ).length
        data[`mil_admission_mob_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.admission_date &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_mobilization == true,
        ).length
        data[`mil_access_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.speciality_admission != undefined &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'По призыву',
        ).length
        data[`mil_access_contract_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.speciality_admission != undefined &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'Контракт',
        ).length
        data[`mil_access_mob_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.speciality_admission != undefined &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_mobilization == true,
        ).length
        data[`mil_veteran_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.speciality_admission != undefined &&
            abit.militaryService_SVO == 'ВБД' &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'По призыву',
        ).length
        data[`mil_veteran_contract_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.speciality_admission != undefined &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_SVO == 'ВБД' &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'Контракт',
        ).length
        data[`mil_veteran_mob_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.speciality_admission != undefined &&
            abit.militaryService_SVO == 'ВБД' &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_mobilization == true,
        ).length
        data[`mil_svo_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.speciality_admission != undefined &&
            abit.militaryService_SVO.includes('СВО') &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'По призыву',
        ).length
        data[`mil_svo_contract_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.speciality_admission != undefined &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_SVO.includes('СВО') &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'Контракт',
        ).length
        data[`mil_svo_mob_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.speciality_admission != undefined &&
            abit.militaryService_SVO.includes('СВО') &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_mobilization == true,
        ).length

        data[`mil_expulsion_notWish_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'По призыву' &&
            abit.expulsion_reason == 'нежел.',
        ).length
        data[`mil_expulsion_stupid_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason?.includes('(') &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'По призыву' &&
            abit.militaryService_place == i.abbreviation,
        ).length
        data[`mil_expulsion_notSport_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'ФП' &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_category == 'По призыву' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_expulsion_notPPO_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason == 'КЭ' &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'По призыву' &&
            abit.militaryService_place == i.abbreviation,
        ).length
        data[`mil_expulsion_notHealth_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'сост. здоровья' &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_category == 'По призыву' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_expulsion_notDisc_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason == 'дисц.' &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'По призыву' &&
            abit.militaryService_place == i.abbreviation,
        ).length
        data[`mil_expulsion_other_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.expulsion_reason != null &&
            abit.expulsion_reason != 'дисц.' &&
            abit.expulsion_reason != 'нежел.' &&
            abit.expulsion_reason != 'КЭ' &&
            abit.expulsion_reason != 'ФП' &&
            !abit.expulsion_reason?.includes('(') &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false &&
            abit.militaryService_category == 'По призыву' &&
            abit.militaryService_place == i.abbreviation,
        ).length
        data[`mil_contract_expulsion_notWish_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.militaryService_place == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_category == 'Контракт' &&
              abit.expulsion_reason == 'нежел.',
          ).length
        data[`mil_contract_expulsion_stupid_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason?.includes('(') &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_category == 'Контракт' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_contract_expulsion_notSport_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'ФП' &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_category == 'Контракт' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_contract_expulsion_notPPO_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'КЭ' &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_category == 'Контракт' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_contract_expulsion_notHealth_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'сост. здоровья' &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_category == 'Контракт' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_contract_expulsion_notDisc_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'дисц.' &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_category == 'Контракт' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_contract_expulsion_other_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason != null &&
              abit.expulsion_reason != 'дисц.' &&
              abit.expulsion_reason != 'нежел.' &&
              abit.expulsion_reason != 'КЭ' &&
              abit.expulsion_reason != 'ФП' &&
              !abit.expulsion_reason?.includes('(') &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_category == 'Контракт' &&
              abit.militaryService_place == i.abbreviation,
          ).length
        data[`mil_mob_expulsion_notWish_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.militaryService_place == i.abbreviation &&
              abit.expulsion_reason == 'нежел.' &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_mobilization == true,
          ).length
        data[`mil_mob_expulsion_stupid_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason?.includes('(') &&
              abit.militaryService_place == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_mobilization == true,
          ).length
        data[`mil_mob_expulsion_notSport_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'ФП' &&
              abit.militaryService_place == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_mobilization == true,
          ).length
        data[`mil_mob_expulsion_notPPO_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'КЭ' &&
              abit.militaryService_place == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_mobilization == true,
          ).length
        data[`mil_mob_expulsion_notHealth_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'сост. здоровья' &&
              abit.militaryService_place == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_mobilization == true,
          ).length
        data[`mil_mob_expulsion_notDisc_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason == 'дисц.' &&
              abit.militaryService_place == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_mobilization == true,
          ).length
        data[`mil_mob_expulsion_other_${i.abbreviation}`] =
          this.fullAbits.filter(
            (abit) =>
              abit.expulsion_reason != null &&
              abit.expulsion_reason != 'дисц.' &&
              abit.expulsion_reason != 'нежел.' &&
              abit.expulsion_reason != 'КЭ' &&
              abit.expulsion_reason != 'ФП' &&
              !abit.expulsion_reason?.includes('(') &&
              abit.militaryService_place == i.abbreviation &&
              abit.militaryService_rank != null &&
              abit.militaryService_dismissed == false &&
              abit.militaryService_mobilization == true,
          ).length
      }
      const fileName = 'ВУНЦ=П8_ВС-24.xlsx'
      await this.exportToTemplateExcel({ data, fileName })
    },
    async ExportCharacteristic() {
      let data = {}
      for (let i of this.militaryPlaces) {
        if (
          i.abbreviation == 'ЛенВО' ||
          i.abbreviation == 'МВО' ||
          i.abbreviation == 'ВВО' ||
          i.abbreviation == 'ЦВО' ||
          i.abbreviation == 'ЮВО'
        ) {
          data[`civil_${i.abbreviation}`] = this.fullAbits.filter(
            (abit) =>
              abit.militaryDistrict == i.abbreviation &&
              abit.sign != 'Кадет' &&
              !abit.personal_achievements
                .map((ach) => ach.achievement?.name)
                .includes('Юнармеец') &&
              (abit.militaryService_rank == null ||
                (abit.militaryService_rank != null &&
                  abit.militaryService_dismissed == true)),
          ).length
          data[`civil_svy_${i.abbreviation}`] = this.fullAbits.filter(
            (abit) =>
              abit.militaryDistrict == i.abbreviation &&
              abit.sign == 'Кадет' &&
              (abit.militaryService_rank == null ||
                (abit.militaryService_rank != null &&
                  abit.militaryService_dismissed == true)),
          ).length
          data[`civil_YA_${i.abbreviation}`] = this.fullAbits.filter(
            (abit) =>
              abit.militaryDistrict == i.abbreviation &&
              abit.personal_achievements
                .map((ach) => ach.achievement?.name)
                .includes('Юнармеец') &&
              (abit.militaryService_rank == null ||
                (abit.militaryService_rank != null &&
                  abit.militaryService_dismissed == true)),
          ).length
          data[`civil_admission_${i.abbreviation}`] = this.fullAbits.filter(
            (abit) =>
              abit.militaryDistrict == i.abbreviation &&
              abit.sign != 'Кадет' &&
              abit.admission_date &&
              abit.expulsion_reason == null &&
              !abit.personal_achievements
                .map((ach) => ach.achievement?.name)
                .includes('Юнармеец') &&
              (abit.militaryService_rank == null ||
                (abit.militaryService_rank != null &&
                  abit.militaryService_dismissed == true)),
          ).length
          data[`civil_admission_svy_${i.abbreviation}`] = this.fullAbits.filter(
            (abit) =>
              abit.militaryDistrict == i.abbreviation &&
              abit.admission_date &&
              abit.expulsion_reason == null &&
              abit.sign == 'Кадет' &&
              (abit.militaryService_rank == null ||
                (abit.militaryService_rank != null &&
                  abit.militaryService_dismissed == true)),
          ).length
          data[`civil_admission_YA_${i.abbreviation}`] = this.fullAbits.filter(
            (abit) =>
              abit.militaryDistrict == i.abbreviation &&
              abit.admission_date &&
              abit.expulsion_reason == null &&
              abit.personal_achievements
                .map((ach) => ach.achievement?.name)
                .includes('Юнармеец') &&
              (abit.militaryService_rank == null ||
                (abit.militaryService_rank != null &&
                  abit.militaryService_dismissed == true)),
          ).length
          data[`civil_access_${i.abbreviation}`] = this.fullAbits.filter(
            (abit) =>
              abit.militaryDistrict == i.abbreviation &&
              abit.speciality_admission != undefined &&
              abit.sign != 'Кадет' &&
              !abit.personal_achievements
                .map((ach) => ach.achievement?.name)
                .includes('Юнармеец') &&
              (abit.militaryService_rank == null ||
                (abit.militaryService_rank != null &&
                  abit.militaryService_dismissed == true)),
          ).length
          data[`civil_access_svy_${i.abbreviation}`] = this.fullAbits.filter(
            (abit) =>
              abit.militaryDistrict == i.abbreviation &&
              abit.speciality_admission != undefined &&
              abit.sign == 'Кадет' &&
              (abit.militaryService_rank == null ||
                (abit.militaryService_rank != null &&
                  abit.militaryService_dismissed == true)),
          ).length
          data[`civil_access_YA_${i.abbreviation}`] = this.fullAbits.filter(
            (abit) =>
              abit.militaryDistrict == i.abbreviation &&
              abit.speciality_admission != undefined &&
              abit.personal_achievements
                .map((ach) => ach.achievement?.name)
                .includes('Юнармеец') &&
              (abit.militaryService_rank == null ||
                (abit.militaryService_rank != null &&
                  abit.militaryService_dismissed == true)),
          ).length
        }
        data[`mil_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false,
        ).length
        data[`mil_admission_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.admission_date &&
            abit.expulsion_reason == null &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false,
        ).length
        data[`mil_access_${i.abbreviation}`] = this.fullAbits.filter(
          (abit) =>
            abit.speciality_admission != undefined &&
            abit.militaryService_place == i.abbreviation &&
            abit.militaryService_rank != null &&
            abit.militaryService_dismissed == false,
        ).length
      }
      const fileName = 'ВУНЦ=П9_КХ-24.xlsx'
      await this.exportToTemplateExcel({ data, fileName })
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
