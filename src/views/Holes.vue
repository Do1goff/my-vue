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
              sort-by="admission_examination_group"
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
            <div v-if="this.exam == 'EGE'">
              <v-chip-group
                multiple
                v-model="egeRadio"
                @change="selectHoles"
              >
                <v-chip
                  v-for="tag in tags"
                  :key="tag.value"
                  :value="tag.value"
                  :color="
                    egeRadio.includes(tag.value)
                      ? 'primary--text'
                      : 'secondary--text'
                  "
                  dense
                >
                  {{ tag.text }}
                </v-chip>
              </v-chip-group>
            </div>
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
      egeRadio: [],
      tags: [
        { text: 'М', value: 'ege_math' },
        { text: 'РЯ', value: 'ege_rus' },
        { text: 'Ф', value: 'ege_phiz' },
        { text: 'Инф', value: 'ege_inf' },
        { text: 'Г', value: 'ege_geo' },
        { text: 'О', value: 'ege_obsh' },
        { text: 'Ист', value: 'ege_hist' },
      ],
      ALL: [],
      selected: [],
      headers: [
        {
          text: 'id',
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
          value: 'admission_examination_group',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Спец.',
          value: 'specialty_1',
          align: 'center',
          width: '1%',
        },
        {
          text: 'ППО',
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
          value: 'ege_math',
          align: 'center',
          width: '1%',
        },
        {
          text: 'РЯ',
          value: 'ege_rus',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Ф',
          value: 'ege_phiz',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Инф',
          value: 'ege_inf',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Г',
          value: 'ege_geo',
          align: 'center',
          width: '1%',
        },
        {
          text: 'О',
          value: 'ege_obsh',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Ист',
          value: 'ege_hist',
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
    ...mapGetters(['allAbits', 'allEgeMarks', 'subjects', 'fullAbits']),
  },
  async created() {
    await this.fetchFullAbits()
    await this.fetchSubjects()
    await this.fetchAllEgeMarks()
    this.ALL = this.fullAbits
  },
  methods: {
    ...mapActions([
      'holesToStatements',
      'fetchAllEgeMarks',
      'fetchSubjects',
      'fetchFullAbits',
    ]),
    selectHoles() {
      console.log(this.egeRadio)
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
          this.ALL = this.fullAbits.filter(
            (abit) => abit[key] != null && abit[key] > two
          )
        } else if (this.holes == true && this.twos == false) {
          this.ALL = this.fullAbits.filter((abit) => abit[key] == null)
        } else if (this.holes == true && this.twos == true) {
          this.ALL = this.fullAbits.filter(
            (abit) => abit[key] == null || abit[key] <= two
          )
        } else if (this.holes == false && this.twos == true) {
          this.ALL = this.fullAbits.filter(
            (abit) => abit[key] != null && abit[key] <= two
          )
        }
      } else {
        two = {
          ege_math: this.subjects.filter((sub) => sub.name == 'Математика')[0]
            .minEGE,
          ege_rus: this.subjects.filter((sub) => sub.name == 'Русский язык')[0]
            .minEGE,
          ege_phiz: this.subjects.filter((sub) => sub.name == 'Физика')[0]
            .minEGE,
          ege_inf: this.subjects.filter((sub) => sub.name == 'Информатика')[0]
            .minEGE,
          ege_obsh: this.subjects.filter(
            (sub) => sub.name == 'Обществознание'
          )[0].minEGE,
          ege_geo: this.subjects.filter((sub) => sub.name == 'География')[0]
            .minEGE,
          ege_hist: this.subjects.filter((sub) => sub.name == 'История')[0]
            .minEGE,
        }
        if (this.holes == false && this.twos == false) {
          this.ALL = []
          for (let i of this.egeRadio) {
            this.ALL = [
              ...new Set([
                ...(this.ALL || []),
                ...this.fullAbits.filter(
                  (abit) => abit[`${i}`] != null && abit[`${i}`] > two[`${i}`]
                ),
              ]),
            ]
          }
        } else if (this.holes == true && this.twos == false) {
          this.ALL = []
          for (let i of this.egeRadio) {
            this.ALL = [
              ...new Set([
                ...this.fullAbits.filter((abit) => abit[`${i}`] == null),
                ...(this.ALL || []),
              ]),
            ]
          }
        } else if (this.holes == true && this.twos == true) {
          this.ALL = []
          for (let i of this.egeRadio) {
            this.ALL = [
              ...new Set([
                ...(this.ALL || []),
                ...this.fullAbits.filter(
                  (abit) => abit[`${i}`] == null || abit[`${i}`] <= two[`${i}`]
                ),
              ]),
            ]
          }
        } else if (this.holes == false && this.twos == true) {
          this.ALL = []
          for (let i of this.egeRadio) {
            this.ALL = [
              ...new Set([
                ...(this.ALL || []),
                ...this.fullAbits.filter(
                  (abit) => abit[`${i}`] != null && abit[`${i}`] <= two[`${i}`]
                ),
              ]),
            ]
          }
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
            group: abit.admission_examination_group,
          })
      )
      var groups = [
        ...new Set(
          this.selected.map(
            (abit) =>
              (abit = abit.admission_examination_group
                ? abit.admission_examination_group
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
.v-data-table {
  table-layout: fixed;
}
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
