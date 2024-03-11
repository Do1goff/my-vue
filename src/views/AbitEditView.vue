<template>
  <v-tabs
    v-model="tabs"
    background-color="indigo"
    dark
    vertical
  >
    <v-tab
      v-for="(n, index) in headers"
      :key="`tab_${index}`"
      :value="n.value"
    >
      {{ n.text }}
    </v-tab>
    <v-tabs-items v-model="tabs">
      <v-tab-item
        v-for="(n, index) in headers"
        :key="index"
      >
        <!-- <component v-bind:is="n.value" :abit="abit"></component> -->
        <v-tabs
          v-model="tabs2"
          fixed-tabs
          background-color="indigo"
          dark
        >
          <v-tab
            v-for="(N, Index) in headers2"
            :key="`tab_${Index}`"
            :value="N.value"
          >
            {{ N.text }}
          </v-tab>
          <v-tabs-items v-model="tabs2">
            <v-tab-item
              v-for="(N, Index) in headers2"
              :key="Index"
            >
              <component
                :is="N.value"
                :abit="abit"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import Results from '@/components/Results.vue'
import { mapActions, mapGetters } from 'vuex'
import FirstInfo from '../components/FirstInfo.vue'
export default {
  name: 'AbitEditView',
  components: { FirstInfo, Results },
  props: ['id'],
  data() {
    return {
      data: {},
      tabs: null,
      tabs2: null,
      headers: [
        { text: 'Первичные данные', value: 'FirstInfo' },
        { text: 'образование, в/служба', value: 'FirstInfo2' },
        { text: 'результаты', value: 'Results' },
        { text: 'прочие', value: 'FirstInfo4' },
      ],
      headers2: [
        { text: 'Первичные данные', value: 'FirstInfo' },
        { text: 'образование, в/служба', value: 'FirstInfo2' },
        { text: 'результаты', value: 'Results' },
        { text: 'прочие', value: 'FirstInfo4' },
      ],
    }
  },
  computed: {
    ...mapGetters(['selectedAbit']),
    abit() {
      return this.selectedAbit
    },
  },
  methods: {
    ...mapActions(['selectAbit']),
    getAbit() {
      this.selectAbit(this.id)
    },

    // save(){
    //   this.$store.dispatch('updateAbit',this.abit)
    // }
    watch: {
      id() {
        this.selectAbit(this.id)
      },
    },
    created() {
      this.selectAbit(this.id)
    },
  },
}
</script>
