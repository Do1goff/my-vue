import axios from 'axios'

export default {
  state: { egeMarks: [], allEgeMarks: [] },
  mutations: {
    SET_EGE_MARK: (state, payload) => (state.egeMarks = payload),
    SET_ALL_EGE_MARK: (state, payload) => (state.allEgeMarks = payload),
    ADD_EGE_MARK: (state, newMark) => state.egeMarks.push(newMark),
    PUT_EGE_MARK(state, newMark) {
      const index = state.egeMarks.findIndex(
        (egeMarks) => egeMarks.id === newMark.abitSubjectId,
      )
      if (index !== -1) {
        state.egeMarks.splice(index, 1, newMark)
      }
    },
  },
  getters: {
    egeMarks: (state) => state.egeMarks,
    allEgeMarks: (state) => state.allEgeMarks,
  },
  actions: {
    async fetchEgeMark({ commit }, markId) {
      const response = await axios.get(`/ege_marks/${markId}`)
      commit('SET_EGE_MARK', response.data)
    },
    async fetchAllEgeMarks({ commit }) {
      const response = await axios.get(`/ege_marks`)
      commit('SET_ALL_EGE_MARK', response.data)
    },
    async addEgeMark({ commit }, newMark) {
      const response = await axios.post('/ege_marks', newMark)
      commit('ADD_EGE_MARK', response.data)
    },
    async putEgeMark({ commit }, newMark) {
      const response = await axios.put(
        `/ege_marks/${newMark.abitSubjectId}`,
        newMark,
      )
      commit('PUT_EGE_MARK', response.data)
    },
  },
}
