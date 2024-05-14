<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <div>
              <h2>Abit Profile {{ abit ? abit.id : '' }}</h2>
            </div>
            <v-spacer />
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
                {{ n.text }}
                <router-link
                  v-if="abit"
                  :to="{ name: `${n.value}`, params: { id: abit.id } }"
                >
                  <v-icon big> mdi-pencil </v-icon>
                </router-link>
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs">
              <v-tab-item
                v-for="(n, index) in headers"
                :key="index"
              >
                <router-view />
                <!-- <component
                  :is="n.value"
                  :abit="abit || {}"
                /> -->
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
      data: {},
      tabs: null,
      headers: [
        { text: 'Первичные данные', value: 'FirstInfo' },
        { text: 'Документы', value: 'Documents' },
        { text: 'в/служба', value: 'Military' },
        { text: 'результаты', value: 'Results' },
        { text: 'достижения', value: 'Achievements' },
        { text: 'поступление', value: 'Admission' },
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
  },
  created() {
    this.selectAbit(this.id)
  },
  methods: {
    ...mapActions(['selectAbit']),
  },
}
</script>
