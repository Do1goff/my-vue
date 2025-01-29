import axios from 'axios'

export default {
  state: {
    abits: [],
    fullAbits: [],
    fullAbit: null,
    selectedAbit: null,
    history: [],
  },
  mutations: {
    SET_ABITS: (state, payload) => (state.abits = payload),
    SET_FULL_ABITS: (state, payload) => (state.fullAbits = payload),
    SET_SELECTED_ABIT: (state, abit) => (state.selectedAbit = abit),
    SET_FULL_ABIT: (state, abit) => (state.fullAbit = abit),
    ADD_ABIT: (state, newAbit) => state.abits.push(newAbit),
    DELETE_HISTORY: (state, id) =>
      (state.history = state.history.filter((history) => history.id !== id)),
    // DELETE_ABIT:(state,abitID)=>state.abits = state.abits.filter(abit => abit.id !== abitID),
    UPDATE_ABIT(state, updatedAbit) {
      const index = state.abits.findIndex((abit) => abit.id === updatedAbit.id)
      if (index !== -1) {
        state.abits.splice(index, 1, updatedAbit)
      }
      state.selectedAbit = updatedAbit
    },
    ADD_HISTORY: (state, history) => state.history.push(history),
    SET_HISTORY: (state, payload) => (state.history = payload),
    UPDATE_HISTORY(state, updatedHistory) {
      const index = state.history.findIndex(
        (history) => history.id === updatedHistory.id,
      )
      if (index !== -1) {
        state.history.splice(index, 1, updatedHistory)
      }
      state.selectedHistory = updatedHistory
    },
  },
  getters: {
    allAbits: (state) => state.abits,
    fullAbits: (state) => state.fullAbits,
    fullAbit: (state) => state.fullAbit,
    selectedAbit: (state) => state.selectedAbit,
    allHistory: (state) => state.history,
  },
  actions: {
    async fetchAbits({ commit }) {
      const response = await axios.get('/abits')
      commit('SET_ABITS', response.data)
    },
    async fetchFullAbits({ commit }) {
      const response = await axios.get('/filter')
      commit('SET_FULL_ABITS', response.data)
    },
    async selectAbit({ commit }, abitID) {
      const response = await axios.get(`/abits/${abitID}`)
      commit('SET_SELECTED_ABIT', response.data)
    },
    async selectFullAbit({ commit }, abitID) {
      const response = await axios.get(`/abits/full/${abitID}`)
      commit('SET_FULL_ABIT', response.data)
    },
    async addAbit({ commit }, newAbit) {
      const response = await axios.post('/abits', newAbit)
      commit('ADD_ABIT', response.data)
    },

    // async deleteAbit({commit}, abitID){
    //     await axios.delete(`/abits/${abitID}`)
    //     commit('DELETE_ABIT',abitID)
    // },
    async updateAbit({ commit }, updatedAbit) {
      const response = await axios.put(`/abits/${updatedAbit.id}`, updatedAbit)
      commit('UPDATE_ABIT', response.data)
    },
    async saveHistory({ commit }, history) {
      const response = await axios.post('/history', history)
      commit('ADD_HISTORY', response.data)
    },
    async fetchHistory({ commit }) {
      const response = await axios.get('/history')
      commit('SET_HISTORY', response.data)
    },
    async updateHistory({ commit }, updatedHistory) {
      const response = await axios.put(
        `/history/${updatedHistory.id}`,
        updatedHistory,
      )
      commit('UPDATE_HISTORY', response.data)
    },
    async deleteHistory({ commit }, id) {
      await axios.delete(`/history/${id}`)
      commit('DELETE_HISTORY', id)
    },
  },
}
