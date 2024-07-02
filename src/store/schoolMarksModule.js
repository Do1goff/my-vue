import axios from 'axios'

export default {
  state: { schoolMarks: [] },
  mutations: {
    SET_SCHOOL_MARK: (state, payload) => (state.schoolMarks = payload),
    ADD_SCHOOL_MARK: (state, newMark) => state.schoolMarks.push(newMark),
    PUT_SCHOOL_MARK(state, newMark) {
      const index = state.schoolMarks.findIndex(
        (schoolMarks) => schoolMarks.id === newMark.abitSubjectId
      )
      if (index !== -1) {
        state.schoolMarks.splice(index, 1, newMark)
      }
    },
  },
  getters: { schoolMarks: (state) => state.schoolMarks },
  actions: {
    async fetchSchoolMark({ commit }, markId) {
      const response = await axios.get(`/school_marks/${markId}`)
      commit('SET_SCHOOL_MARK', response.data)
    },
    async addSchoolMark({ commit }, newMark) {
      const response = await axios.post('/school_marks', newMark)
      commit('ADD_SCHOOL_MARK', response.data)
    },
    async putSchoolMark({ commit }, newMark) {
      const response = await axios.put(
        `/school_marks/${newMark.abitSubjectId}`,
        newMark
      )
      commit('PUT_SCHOOL_MARK', response.data)
    },
  },
}
