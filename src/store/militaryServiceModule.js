import axios from 'axios'

export default {
  state: {
    militaryServices: [],
    selectedMilitaryService: null,
  },
  mutations: {
    SET_MILITARY_SERVICES: (state, payload) =>
      (state.militaryServices = payload),
    SET_SELECTED_MILITARY_SERVICE: (state, militaryService) =>
      (state.selectedMilitaryService = militaryService),
    ADD_MILITARY_SERVICE: (state, newMilitaryService) =>
      state.militaryServices.push(newMilitaryService),

    UPDATE_MILITARY_SERVICE(state, updatedMilitaryService) {
      const index = state.militaryServices.findIndex(
        (militaryService) => militaryService.id === updatedMilitaryService.id
      )
      if (index !== -1) {
        state.militaryServices.splice(index, 1, updatedMilitaryService)
      }
      state.selectedMilitaryService = updatedMilitaryService
    },
  },
  getters: {
    militaryServices: (state) => state.militaryServices,
    selectedMilitaryService: (state) => state.selectedMilitaryService,
  },
  actions: {
    async fetchMilitaryServices({ commit }) {
      const response = await axios.get('/militaryService')
      commit('SET_MILITARY_SERVICES', response.data)
    },
    async selectMilitaryService({ commit }, militaryServiceID) {
      const response = await axios.get(`/militaryService/${militaryServiceID}`)
      commit('SET_SELECTED_MILITARY_SERVICE', response.data)
    },
    async addMilitaryService({ commit }, newMilitaryService) {
      const response = await axios.post('/militaryService', newMilitaryService)
      commit('ADD_MILITARY_SERVICE', response.data)
    },
    async updateMilitaryService({ commit }, updatedMilitaryService) {
      const response = await axios.put(
        `/militaryService/${updatedMilitaryService.abitId}`,
        updatedMilitaryService
      )
      commit('UPDATE_MILITARY_SERVICE', response.data)
    },
  },
}
