import axios from 'axios'

export default {
  state: { reasons: [] },
  mutations: {
    ADD_REASON: (state, newReason) => state.reasons.push(newReason),
    SET_REASON: (state, payload) => (state.reasons = payload),
  },
  getters: { reasonExpulsion: (state) => state.reasons },
  actions: {
    async fetchReasonExpulsion({ commit }) {
      const response = await axios.get('/reasons')
      commit('SET_REASON', response.data)
    },
    async addReasonExpulsion({ commit }, newReason) {
      const response = await axios.post('/reasons', newReason)
      commit('ADD_REASON', response.data)
    },
  },
}
