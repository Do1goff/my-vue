import axios from 'axios'

export default {
  state: { addresses: [] },
  mutations: {
    ADD_ADDRESS: (state, newAddress) => state.addresses.push(newAddress),
    SET_ADDRESS: (state, payload) => (state.addresses = payload),
  },
  getters: { addresses: (state) => state.addresses },
  actions: {
    async fetchAddresses({ commit }) {
      const response = await axios.get('/addresses')
      commit('SET_ADDRESS', response.data)
    },
    async addAddresses({ commit }, newAddress) {
      const response = await axios.post('/addresses', newAddress)
      commit('ADD_ADDRESS', response.data)
    },
  },
}
