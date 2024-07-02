import axios from 'axios'

export default {
  state: { institutes: [] },
  mutations: {
    ADD_INSTITUTE: (state, newInstitute) => state.institutes.push(newInstitute),
    SET_INSTITUTE: (state, payload) => (state.institutes = payload),
  },
  getters: { institutes: (state) => state.institutes },
  actions: {
    async fetchInstitutes({ commit }) {
      const response = await axios.get('/institutes')
      commit('SET_INSTITUTE', response.data)
    },
    async addInstitutes({ commit }, newInstitute) {
      const response = await axios.post('/institutes', newInstitute)
      commit('ADD_INSTITUTE', response.data)
    },
  },
}
