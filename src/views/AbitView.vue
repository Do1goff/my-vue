<template>
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
      <v-snackbar
        :value="!(messageChild == null && residenceChild == null)"
        top
        color="success"
        timeout="-1"
      >
        <span> Сохранить изменения? </span>

        <template v-slot:action="{ attrs }">
          <v-btn
            class="black--text"
            elevation="24"
            outlined
            rounded
            :disabled="messageChild === null && residenceChild == null"
            @click="save"
          >
            Сохранить
          </v-btn>
        </template>
      </v-snackbar>
      <v-btn
        class="BGclr"
        elevation="24"
        outlined
        rounded
        :disabled="messageChild === null && residenceChild == null"
        @click="save"
      >
        Сохранить
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-tabs
        v-model="tabs"
        fixed-tabs
        background-color="primary darken-1"
        dark
      >
        <v-tab
          v-for="(component, index) in headers"
          :key="`tab_${index}`"
          :value="component.value"
          @click="switchTab(component.value)"
        >
          <v-badge
            color="success"
            :value="badgeColor(component.value)"
            dot
          >
            {{ component.text }}
          </v-badge>
        </v-tab>
      </v-tabs>

      <router-view
        :abit="abit || {}"
        @child-event="handleChild"
        @child-residence="handleResidence"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import Achievements from '@/components/Achievements.vue'
import Admission from '@/components/Admission.vue'
import DataTable from '@/components/DataTable.vue'
import Documents from '@/components/Documents.vue'
import Results from '@/components/Results.vue'
import { mapActions, mapGetters } from 'vuex'
import Calls from '../components/Calls.vue'
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
    Calls,
  },
  props: ['id', 'parentF'],
  data() {
    return {
      snackbar: true,
      messageChild: null,
      residenceChild: null,
      tabs: 0,
      editedTabs: [],
      headers: [
        { text: 'Первичные данные', value: 'FirstInfo' },
        { text: 'Документы', value: 'Documents' },
        { text: 'достижения', value: 'Achievements' },
        { text: 'прибытие', value: 'Admission' },
        { text: 'результаты', value: 'Results' },
        { text: 'вызовы', value: 'Calls' },
      ],
    }
  },
  computed: {
    ...mapGetters(['selectedAbit', 'location']),
    abit() {
      return this.selectedAbit
    },
  },
  watch: {
    id() {
      this.selectAbit(this.id)
    },
  },
  created() {
    this.selectAbit(this.id)
    this.$parent.$on('parentFE', () => {
      this.childF()
    })
  },
  methods: {
    ...mapActions([
      'selectAbit',
      'updateAbit',
      'addLocation',
      'updateLocation',
      'selectLocation',
    ]),
    childF() {
      this.messageChild = null
      this.residenceChild = null
      this.editedTabs = []
    },

    async handleResidence(event) {
      const tab = 'FirstInfo'

      this.residenceChild = {
        ...this.residenceChild,
        ...event,
      }
      /////////////?
      this.editedTabs.push(tab)

      this.$emit('child-residence', this.residenceChild)
    },

    handleChild(data) {
      this.handleChildEvent(data[0], data[1])
    },
    handleChildEvent(tab, data) {
      if (
        typeof this.abit[Object.keys(data)[0]] === 'object' &&
        this.abit[Object.keys(data)[0]] !== null &&
        this.abit[Object.keys(data)[0]].id === data[Object.keys(data)[0]]
      ) {
        if (this.editedTabs.includes(tab)) {
          this.editedTabs.pop(tab)
        }
        if (this.messageChild !== null) {
          delete this.messageChild[Object.keys(data)[0]]
          if (Object.keys(this.messageChild).length === 0) {
            this.messageChild = null
          }
        }
      } else if (
        data[Object.keys(data)[0]] !== this.abit[Object.keys(data)[0]] ||
        (this.abit[Object.keys(data)[0]] === null && data[Object.keys(data)[0]])
      ) {
        if (
          this.messageChild === null ||
          !this.messageChild[Object.keys(data)[0]]
        ) {
          this.editedTabs.push(tab)
        }
        this.messageChild = { ...this.messageChild, ...data }
      } else {
        if (this.editedTabs.includes(tab)) {
          this.editedTabs.pop(tab)
        }
        if (this.messageChild !== null) {
          delete this.messageChild[Object.keys(data)[0]]
          if (Object.keys(this.messageChild).length === 0) {
            this.messageChild = null
          }
        }
      }
      this.$emit('child-message', this.messageChild)
    },
    badgeColor(key) {
      if (this.editedTabs.includes(key)) {
        return true
      } else return false
    },
    save() {
      this.$emit('saveDifferences')
      this.messageChild = null
      this.residenceChild = null
    },
    checkSave() {
      this.messageChild = null
      this.residenceChild = null
      this.editedTabs = []
    },
    switchTab(value) {
      const pathParts = this.$route.path.split('/')
      if (value !== pathParts[pathParts.length - 1]) {
        this.$router.replace({
          name: 'component',
          params: { component: value },
        })
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
