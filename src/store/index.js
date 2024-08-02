import Vue from 'vue'
import Vuex from 'vuex'
import abitModule from './abitModule'
import achievementModule from './achievementModule'
import addressModule from './addressModule'
import admissionCommissionModule from './admissionCommissionModule'
import educationModule from './educationModule'
import egeMarksModule from './egeMarksModule'
import entranceTestMarksModule from './entranceTestMarksModule'
import examinationGroupModule from './examinationGroupModule'
import familyModule from './familyModule'
import fetchModule from './fetchModule'
import instituteModule from './instituteModule'
import locationsModule from './locationsModule'
import militaryCommissariatModule from './militaryCommissariatModule'
import militaryServiceModule from './militaryServiceModule'
import militaryUnitsModule from './militaryUnitsModule'
import passportIssuedModule from './passportIssuedModule'
import passportModule from './passportModule'
import reasonExpulsionModule from './reasonExpulsionModule'
import schoolMarksModule from './schoolMarksModule'
import sportScoresModule from './sportScoresModule'
import statusModule from './statusModule'
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
    passportIssuedModule,
    statusModule,
    reasonExpulsionModule,
    locationsModule,
    educationModule,
    militaryServiceModule,
    militaryUnitsModule,
    passportModule,
  },
})
