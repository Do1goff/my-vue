import axios from 'axios'

export default {
  state: { militaryCommissariats: [], selectedMilitaryCommissariat: null },
  mutations: {
    ADD_MILITARY_COMMISSARIAT: (state, newMilitaryCommissariat) =>
      state.militaryCommissariats.push(newMilitaryCommissariat),
    SET_MILITARY_COMMISSARIATS: (state, payload) =>
      (state.militaryCommissariats = payload),
    SET_MILITARY_COMMISSARIAT: (state, militaryCommissariat) =>
      (state.selectedMilitaryCommissariat = militaryCommissariat),
  },
  getters: {
    militaryCommissariats: (state) => state.militaryCommissariats,
    selectedMilitaryCommissariat: (state) => state.selectedMilitaryCommissariat,
  },
  actions: {
    async fetchMilitaryCommissariats({ commit }) {
      const response = await axios.get('/military_commissariat')
      commit('SET_MILITARY_COMMISSARIATS', response.data)
    },
    async addMilitaryCommissariat({ commit }, newMilitaryCommissariat) {
      const response = await axios.post(
        '/military_commissariat',
        newMilitaryCommissariat,
      )
      commit('ADD_MILITARY_COMMISSARIAT', response.data)
    },
    async selectMilitaryCommissariat({ commit }, militaryCommissariatId) {
      const response = await axios.get(
        `/military_commissariat/${militaryCommissariatId}`,
      )
      commit('SET_MILITARY_COMMISSARIAT', response.data)
    },
  },
}
