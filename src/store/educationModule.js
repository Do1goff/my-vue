import axios from 'axios'

export default {
  state: {
    educations: [],
    selectedEducation: null,
    uncanceledEducations: [],
    selectedUncanceledEducation: null,
  },
  mutations: {
    SET_EDUCATIONS: (state, payload) => (state.educations = payload),
    SET_SELECTED_EDUCATION: (state, education) =>
      (state.selectedEducation = education),
    ADD_EDUCATION: (state, newEducation) => state.educations.push(newEducation),

    UPDATE_EDUCATION(state, updatedEducation) {
      const index = state.educations.findIndex(
        (education) => education.id === updatedEducation.id
      )
      if (index !== -1) {
        state.educations.splice(index, 1, updatedEducation)
      }
      state.selectedEducation = updatedEducation
    },

    SET_UNCANCELED_EDUCATIONS: (state, payload) =>
      (state.uncanceledEducations = payload),
    SET_SELECTED_UNCANCELED_EDUCATION: (state, uncanceledEducation) =>
      (state.selectedUncanceledEducation = uncanceledEducation),
    ADD_UNCANCELED_EDUCATION: (state, newUncanceledEducation) =>
      state.uncanceledEducations.push(newUncanceledEducation),

    UPDATE_UNCANCELED_EDUCATION(state, updatedUncanceledEducation) {
      const index = state.uncanceledEducations.findIndex(
        (uncanceledEducation) =>
          uncanceledEducation.id === updatedUncanceledEducation.id
      )
      if (index !== -1) {
        state.uncanceledEducations.splice(index, 1, updatedUncanceledEducation)
      }
      state.selectedUncanceledEducation = updatedUncanceledEducation
    },
  },
  getters: {
    educations: (state) => state.educations,
    selectedEducation: (state) => state.selectedEducation,
    uncanceledEducations: (state) => state.uncanceledEducations,
    selectedUncanceledEducation: (state) => state.selectedUncanceledEducation,
  },
  actions: {
    async fetchEducations({ commit }) {
      const response = await axios.get('/education')
      commit('SET_EDUCATIONS', response.data)
    },
    async selectEducation({ commit }, educationID) {
      const response = await axios.get(`/education/${educationID}`)
      commit('SET_SELECTED_EDUCATION', response.data)
    },
    async addEducation({ commit }, newEducation) {
      const response = await axios.post('/education', newEducation)
      commit('ADD_EDUCATION', response.data)
    },
    async updateEducation({ commit }, updatedEducation) {
      const response = await axios.put(
        `/education/${updatedEducation.abitId}`,
        updatedEducation
      )
      commit('UPDATE_EDUCATION', response.data)
    },

    async fetchUncanceledEducations({ commit }) {
      const response = await axios.get('/uncanceledEducation')
      commit('SET_UNCANCELED_EDUCATIONS', response.data)
    },
    async selectUncanceledEducation({ commit }, educationID) {
      const response = await axios.get(`/uncanceledEducation/${educationID}`)
      commit('SET_SELECTED_UNCANCELED_EDUCATION', response.data)
    },
    async addUncanceledEducation({ commit }, newEducation) {
      const response = await axios.post('/uncanceledEducation', newEducation)
      commit('ADD_UNCANCELED_EDUCATION', response.data)
    },
    async updateUncanceledEducation({ commit }, updatedEducation) {
      const response = await axios.put(
        `/uncanceledEducation/${updatedEducation.abitId}`,
        updatedEducation
      )
      commit('UPDATE_UNCANCELED_EDUCATION', response.data)
    },
  },
}
