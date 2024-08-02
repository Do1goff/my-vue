import axios from 'axios'

export default {
  state: { statuses: [] },
  mutations: {
    ADD_STATUS: (state, newStatus) => state.statuses.push(newStatus),
    SET_STATUS: (state, payload) => (state.statuses = payload),
  },
  getters: { statuses: (state) => state.statuses },
  actions: {
    async fetchStatuses({ commit }) {
      const response = await axios.get('/statuses')
      commit('SET_STATUS', response.data)
    },
    async addStatuses({ commit }, newStatus) {
      const response = await axios.post('/statuses', newStatus)
      commit('ADD_STATUS', response.data)
    },
  },
}
