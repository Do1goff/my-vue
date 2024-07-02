import axios from 'axios'

export default {
  state: { commissions: [] },
  mutations: {
    ADD_ADMISSION_COMMISSION: (state, newCommission) =>
      state.commissions.push(newCommission),
    SET_ADMISSION_COMMISSION: (state, payload) => (state.commissions = payload),
  },
  getters: { commissions: (state) => state.commissions },
  actions: {
    async fetchAdmissionCommissions({ commit }) {
      const response = await axios.get('/commission')
      commit('SET_ADMISSION_COMMISSION', response.data)
    },
    async addAdmissionCommission({ commit }, newCommission) {
      const response = await axios.post('/commission', newCommission)
      commit('ADD_ADMISSION_COMMISSION', response.data)
    },
  },
}
