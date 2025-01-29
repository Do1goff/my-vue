<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <data-table
          :message="message"
          :residenceChild="residenceChild"
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
            <h1 class="black--text">Выбери или добавь абитуриента</h1>
          </v-card-text>
        </v-card>
        <router-view
          class="BG"
          :parentF="parentF"
          @child-message="handleChildMessage($event)"
          @child-residence="handleResidence"
          @saveDifferences="saveDifferences"
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
    }
  },
  computed: {
    ...mapGetters(['selectedAbit', 'location', 'user']),
  },
  methods: {
    ...mapActions([
      'updateAbit',
      'addLocation',
      'updateLocation',
      'selectLocation',
      'saveHistory',
      'fetchHistory',
    ]),
    saveDifferences() {
      if (this.message != null) {
        this.saveMessage()
      }
      if (this.residenceChild != null) {
        this.saveLocation()
      }
      this.$emit('parentFE')
      this.editedTabs = []
    },

    saveHistoryMessage(data, entity) {
      const newValueKeys = Object.keys(data)
      let old = {}
      for (let key in newValueKeys) {
        old[newValueKeys[key]] = this.selectedAbit[newValueKeys[key]]
      }
      const history = {
        abitId: parseInt(data.id ? data.id : data.abitId),
        oldValue: JSON.stringify(old),
        newValue: JSON.stringify(data),
        changedBy: JSON.parse(sessionStorage.getItem('user'))?.username,
      }
      this.saveHistory(history)
    },

    async saveMessage() {
      this.message.id = this.$route.path.split('/')[2]
      this.updateAbit(this.message)

      this.saveHistoryMessage(this.message, 'message')

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

    checkSave() {
      this.residenceChild = null
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
