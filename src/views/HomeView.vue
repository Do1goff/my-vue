<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <data-table
          :message="message"
          :residenceChild="residenceChild"
          :educationChild="educationChild"
          :uncanceledEducationChild="uncanceledEducationChild"
          :militaryServiceChild="militaryServiceChild"
          :passportChild="passportChild"
          @checkSave="checkSave"
        />
      </v-col>
      <v-col cols="8">
        <v-card
          color="primary"
          class="text-center"
          v-if="this.$route.path === '/abit'"
        >
          <v-card-text>
            <h1>Выбери или добавь абитуриента</h1>
          </v-card-text>
        </v-card>
        <router-view
          class="BG"
          :parentF="parentF"
          @child-message="handleChildMessage($event)"
          @saveDifferences="saveDifferences"
          @child-residence="handleResidence"
          @child-education="handleEducation"
          @child-uncanceledEducation="handleUncanceledEducation"
          @child-militaryService="handleMilitaryService"
          @child-passport="handlePassport"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTable from '@/components/DataTable.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HomeView',
  components: {
    DataTable,
  },
  data() {
    return {
      message: null,
      residenceChild: null,
      educationChild: null,
      uncanceledEducationChild: null,
      militaryServiceChild: null,
      passportChild: null,
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
  },
  methods: {
    ...mapActions([
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
    saveDifferences() {
      if (this.message != null) {
        this.saveMessage()
      }
      if (this.residenceChild != null) {
        this.saveLocation()
      }
      if (this.educationChild != null) {
        this.educationChild.abitId = parseInt(this.$route.path.split('/')[2])
        this.saveEducation()
      }
      if (this.uncanceledEducationChild != null) {
        this.uncanceledEducationChild.abitId = parseInt(
          this.$route.path.split('/')[2]
        )
        this.saveUncanceledEducation()
      }
      if (this.militaryServiceChild != null) {
        this.militaryServiceChild.abitId = parseInt(
          this.$route.path.split('/')[2]
        )
        this.saveMilitaryService()
      }
      if (this.passportChild != null) {
        this.passportChild.abitId = parseInt(this.$route.path.split('/')[2])
        this.savePassport()
      }
      this.$emit('parentFE')
      this.editedTabs = []
    },

    async saveMessage() {
      this.message.id = this.$route.path.split('/')[2]
      this.updateAbit(this.message)
      this.message = null
    },

    async saveLocation() {
      this.message = Object.assign({})
      if (this.selectedAbit.residence) {
        await this.selectLocation(this.selectedAbit.residence.id)
        this.residenceChild.id = this.location.id
        await this.updateLocation(this.residenceChild)
      } else {
        await this.addLocation(this.residenceChild)
      }

      this.message.residence = this.location.id

      this.residenceChild = null
      this.saveMessage()
    },
    async saveEducation() {
      if (typeof this.selectedEducation !== 'object') {
        await this.addEducation(this.educationChild)
      } else {
        await this.updateEducation(this.educationChild)
      }
      await this.selectEducation(this.educationChild.abitId)
      this.educationChild = null
    },
    async saveUncanceledEducation() {
      if (typeof this.selectedUncanceledEducation !== 'object') {
        await this.addUncanceledEducation(this.uncanceledEducationChild)
      } else {
        await this.updateUncanceledEducation(this.uncanceledEducationChild)
      }
      await this.selectUncanceledEducation(this.uncanceledEducationChild.abitId)
      this.uncanceledEducationChild = null
    },
    async saveMilitaryService() {
      if (typeof this.selectedMilitaryService !== 'object') {
        await this.addMilitaryService(this.militaryServiceChild)
      } else {
        await this.updateMilitaryService(this.militaryServiceChild)
      }
      await this.selectMilitaryService(this.militaryServiceChild.abitId)
      this.militaryServiceChild = null
    },
    async savePassport() {
      if (typeof this.selectedPassport !== 'object') {
        await this.addPassport(this.passportChild)
      } else {
        await this.updatePassport(this.passportChild)
      }
      await this.selectPassport(this.passportChild.abitId)
      this.passportChild = null
    },

    checkSave() {
      this.residenceChild = null
      this.educationChild = null
      this.uncanceledEducationChild = null
      this.militaryServiceChild = null
      this.passportChild = null
      this.message = null
      this.editedTabs = []
      this.$emit('parentFE')
    },
    handleChildMessage(event) {
      this.message = event
    },
    handleResidence(event) {
      this.residenceChild = event
    },
    handleEducation(event) {
      this.educationChild = event
    },
    handleUncanceledEducation(event) {
      this.uncanceledEducationChild = event
    },
    handleMilitaryService(event) {
      this.militaryServiceChild = event
    },
    handlePassport(event) {
      this.passportChild = event
    },
    parentF() {
      this.$emit('parentFE')
    },
  },
}
</script>

<style>
.text-center {
  text-align: center;
  text-justify: start;
}
.BG {
  background-image: radial-gradient(
      at 85.55793504308392% 85.8282629508816%,
      hsla(0, 0%, 100%, 1) 0%,
      hsla(0, 0%, 100%, 0) 100%
    ),
    radial-gradient(
      at 93.75692962625956% 18.90642026016397%,
      hsla(241.7391304347826, 92.82511210762333%, 56.27450980392157%, 1) 0%,
      hsla(241.7391304347826, 92.82511210762333%, 56.27450980392157%, 0) 100%
    ),
    radial-gradient(
      at 24.37457088004955% 72.7313591282824%,
      hsla(189, 82.35294117647058%, 66.66666666666666%, 1) 0%,
      hsla(189, 82.35294117647058%, 66.66666666666666%, 0) 100%
    ),
    radial-gradient(
      at 11.285680584071123% 72.52081898601276%,
      hsla(0, 0%, 100%, 1) 0%,
      hsla(0, 0%, 100%, 0) 100%
    ),
    radial-gradient(
      at 71.69178715898617% 13.570187175912308%,
      hsla(241.7391304347826, 92.82511210762333%, 56.27450980392157%, 1) 0%,
      hsla(241.7391304347826, 92.82511210762333%, 56.27450980392157%, 0) 100%
    ),
    radial-gradient(
      at 42.639191923013584% 64.27405532482312%,
      hsla(189, 82.35294117647058%, 66.66666666666666%, 1) 0%,
      hsla(189, 82.35294117647058%, 66.66666666666666%, 0) 100%
    );
}
</style>
