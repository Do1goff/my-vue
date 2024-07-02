import axios from 'axios'

export default {
  state: {
    abits: [],
    selectedAbit: null,
  },
  mutations: {
    SET_ABITS: (state, payload) => (state.abits = payload),
    SET_SELECTED_ABIT: (state, abit) => (state.selectedAbit = abit),
    ADD_ABIT: (state, newAbit) => state.abits.push(newAbit),

    // DELETE_ABIT:(state,abitID)=>state.abits = state.abits.filter(abit => abit.id !== abitID),
    UPDATE_ABIT(state, updatedAbit) {
      const index = state.abits.findIndex((abit) => abit.id === updatedAbit.id)
      if (index !== -1) {
        state.abits.splice(index, 1, updatedAbit)
      }
      state.selectedAbit = updatedAbit
    },
  },
  getters: {
    allAbits: (state) => state.abits,
    selectedAbit: (state) => state.selectedAbit,
  },
  actions: {
    async fetchAbits({ commit }) {
      const response = await axios.get('/abits')
      commit('SET_ABITS', response.data)
    },
    async selectAbit({ commit }, abitID) {
      const response = await axios.get(`/abits/${abitID}`)
      commit('SET_SELECTED_ABIT', response.data)
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
  },
}
