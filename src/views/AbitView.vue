<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <data-table />
        <v-dialog
          v-model="dialogCheckSave"
          max-width="500px"
        >
          <v-card>
            <v-card-title>Сохранить изменения?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
              >
                Отмена
              </v-btn>
              <v-btn
                text
                color="primary"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="8">
        <v-card>
          <v-card-title>
            <div>
              <h2>Abit Profile {{ abit ? abit.id : '' }}</h2>
            </div>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
              Сохранить
            </v-btn>
            <router-link
              v-if="abit"
              :to="{ name: 'abitEdit', params: { id: abit.id } }"
            >
              <v-icon big> mdi-pencil </v-icon>
            </router-link>
          </v-card-title>
          <v-card-text>
            <v-tabs
              v-model="tabs"
              fixed-tabs
              background-color="indigo"
              dark
            >
              <v-tab
                v-for="(n, index) in headers"
                :key="`tab_${index}`"
                :value="n.value"
              >
                <v-badge
                  color="green"
                  :value="badgeColor(n.value)"
                  dot
                >
                  {{ n.text }}
                </v-badge>
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs">
              <v-tab-item
                v-for="(n, index) in headers"
                :key="index"
              >
                <component
                  :is="n.value"
                  :abit="abit || {}"
                  @child-event="handleChildEvent(n, $event)"
                />
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Achievements from '@/components/Achievements.vue'
import Admission from '@/components/Admission.vue'
import DataTable from '@/components/DataTable.vue'
import Documents from '@/components/Documents.vue'
import Military from '@/components/Military.vue'
import Results from '@/components/Results.vue'
import { mapActions, mapGetters } from 'vuex'
import FirstInfo from '../components/FirstInfo.vue'
export default {
  name: 'AbitView',
  components: {
    DataTable,
    FirstInfo,
    Results,
    Military,
    Documents,
    Admission,
    Achievements,
  },
  props: ['id'],
  data() {
    return {
      message: {},
      differences: null,
      tabs: 0,
      editedTabs: [],
      headers: [
        { text: 'Первичные данные', value: 'FirstInfo' },
        { text: 'Документы', value: 'Documents' },
        { text: 'достижения', value: 'Achievements' },
        { text: 'прибытие', value: 'Admission' },
        { text: 'результаты', value: 'Results' },
      ],
      dialogCheckSave: false,
    }
  },
  computed: {
    ...mapGetters(['selectedAbit']),
    abit() {
      return this.selectedAbit
    },
  },
  watch: {
    id() {
      this.selectAbit(this.id)
      this.dialogCheckSave = true
    },
    tabs(newVal) {
      localStorage.setItem('tabs', newVal)
    },
  },
  created() {
    this.selectAbit(this.id)
    if (localStorage.getItem('tabs')) {
      this.tabs = parseInt(localStorage.getItem('tabs'))
    }
  },
  methods: {
    ...mapActions(['selectAbit', 'updateAbit']),
    handleChildEvent(n, data) {
      this.message = { ...this.message, ...data }
      if (!this.editedTabs.includes(n.value)) {
        this.editedTabs.push(n.value)
      }
    },
    badgeColor(key) {
      if (this.editedTabs.includes(key)) {
        return true
      } else return false
    },
    save() {
      this.message.id = this.id
      this.updateAbit(this.message)
      this.editedTabs = []
      this.message = {}
    },
  },
}
</script>
