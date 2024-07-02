<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <data-table
          :message="message"
          @checkSave="checkSave"
        />
      </v-col>
      <v-col cols="8">
        <v-card>
          <v-card-title>
            <div>
              <h2>
                {{ abit ? abit.lastName : '' }}
                {{ abit ? abit.firstName : '' }} {{ abit ? abit.surName : '' }}
                {{ abit ? abit.personal_file_number : '' }}
              </h2>
            </div>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              :disabled="message === null"
              @click="save"
            >
              Сохранить
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-tabs
              v-model="tabs"
              fixed-tabs
              background-color="indigo"
              dark
            >
              <v-tab
                v-for="(component, index) in headers"
                :key="`tab_${index}`"
                :value="component.value"
              >
                <v-badge
                  color="green"
                  :value="badgeColor(component.value)"
                  dot
                >
                  {{ component.text }}
                </v-badge>
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs">
              <v-tab-item
                v-for="(component, index) in headers"
                :key="index"
              >
                <component
                  :is="component.value"
                  :abit="abit || {}"
                  @child-event="handleChildEvent(component, $event)"
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
import Results from '@/components/Results.vue'
import { mapActions, mapGetters } from 'vuex'
import FirstInfo from '../components/FirstInfo.vue'
export default {
  name: 'AbitView',
  components: {
    DataTable,
    FirstInfo,
    Results,
    Documents,
    Admission,
    Achievements,
  },
  props: ['id'],
  data() {
    return {
      ID: 10,
      message: null,
      tabs: 0,
      editedTabs: [],
      headers: [
        { text: 'Первичные данные', value: 'FirstInfo' },
        { text: 'Документы', value: 'Documents' },
        { text: 'достижения', value: 'Achievements' },
        { text: 'прибытие', value: 'Admission' },
        { text: 'результаты', value: 'Results' },
      ],
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
    handleChildEvent(tab, data) {
      if (
        typeof this.abit[Object.keys(data)[0]] === 'object' &&
        this.abit[Object.keys(data)[0]] !== null &&
        this.abit[Object.keys(data)[0]].id === data[Object.keys(data)[0]]
      ) {
        if (this.editedTabs.includes(tab.value)) {
          this.editedTabs.pop(tab.value)
        }
        if (this.message !== null) {
          delete this.message[Object.keys(data)[0]]
          if (Object.keys(this.message).length === 0) {
            this.message = null
          }
        }
      } else if (
        data[Object.keys(data)[0]] !== this.abit[Object.keys(data)[0]] ||
        (this.abit[Object.keys(data)[0]] === null && data[Object.keys(data)[0]])
      ) {
        if (this.message === null || !this.message[Object.keys(data)[0]]) {
          this.editedTabs.push(tab.value)
        }
        this.message = { ...this.message, ...data }
      } else {
        if (this.editedTabs.includes(tab.value)) {
          this.editedTabs.pop(tab.value)
        }
        if (this.message !== null) {
          delete this.message[Object.keys(data)[0]]
          if (Object.keys(this.message).length === 0) {
            this.message = null
          }
        }
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
      this.message = null
    },
    checkSave() {
      this.message = null
      this.editedTabs = []
    },
  },
}
</script>
