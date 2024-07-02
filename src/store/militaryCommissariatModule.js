import axios from 'axios'

export default {
  state: { militaryCommissariats: [] },
  mutations: {
    ADD_MILITARY_COMMISSARIAT: (state, newMilitaryCommissariat) =>
      state.militaryCommissariats.push(newMilitaryCommissariat),
    SET_MILITARY_COMMISSARIAT: (state, payload) =>
      (state.militaryCommissariats = payload),
  },
  getters: { militaryCommissariats: (state) => state.militaryCommissariats },
  actions: {
    async fetchMilitaryCommissariats({ commit }) {
      const response = await axios.get('/military_commissariat')
      commit('SET_MILITARY_COMMISSARIAT', response.data)
    },
    async addMilitaryCommissariat({ commit }, newMilitaryCommissariat) {
      const response = await axios.post(
        '/military_commissariat',
        newMilitaryCommissariat
      )
      commit('ADD_MILITARY_COMMISSARIAT', response.data)
    },
  },
}
