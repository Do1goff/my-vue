import axios from 'axios'

export default {
  state: { issued_by: [] },
  mutations: {
    ADD_PASSPORT_ISSUED: (state, newPassportIssued) =>
      state.issued_by.push(newPassportIssued),
    SET_PASSPORT_ISSUED: (state, payload) => (state.issued_by = payload),
  },
  getters: { passportIssued: (state) => state.issued_by },
  actions: {
    async fetchPassportIssued({ commit }) {
      const response = await axios.get('/passport_issued_by')
      commit('SET_PASSPORT_ISSUED', response.data)
    },
    async addPassportIssued({ commit }, newPassportIssued) {
      const response = await axios.post(
        '/passport_issued_by',
        newPassportIssued
      )
      commit('ADD_PASSPORT_ISSUED', response.data)
    },
  },
}
