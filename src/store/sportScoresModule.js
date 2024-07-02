import axios from 'axios'

export default {
  state: { sportScores: [] },
  mutations: {
    SET_SPORT_SCORE: (state, payload) => (state.sportScores = payload),
    ADD_SPORT_SCORE: (state, newScore) => state.sportScores.push(newScore),
    PUT_SPORT_SCORE(state, newMark) {
      const index = state.sportScores.findIndex(
        (sportScores) => sportScores.id === newMark.id
      )
      if (index !== -1) {
        state.sportScores.splice(index, 1, newMark)
      }
    },
  },
  getters: { sportScores: (state) => state.sportScores },
  actions: {
    async fetchSportScore({ commit }, markId) {
      const response = await axios.get(`/sport/${markId}`)
      commit('SET_SPORT_SCORE', response.data)
    },
    async addSportScore({ commit }, newMark) {
      const response = await axios.post('/sport', newMark)
      commit('ADD_SPORT_SCORE', response.data)
    },
    async putSportScore({ commit }, newMark) {
      const response = await axios.put(`/sport/${newMark.id}`, newMark)
      commit('PUT_SPORT_SCORE', response.data)
    },
  },
}
