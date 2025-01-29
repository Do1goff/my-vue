<template>
  <v-dialog
    v-model="historyDialog"
    max-width="2500px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </template>
    <v-data-table
      :headers="headers"
      :items="this.ALL"
      item-key="id"
      :search="search"
      sort-by="changedAt"
      sort-desc
      fixed-header
      disable-pagination
      hide-default-footer
      group-by="changedBy"
      show-group-by
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          v-if="item.entityName != 'create'"
          color="primary"
          icon
          @click="backChange(item)"
        >
          <v-icon>mdi-backspace</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-btn @click="loadHistory"> Обновить </v-btn>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HistoryComponent',
  data() {
    return {
      historyDialog: false,
      ALL: [],
      headers: [
        {
          text: 'Кто',
          value: 'changedBy',
          align: 'center',
          width: '1%',
        },
        {
          text: 'id Абитуриента',
          value: 'abitId',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Поле',
          value: 'entityName',
          align: 'center',
          width: '1%',
        },
        {
          text: 'До',
          value: 'oldValue',
          align: 'center',
        },
        {
          text: 'После',
          value: 'newValue',
          align: 'center',
        },
        {
          text: 'Когда',
          value: 'changedAt',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Действие',
          value: 'actions',
          align: 'center',
          width: '1%',
        },
      ],
      search: null,
    }
  },
  computed: {
    ...mapGetters(['allHistory']),
  },
  async created() {
    this.loadHistory()
  },
  methods: {
    ...mapActions([
      'fetchHistory',
      'updateAbit',
      'updateHistory',
      'deleteHistory',
    ]),
    async loadHistory() {
      await this.fetchHistory()
      this.ALL = []
      this.allHistory.forEach((item) => {
        let keysValues = Object.keys(JSON.parse(item.newValue))
        let element = {}
        element.item = item
        element.abitId = item.abitId
        element.changedAt = item.changedAt
        element.changedBy = item.changedBy
        for (let x in keysValues) {
          if (keysValues[x] !== 'id' && keysValues[x] !== 'abitId') {
            element.entityName = keysValues[x]
            element.oldValue = JSON.parse(item.oldValue)[keysValues[x]]
            element.newValue = JSON.parse(item.newValue)[keysValues[x]]
            this.ALL.push(Object.assign({}, element))
          }
        }
      })
    },
    async backChange(item) {
      const change = {}
      change.id = item.abitId
      change[item.entityName] = item.oldValue
      this.updateAbit(change)

      let keys = Object.keys(JSON.parse(item.item.newValue)).filter(
        (key) => key != item.entityName,
      )
      if (keys.length == 1) {
        await this.deleteHistory(item.item.id)
        this.loadHistory()
      } else {
        const updatedItem = item.item
        const ObjectNew = JSON.parse(updatedItem.newValue)
        const ObjectOld = JSON.parse(updatedItem.oldValue)
        delete ObjectNew[item.entityName]
        delete ObjectOld[item.entityName]
        updatedItem.newValue = JSON.stringify(ObjectNew)
        updatedItem.oldValue = JSON.stringify(ObjectOld)
        await this.updateHistory(updatedItem)
        this.loadHistory()
      }
    },
  },
}
</script>
