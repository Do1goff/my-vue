import Vue from 'vue'
import Vuex from 'vuex'
import abitModule from './abitModule'
import achievementModule from './achievementModule'
import admissionCommissionModule from './admissionCommissionModule'
import egeMarksModule from './egeMarksModule'
import entranceTestMarksModule from './entranceTestMarksModule'
import examinationGroupModule from './examinationGroupModule'
import exportModule from './exportModule'
import familyModule from './familyModule'
import fetchModule from './fetchModule'
import filterModule from './filterModule'
import instituteModule from './instituteModule'
import locationsModule from './locationsModule'
import militaryCommissariatModule from './militaryCommissariatModule'
import militaryUnitsModule from './militaryUnitsModule'
import passportIssuedModule from './passportIssuedModule'
import reasonExpulsionModule from './reasonExpulsionModule'
import schoolMarksModule from './schoolMarksModule'
import sportScoresModule from './sportScoresModule'
import statusModule from './statusModule'
import telephoneModule from './telephoneModule'
import usersModule from './usersModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    exportModule,
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
    achievementModule,
    admissionCommissionModule,
    egeMarksModule,
    passportIssuedModule,
    statusModule,
    reasonExpulsionModule,
    locationsModule,
    militaryUnitsModule,
    usersModule,
    filterModule,
  },
})
