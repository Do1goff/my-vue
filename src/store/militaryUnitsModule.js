import axios from 'axios'

export default {
  state: { militaryUnits: [], selectedMilitaryUnit: null },
  mutations: {
    ADD_MILITARY_UNIT: (state, newMilitaryUnit) =>
      state.militaryUnits.push(newMilitaryUnit),
    SET_MILITARY_UNITS: (state, payload) => (state.militaryUnits = payload),
    SET_MILITARY_UNIT: (state, unit) => (state.selectedMilitaryUnit = unit),
  },
  getters: {
    militaryUnits: (state) => state.militaryUnits,
    selectedMilitaryUnit: (state) => state.selectedMilitaryUnit,
  },
  actions: {
    async fetchMilitaryUnits({ commit }) {
      const response = await axios.get('/militaryUnits')
      commit('SET_MILITARY_UNITS', response.data)
    },
    async addMilitaryUnit({ commit }, newMilitaryUnit) {
      const response = await axios.post('/militaryUnits', newMilitaryUnit)
      commit('ADD_MILITARY_UNIT', response.data)
    },
    async selectMilitaryUnit({ commit }, militaryUnitID) {
      const response = await axios.get(`/militaryUnits/${militaryUnitID}`)
      commit('SET_MILITARY_UNIT', response.data)
    },
  },
}
