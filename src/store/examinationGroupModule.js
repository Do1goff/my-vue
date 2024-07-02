import axios from 'axios'

export default {
  state: { examinationGroups: [] },
  mutations: {
    ADD_EXAMINATION_GROUP: (state, newGroup) =>
      state.examinationGroups.push(newGroup),
    SET_EXAMINATION_GROUP: (state, payload) =>
      (state.examinationGroups = payload),
  },
  getters: { examinationGroups: (state) => state.examinationGroups },
  actions: {
    async fetchExaminationGroups({ commit }) {
      const response = await axios.get('/examination_group')
      commit('SET_EXAMINATION_GROUP', response.data)
    },
    async addExaminationGroup({ commit }, newGroup) {
      const response = await axios.post('/examination_group', newGroup)
      commit('ADD_EXAMINATION_GROUP', response.data)
    },
  },
}
