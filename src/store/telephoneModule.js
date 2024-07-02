import axios from 'axios'

export default {
  state: { telephones: [] },
  mutations: {
    SET_TELEPHONES: (state, payload) => (state.telephones = payload),
    ADD_TELEPHONES: (state, newNumber) => state.telephones.push(newNumber),
    PUT_TELEPHONES(state, newNumber) {
      const index = state.telephones.findIndex(
        (telephones) => telephones.id === newNumber.id
      )
      if (index !== -1) {
        state.telephones.splice(index, 1, newNumber)
      }
    },
  },
  getters: { telephones: (state) => state.telephones },
  actions: {
    async fetchTelephones({ commit }, numberId) {
      const response = await axios.get(`/telephone/${numberId}`)
      commit('SET_TELEPHONES', response.data)
    },
    async addTelephones({ commit }, newNumber) {
      const response = await axios.post('/telephone', newNumber)
      commit('ADD_TELEPHONES', response.data)
    },
    async putTelephones({ commit }, newNumber) {
      const response = await axios.put(`/telephone/${newNumber.id}`, newNumber)
      commit('PUT_TELEPHONES', response.data)
    },
  },
}
