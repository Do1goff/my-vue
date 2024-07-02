import axios from 'axios'

export default {
  state: { entranceTestMarks: [] },
  mutations: {
    SET_ENTRANCE_TEST_MARK: (state, payload) =>
      (state.entranceTestMarks = payload),
    ADD_ENTRANCE_TEST_MARK: (state, newMark) =>
      state.entranceTestMarks.push(newMark),
    PUT_ENTRANCE_TEST_MARK(state, newMark) {
      const index = state.entranceTestMarks.findIndex(
        (entranceTestMarks) => entranceTestMarks.id === newMark.abitSubjectId
      )
      if (index !== -1) {
        state.entranceTestMarks.splice(index, 1, newMark)
      }
    },
  },
  getters: { entranceTestMarks: (state) => state.entranceTestMarks },
  actions: {
    async fetchEntranceTestMark({ commit }, markId) {
      const response = await axios.get(`/entrance_test/${markId}`)
      commit('SET_ENTRANCE_TEST_MARK', response.data)
    },
    async addEntranceTestMark({ commit }, newMark) {
      const response = await axios.post('/entrance_test', newMark)
      commit('ADD_ENTRANCE_TEST_MARK', response.data)
    },
    async putEntranceTestMark({ commit }, newMark) {
      const response = await axios.put(
        `/entrance_test/${newMark.abitSubjectId}`,
        newMark
      )
      commit('PUT_ENTRANCE_TEST_MARK', response.data)
    },
  },
}
