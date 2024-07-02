import axios from 'axios'

export default {
  state: { egeMarks: [] },
  mutations: {
    SET_EGE_MARK: (state, payload) => (state.egeMarks = payload),
    ADD_EGE_MARK: (state, newMark) => state.egeMarks.push(newMark),
    PUT_EGE_MARK(state, newMark) {
      const index = state.egeMarks.findIndex(
        (egeMarks) => egeMarks.id === newMark.abitSubjectId
      )
      if (index !== -1) {
        state.egeMarks.splice(index, 1, newMark)
      }
    },
  },
  getters: { egeMarks: (state) => state.egeMarks },
  actions: {
    async fetchEgeMark({ commit }, markId) {
      const response = await axios.get(`/ege_marks/${markId}`)
      commit('SET_EGE_MARK', response.data)
    },
    async addEgeMark({ commit }, newMark) {
      const response = await axios.post('/ege_marks', newMark)
      commit('ADD_EGE_MARK', response.data)
    },
    async putEgeMark({ commit }, newMark) {
      const response = await axios.put(
        `/ege_marks/${newMark.abitSubjectId}`,
        newMark
      )
      commit('PUT_EGE_MARK', response.data)
    },
  },
}
