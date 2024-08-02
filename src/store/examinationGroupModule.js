import axios from 'axios'

export default {
  state: { examinationGroups: [], countGroup: 0 },
  mutations: {
    ADD_EXAMINATION_GROUP: (state, newGroup) =>
      state.examinationGroups.push(newGroup),
    SET_EXAMINATION_GROUP: (state, payload) =>
      (state.examinationGroups = payload),
    SET_COUNT_GROUP: (state, payload) => (state.countGroup = payload),
  },
  getters: {
    examinationGroups: (state) => state.examinationGroups,
    countGroup: (state) => state.countGroup,
  },
  actions: {
    async fetchExaminationGroups({ commit }) {
      const response = await axios.get('/examination_group')
      commit('SET_EXAMINATION_GROUP', response.data)
    },
    async addExaminationGroup({ commit }, newGroup) {
      const response = await axios.post('/examination_group', newGroup)
      commit('ADD_EXAMINATION_GROUP', response.data)
    },
    async fetchCountGroup({ commit }, groupId) {
      const response = await axios.get(`/abits/examGroup/${groupId}`)
      commit('SET_COUNT_GROUP', response.data)
    },
  },
}
