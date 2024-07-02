import Vue from 'vue'
import Vuex from 'vuex'
import abitModule from './abitModule'
import achievementModule from './achievementModule'
import addressModule from './addressModule'
import admissionCommissionModule from './admissionCommissionModule'
import egeMarksModule from './egeMarksModule'
import entranceTestMarksModule from './entranceTestMarksModule'
import examinationGroupModule from './examinationGroupModule'
import familyModule from './familyModule'
import fetchModule from './fetchModule'
import instituteModule from './instituteModule'
import militaryCommissariatModule from './militaryCommissariatModule'
import schoolMarksModule from './schoolMarksModule'
import sportScoresModule from './sportScoresModule'
import telephoneModule from './telephoneModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    abitModule,
    telephoneModule,
    sportScoresModule,
    schoolMarksModule,
    militaryCommissariatModule,
    familyModule,
    instituteModule,
    entranceTestMarksModule,
    examinationGroupModule,
    fetchModule,
    addressModule,
    achievementModule,
    admissionCommissionModule,
    egeMarksModule,
  },
})
