<template>
  <v-container
    fluid
    class="BGclr"
    style="height: 100vh"
  >
    <v-row>
      <v-col cols="8">
        <v-card>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="this.ALL"
              item-key="id"
              :search="search"
              fixed-header
              disable-pagination
              show-select
              v-model="selected"
              hide-default-footer
              dense
              sort-by="admission_examination_group.name"
              sort-desc
              multi-sort
            >
              <template v-slot:item.actions="{ item }">
                <v-btn
                  color="primary"
                  icon
                >
                  <v-icon>mdi-backspace</v-icon>
                </v-btn>
              </template>
            </v-data-table>
            <span>Всего в таблице: {{ ALL.length }}</span>
            <v-spacer />
            <span>Выбрано: {{ selected.length }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> Настройки </v-card-title>
          <v-card-text>
            <v-radio-group
              v-model="exam"
              row
              dense
              @change="selectHoles"
            >
              <v-radio
                label="Профотбор"
                value="PPO"
              ></v-radio>
              <v-radio
                label="ФП"
                value="sport"
              ></v-radio>
              <v-radio
                label="ЕГЭ"
                value="EGE"
              ></v-radio>
            </v-radio-group>
            <v-checkbox
              v-model="holes"
              label="Не сдавал"
              @change="selectHoles"
            />
            <v-checkbox
              v-model="twos"
              label="Двойка"
              @change="selectHoles"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="exportToStatement"
            >
              Ведомости Профотбор
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Holes',
  data() {
    return {
      holes: false,
      twos: false,
      exam: null,
      ALL: [],
      selected: [],
      headers: [
        {
          text: 'id Абитуриента',
          value: 'id',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Фамилия',
          value: 'lastName',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Имя',
          value: 'firstName',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Отчество',
          value: 'surName',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Группа',
          value: 'admission_examination_group.name',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Специальность',
          value: 'specialty_1.abbreviation',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Профотбор',
          value: 'qualificationExam_mark',
          align: 'center',
          width: '1%',
        },
        {
          text: 'ФП',
          value: 'sport_score',
          align: 'center',
          width: '1%',
        },
        {
          text: 'М',
          value: 'math.mark',
          align: 'center',
          width: '1%',
        },
        {
          text: 'РЯ',
          value: 'rus.mark',
          align: 'center',
          width: '1%',
        },
        {
          text: '1 экз',
          value: 'exam_1.mark',
          align: 'center',
          width: '1%',
        },
        {
          text: '2 экз',
          value: 'exam_2.mark',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Действие',
          value: 'actions',
          align: 'center',
        },
      ],
      search: null,
    }
  },
  computed: {
    ...mapGetters(['allAbits', 'allEgeMarks', 'subjects']),
  },
  async created() {
    await this.fetchSubjects()
    await this.fetchAbits()
    await this.fetchAllEgeMarks()
    this.ALL = this.allAbits
    this.ALL.map(
      (abit) =>
        (abit.math = this.allEgeMarks.filter(
          (egeMark) =>
            egeMark.abitId == abit.id && egeMark.subject.name == 'Математика'
        )[0])
    )
    this.ALL.map(
      (abit) =>
        (abit.rus = this.allEgeMarks.filter(
          (egeMark) =>
            egeMark.abitId == abit.id && egeMark.subject.name == 'Русский язык'
        )[0])
    )
    this.ALL.map(
      (abit) =>
        (abit.exam_1 = this.allEgeMarks.filter(
          (egeMark) =>
            egeMark.abitId == abit.id &&
            egeMark.subject.name == abit.specialty_1.egeSubject_1
        )[0])
    )
    await this.ALL.map(
      (abit) =>
        (abit.exam_2 = this.allEgeMarks.filter(
          (egeMark) =>
            egeMark.abitId == abit.id &&
            egeMark.subject.name == abit.specialty_1.egeSubject_2
        )[0])
    )
  },
  methods: {
    ...mapActions([
      'fetchAbits',
      'holesToStatements',
      'fetchAllEgeMarks',
      'fetchSubjects',
    ]),
    selectHoles() {
      this.selected = []
      var key =
        this.exam == 'PPO'
          ? 'qualificationExam_mark'
          : this.exam == 'sport'
            ? 'sport_score'
            : 'ege'
      var two = this.exam == 'PPO' ? 2 : this.exam == 'sport' ? 24 : 'minEGE'
      if (key != 'ege') {
        if (this.holes == false && this.twos == false) {
          this.ALL = this.allAbits.filter(
            (abit) => abit[key] != null && abit[key] > two
          )
        } else if (this.holes == true && this.twos == false) {
          this.ALL = this.allAbits.filter((abit) => abit[key] == null)
        } else if (this.holes == true && this.twos == true) {
          this.ALL = this.allAbits.filter(
            (abit) => abit[key] == null || abit[key] <= two
          )
        } else if (this.holes == false && this.twos == true) {
          this.ALL = this.allAbits.filter(
            (abit) => abit[key] != null && abit[key] <= two
          )
        }
      } else {
        two = {
          math: this.subjects.filter((sub) => sub.name == 'Математика')[0]
            .minEGE,
          rus: this.subjects.filter((sub) => sub.name == 'Русский язык')[0]
            .minEGE,
          phiz: this.subjects.filter((sub) => sub.name == 'Физика')[0].minEGE,
          inf: this.subjects.filter((sub) => sub.name == 'Информатика')[0]
            .minEGE,
          obsh: this.subjects.filter((sub) => sub.name == 'Обществознание')[0]
            .minEGE,
          geo: this.subjects.filter((sub) => sub.name == 'География')[0].minEGE,
          ist: this.subjects.filter((sub) => sub.name == 'История')[0].minEGE,
        }
        if (this.holes == false && this.twos == false) {
          this.ALL = this.allAbits.filter(
            (abit) =>
              (abit.math != null && abit.math.mark > two.math) ||
              (abit.rus != null && abit.rus.mark > two.rus) ||
              (abit.exam_1 != null && abit.exam_1.mark > two.rus) ||
              (abit.exam_2 != null && abit.exam_2.mark > two.rus)
          )
        } else if (this.holes == true && this.twos == false) {
          this.ALL = this.allAbits.filter(
            (abit) =>
              abit.math == null ||
              abit.rus == null ||
              abit.exam_1 == null ||
              abit.exam_2 == null
          )
        } else if (this.holes == true && this.twos == true) {
          this.ALL = this.allAbits.filter(
            (abit) =>
              abit.math == null ||
              abit.math.mark <= two.math ||
              abit.rus == null ||
              abit.rus.mark <= two.rus ||
              abit.exam_1 == null ||
              abit.exam_1.mark <= two.rus ||
              abit.exam_2 == null ||
              abit.exam_2.mark <= two.rus
          )
        } else if (this.holes == false && this.twos == true) {
          this.ALL = this.allAbits.filter(
            (abit) =>
              (abit.math != null && abit.math.mark <= two.math) ||
              (abit.rus != null && abit.rus.mark <= two.rus) ||
              (abit.exam_1 != null && abit.exam_1.mark <= two.rus) ||
              (abit.exam_2 != null && abit.exam_2.mark <= two.rus)
          )
        }
      }
    },
    async exportToStatement() {
      var items = this.selected.map(
        (abit) =>
          (abit = {
            fio: `${abit.lastName} ${abit.firstName} ${abit.surName}`,
            abitId: abit.id,
            space: '',
            group: abit.admission_examination_group.name,
          })
      )
      var groups = [
        ...new Set(
          this.selected.map(
            (abit) =>
              (abit = abit.admission_examination_group
                ? abit.admission_examination_group.name
                : null)
          )
        ),
      ]
      for (let x in groups) {
        var itemsInGroup = items.filter((item) => item.group == groups[x])
        itemsInGroup.map((item, i) => (item.num = i + 1))
        var data = {
          group: groups[x],
          items: itemsInGroup,
        }
        await this.holesToStatements(data)
      }
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
