import axios from 'axios'

export default {
  state: {
    passports: [],
    selectedPassport: null,
  },
  mutations: {
    SET_PASSPORTS: (state, payload) => (state.passports = payload),
    SET_SELECTED_PASSPORT: (state, passport) =>
      (state.selectedPassport = passport),
    ADD_PASSPORT: (state, newPassport) => state.passports.push(newPassport),

    UPDATE_PASSPORT(state, updatedPassport) {
      const index = state.passports.findIndex(
        (passport) => passport.id === updatedPassport.id
      )
      if (index !== -1) {
        state.passports.splice(index, 1, updatedPassport)
      }
      state.selectedPassport = updatedPassport
    },
  },
  getters: {
    passports: (state) => state.passports,
    selectedPassport: (state) => state.selectedPassport,
  },
  actions: {
    async fetchPassports({ commit }) {
      const response = await axios.get('/passport')
      commit('SET_PASSPORTS', response.data)
    },
    async selectPassport({ commit }, passportID) {
      const response = await axios.get(`/passport/${passportID}`)
      commit('SET_SELECTED_PASSPORT', response.data)
    },
    async addPassport({ commit }, newPassport) {
      const response = await axios.post('/passport', newPassport)
      commit('ADD_PASSPORT', response.data)
    },
    async updatePassport({ commit }, updatedPassport) {
      const response = await axios.put(
        `/passport/${updatedPassport.abitId}`,
        updatedPassport
      )
      commit('UPDATE_PASSPORT', response.data)
    },
  },
}
