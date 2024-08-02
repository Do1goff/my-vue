import axios from 'axios'

export default {
  state: { institutes: [], selectedInstitute: null },
  mutations: {
    ADD_INSTITUTE: (state, newInstitute) => state.institutes.push(newInstitute),
    SET_INSTITUTES: (state, payload) => (state.institutes = payload),
    SET_INSTITUTE: (state, institute) => (state.selectedInstitute = institute),
  },
  getters: {
    institutes: (state) => state.institutes,
    selectedInstitute: (state) => state.selectedInstitute,
  },
  actions: {
    async fetchInstitutes({ commit }) {
      const response = await axios.get('/institutes')
      commit('SET_INSTITUTES', response.data)
    },
    async addInstitutes({ commit }, newInstitute) {
      const response = await axios.post('/institutes', newInstitute)
      commit('ADD_INSTITUTE', response.data)
    },
    async selectInstitute({ commit }, instituteID) {
      const response = await axios.get(`/institutes/${instituteID}`)
      commit('SET_INSTITUTE', response.data)
    },
  },
}
