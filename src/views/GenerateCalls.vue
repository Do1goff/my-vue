<template>
  <v-container
    fluid
    class="BGclr"
    style="height: 100vh"
  >
    <v-row>
      <v-col cols="9">
        <v-card>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="this.ALL"
              item-key="id"
              :search="search"
              fixed-header
              disable-pagination
              height="600px"
              show-select
              v-model="selected"
              hide-default-footer
              dense
              sort-desc
              multi-sort
            >
              <template v-slot:item.id="{ item }">
                <v-chip :color="getClass(item)">{{ item.id }}</v-chip>
              </template>
              <template v-slot:item.lastName="{ item }">
                <span
                  >{{ item.lastName }} {{ item.firstName }}
                  {{ item.surName }}</span
                >
              </template>
              <template v-slot:item.birthday="{ item }">
                <span>{{ formatDate(item.birthday) }}</span>
              </template>
              <template v-slot:item.militaryCommissariat="{ item }">
                <span
                  v-if="item.militaryService_rank == null"
                  class="small-text"
                  >{{ item.militaryCommissariat }}</span
                >
                <span
                  v-else
                  class="small-text"
                  >{{ item.militaryService_unit }}</span
                >
              </template>
              <template v-slot:item.call_date="{ item }">
                <span>{{ formatDate(item.call_date) }}</span>
              </template>
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
          <v-card-title>
            Настройки
            <v-switch
              v-model="baltimor"
              label='На "Балтимор"'
            />
          </v-card-title>
          <v-card-text>
            <v-checkbox
              v-model="notRegions"
              indeterminate
              label="Нет региона"
              @change="selectNotRegions"
            />
            <v-checkbox
              v-model="notExpulsion"
              label="Без отчисленных"
              @change="selectNotExpulsion"
            />
            <v-checkbox
              v-model="notCall"
              label="Нет вызова"
              @change="selectNotCall"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="generateCalls"
            >
              Сгенерировать вызовы
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'GenerateCalls',
  data() {
    return {
      baltimor: false,
      notCall: false,
      notExpulsion: false,
      notRegions: false,
      notCommissariat: false,
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
          text: 'Звание',
          value: 'militaryService_rank',
          align: 'center',
          width: '1%',
        },
        {
          text: 'ФИО',
          value: 'lastName',
          align: 'start',
        },
        {
          text: 'День рождения',
          value: 'birthday',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Регион',
          value: 'region',
          align: 'center',
          width: '1%',
        },
        {
          text: 'ВК/ВЧ',
          value: 'militaryCommissariat',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Вызов',
          value: 'call_number',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Дата вызова',
          value: 'call_date',
          align: 'center',
          width: '1%',
        },
        // {
        //   text: 'Действие',
        //   value: 'actions',
        //   align: 'center',
        // },
      ],
      search: null,
    }
  },
  computed: {
    ...mapGetters(['fullAbits', 'regions']),
  },
  async created() {
    await this.fetchFullAbits()
    await this.fetchRegions()
    this.ALL = this.fullAbits
  },
  methods: {
    ...mapActions([
      'fetchFullAbits',
      'fetchRegions',
      'exportToWord',
      'updateAbit',
      'saveHistory',
    ]),
    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD-MM-YYYY')
    },
    saveHistoryMessage(data) {
      const newValueKeys = Object.keys(data)
      let old = {}
      for (let key in newValueKeys) {
        old[newValueKeys[key]] = this.fullAbits.find(
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
    selectNotRegions() {
      if (this.notRegions == true) {
        this.ALL = this.fullAbits.filter((abit) =>
          abit.militaryService_rank
            ? abit.militaryService_unit == null
            : abit.region == 'undefined' || abit.militaryCommissariat == null,
        )
      } else {
        this.ALL = this.fullAbits.filter((abit) =>
          abit.militaryService_rank
            ? abit.militaryService_unit != null
            : abit.region != 'undefined' && abit.militaryCommissariat != null,
        )
      }
    },
    selectNotExpulsion() {
      if (this.notExpulsion == true) {
        this.ALL = this.ALL.filter((abit) => abit.expulsion_reason == null)
      } else {
        this.ALL = this.fullAbits
        this.notCall = false
      }
    },
    selectNotCall() {
      if (this.notCall == true) {
        this.ALL = this.ALL.filter((abit) => abit.call_number == null)
      } else {
        this.notExpulsion = false
        this.ALL = this.fullAbits
      }
    },
    getClass(item) {
      if (item.expulsion_reason != null) {
        return 'error'
      }
      if (item.call_number != null) {
        return 'success'
      }
      if (
        (item.militaryService_rank == null &&
          item.militaryCommissariat == null) ||
        (item.militaryService_rank != null && item.militaryService_unit == null)
      ) {
        return 'warning'
      }
      if (item.sign != 'Кадет') {
        return 'info'
      }
    },
    async generateCalls() {
      moment.locale('ru')
      const groups = []
      let items = []
      for (let x in this.selected) {
        let g = this.selected[x].militaryService_rank
          ? this.selected[x].militaryService_unit
          : this.selected[x].militaryCommissariat
        if (!groups.includes(g) && g != null) {
          groups.push(g)
        }
      }
      const grouped = []
      for (let group of groups) {
        grouped.push(
          this.selected.filter(
            (abit) =>
              (abit.militaryService_rank
                ? abit.militaryService_unit
                : abit.militaryCommissariat) == group,
          ),
        )
      }
      for (let i of grouped) {
        const sklonenie = require('sklonenie')
        await this.fetchFullAbits()
        const num = `2/${Math.max(...this.fullAbits.map((abit) => parseInt(abit.call_number ? abit.call_number.slice(2) : 0))) + 1}`
        for (let x of i) {
          if (
            x.militaryService_rank
              ? x.militaryService_unit != null
              : x.militaryCommissariat != null
          ) {
            const updatedData = {
              id: x.id,
              call_number: num,
              call_date: moment().format('YYYY-MM-DD'),
              call_date_admission: moment().format('YYYY-MM-DD'),
            }
            if (
              this.fullAbits.find((abit) => abit.id == x.id).call_number ==
                null &&
              this.fullAbits.find((abit) => abit.id == x.id).sign != 'Кадет'
            ) {
              await this.updateAbit(updatedData)
              this.saveHistoryMessage(updatedData)
              items.push({
                fio: `${x.militaryService_rank != undefined ? x.militaryService_rank : ''} ${x.lastName.toUpperCase()} ${x.firstName} ${x.surName}`,
              })
            }
          }
        }
        const data = {
          date: `${moment().format('["]DD["] MMMM YYYY')} г.`,
          num: num,
          location: i[0].militaryService_rank
            ? i[0].militaryService_unit.split(' ')[2]
            : i[0].militaryCommissariat,
          address: i[0].militaryService_rank
            ? i[0].militaryService_unit_address
            : i[0].militaryCommissariat_address,
          items: items,
          date_admission: i[0].militaryService_rank
            ? ''
            : `${moment(this.regions.find((reg) => reg.region == i[0].militaryCommissariat_region).date_admission).format('DD MMMM YYYY')} г.`,
        }
        const fileName = this.baltimor
          ? i[0].militaryService_rank
            ? 'Вызов_ВЧ(Балтимор).docx'
            : 'Вызов_ВК(Балтимор).docx'
          : i[0].militaryService_rank
            ? 'Вызов_ВЧ.docx'
            : 'Вызов_ВК.docx'
        await this.exportToWord({ data, fileName })
        items = []
      }
    },
  },
}
</script>

<style>
.v-data-table {
  table-layout: fixed;
}
.notSomething {
  background-color: rgb(255, 247, 0);
}
.completed {
  background-color: lawngreen;
}
.expulsion {
  background-color: rgb(252, 0, 0);
}
.small-text {
  font-size: 0.9em;
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
