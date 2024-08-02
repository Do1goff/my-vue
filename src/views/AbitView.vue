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
      <!-- <v-file-input
        chips
        truncate-length="50"
      ></v-file-input> -->
      <v-btn
        class="BGclr"
        elevation="24"
        outlined
        rounded
        :disabled="
          messageChild === null &&
          residenceChild == null &&
          educationChild == null &&
          uncanceledEducationChild == null &&
          militaryServiceChild == null &&
          passportChild == null
        "
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
          @click="switchTab(component.value)"
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

      <router-view
        :abit="abit || {}"
        @child-event="handleChild"
        @child-residence="handleResidence"
        @child-education="handleEducation"
        @child-uncanceledEducation="handleUncanceledEducation"
        @child-militaryService="handleMilitaryService"
        @child-passport="handlePassport"
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
import moment from 'moment'
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
  props: ['id', 'parentF'],
  data() {
    return {
      messageChild: null,
      residenceChild: null,
      educationChild: null,
      uncanceledEducationChild: null,
      militaryServiceChild: null,
      passportChild: null,
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
    ...mapGetters([
      'selectedAbit',
      'location',
      'selectedEducation',
      'selectedUncanceledEducation',
      'selectedMilitaryService',
      'selectedPassport',
    ]),
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
      'addEducation',
      'updateEducation',
      'selectEducation',
      'addUncanceledEducation',
      'updateUncanceledEducation',
      'selectUncanceledEducation',
      'addMilitaryService',
      'updateMilitaryService',
      'selectMilitaryService',
      'addPassport',
      'updatePassport',
      'selectPassport',
    ]),
    childF() {
      this.messageChild = null
      this.residenceChild = null
      this.educationChild = null
      this.uncanceledEducationChild = null
      this.militaryServiceChild = null
      this.passportChild = null
      this.editedTabs = []
    },

    async handleResidence(event) {
      const tab = 'FirstInfo'

      // if (this.abit[Object.keys(event)[0]]) {
      //   await this.selectLocation(this.abit[Object.keys(event)[0]].id)
      // }
      this.residenceChild = {
        ...this.residenceChild,
        ...event,
      }
      /////////////?
      this.editedTabs.push(tab)

      this.$emit('child-residence', this.residenceChild)
    },

    async handleEducation(event) {
      const tab = 'Documents'
      await this.selectEducation(this.abit.id)
      if (
        Object.keys(event)[0] === 'date_end' &&
        typeof this.selectedEducation === 'object'
      ) {
        this.selectedEducation.date_end = moment(
          this.selectedEducation.date_end
        ).format('YYYY-MM-DD')
      }
      if (
        typeof this.selectedEducation[Object.keys(event)[0]] === 'object' &&
        this.selectedEducation[Object.keys(event)[0]] !== null &&
        this.selectedEducation[Object.keys(event)[0]].id ===
          event[Object.keys(event)[0]]
      ) {
        if (this.editedTabs.includes(tab)) {
          this.editedTabs.pop(tab)
        }
        if (this.educationChild !== null) {
          delete this.educationChild[Object.keys(event)[0]]
          if (Object.keys(this.educationChild).length === 0) {
            this.educationChild = null
          }
        }
      } else if (
        event[Object.keys(event)[0]] !==
          this.selectedEducation[Object.keys(event)[0]] ||
        (this.selectedEducation[Object.keys(event)[0]] === null &&
          event[Object.keys(event)[0]])
      ) {
        if (
          this.educationChild === null ||
          !this.educationChild[Object.keys(event)[0]]
        ) {
          this.editedTabs.push(tab)
        }
        this.educationChild = { ...this.educationChild, ...event }
      } else {
        if (this.editedTabs.includes(tab)) {
          this.editedTabs.pop(tab)
        }
        if (this.educationChild !== null) {
          delete this.educationChild[Object.keys(event)[0]]
          if (Object.keys(this.educationChild).length === 0) {
            this.educationChild = null
          }
        }
      }
      this.$emit('child-education', this.educationChild)
    },

    async handleUncanceledEducation(event) {
      const tab = 'Documents'
      await this.selectUncanceledEducation(this.abit.id)

      if (
        Object.keys(event)[0] === 'date_end' &&
        typeof this.selectedUncanceledEducation === 'object'
      ) {
        this.selectedUncanceledEducation.date_end = moment(
          this.selectedUncanceledEducation.date_end
        ).format('YYYY-MM-DD')
      }
      if (
        Object.keys(event)[0] === 'date_admission' &&
        typeof this.selectedUncanceledEducation === 'object'
      ) {
        this.selectedUncanceledEducation.date_admission = moment(
          this.selectedUncanceledEducation.date_admission
        ).format('YYYY-MM-DD')
      }

      if (
        typeof this.selectedUncanceledEducation[Object.keys(event)[0]] ===
          'object' &&
        this.selectedUncanceledEducation[Object.keys(event)[0]] !== null &&
        this.selectedUncanceledEducation[Object.keys(event)[0]].id ===
          event[Object.keys(event)[0]]
      ) {
        if (this.editedTabs.includes(tab)) {
          this.editedTabs.pop(tab)
        }
        if (this.uncanceledEducationChild !== null) {
          delete this.uncanceledEducationChild[Object.keys(event)[0]]
          if (Object.keys(this.uncanceledEducationChild).length === 0) {
            this.uncanceledEducationChild = null
          }
        }
      } else if (
        event[Object.keys(event)[0]] !==
          this.selectedUncanceledEducation[Object.keys(event)[0]] ||
        (this.selectedUncanceledEducation[Object.keys(event)[0]] === null &&
          event[Object.keys(event)[0]])
      ) {
        if (
          this.uncanceledEducationChild === null ||
          !this.uncanceledEducationChild[Object.keys(event)[0]]
        ) {
          this.editedTabs.push(tab)
        }
        this.uncanceledEducationChild = {
          ...this.uncanceledEducationChild,
          ...event,
        }
      } else {
        if (this.editedTabs.includes(tab)) {
          this.editedTabs.pop(tab)
        }
        if (this.uncanceledEducationChild !== null) {
          delete this.uncanceledEducationChild[Object.keys(event)[0]]
          if (Object.keys(this.uncanceledEducationChild).length === 0) {
            this.uncanceledEducationChild = null
          }
        }
      }
      this.$emit('child-uncanceledEducation', this.uncanceledEducationChild)
    },

    async handleMilitaryService(event) {
      const tab = 'Documents'
      await this.selectMilitaryService(this.abit.id)
      if (
        typeof this.selectedMilitaryService[Object.keys(event)[0]] ===
          'object' &&
        this.selectedMilitaryService[Object.keys(event)[0]] !== null &&
        this.selectedMilitaryService[Object.keys(event)[0]].id ===
          event[Object.keys(event)[0]]
      ) {
        if (this.editedTabs.includes(tab)) {
          this.editedTabs.pop(tab)
        }
        if (this.militaryServiceChild !== null) {
          delete this.militaryServiceChild[Object.keys(event)[0]]
          if (Object.keys(this.militaryServiceChild).length === 0) {
            this.militaryServiceChild = null
          }
        }
      } else if (
        event[Object.keys(event)[0]] !==
          this.selectedMilitaryService[Object.keys(event)[0]] ||
        (this.selectedMilitaryService[Object.keys(event)[0]] === null &&
          event[Object.keys(event)[0]])
      ) {
        if (
          this.militaryServiceChild === null ||
          !this.militaryServiceChild[Object.keys(event)[0]]
        ) {
          this.editedTabs.push(tab)
        }
        this.militaryServiceChild = { ...this.militaryServiceChild, ...event }
      } else {
        if (this.editedTabs.includes(tab)) {
          this.editedTabs.pop(tab)
        }
        if (this.militaryServiceChild !== null) {
          delete this.militaryServiceChild[Object.keys(event)[0]]
          if (Object.keys(this.militaryServiceChild).length === 0) {
            this.militaryServiceChild = null
          }
        }
      }
      this.$emit('child-militaryService', this.militaryServiceChild)
    },

    async handlePassport(event) {
      const tab = 'Documents'
      await this.selectPassport(this.abit.id)
      if (
        typeof this.selectedPassport[Object.keys(event)[0]] === 'object' &&
        this.selectedPassport[Object.keys(event)[0]] !== null &&
        this.selectedPassport[Object.keys(event)[0]].id ===
          event[Object.keys(event)[0]]
      ) {
        if (this.editedTabs.includes(tab)) {
          this.editedTabs.pop(tab)
        }
        if (this.passportChild !== null) {
          delete this.passportChild[Object.keys(event)[0]]
          if (Object.keys(this.passportChild).length === 0) {
            this.passportChild = null
          }
        }
      } else if (
        event[Object.keys(event)[0]] !==
          this.selectedPassport[Object.keys(event)[0]] ||
        (this.selectedPassport[Object.keys(event)[0]] === null &&
          event[Object.keys(event)[0]])
      ) {
        if (
          this.passportChild === null ||
          !this.passportChild[Object.keys(event)[0]]
        ) {
          this.editedTabs.push(tab)
        }
        this.passportChild = { ...this.passportChild, ...event }
      } else {
        if (this.editedTabs.includes(tab)) {
          this.editedTabs.pop(tab)
        }
        if (this.passportChild !== null) {
          delete this.passportChild[Object.keys(event)[0]]
          if (Object.keys(this.passportChild).length === 0) {
            this.passportChild = null
          }
        }
      }
      this.$emit('child-passport', this.passportChild)
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
      this.educationChild = null
      this.uncanceledEducationChild = null
      this.militaryServiceChild = null
      this.passportChild = null
    },
    checkSave() {
      this.messageChild = null
      this.residenceChild = null
      this.educationChild = null
      this.uncanceledEducationChild = null
      this.militaryServiceChild = null
      this.passportChild = null
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
