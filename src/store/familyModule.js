import axios from 'axios'

export default {
  state: { family: [] },
  mutations: {
    SET_FAMILY: (state, payload) => (state.family = payload),
    ADD_FAMILY: (state, newMember) => state.family.push(newMember),
    PUT_FAMILY(state, newMember) {
      const index = state.family.findIndex(
        (family) => family.id === newMember.id,
      )
      if (index !== -1) {
        state.family.splice(index, 1, newMember)
      }
    },
  },
  getters: { family: (state) => state.family },
  actions: {
    async fetchFamily({ commit }, memberId) {
      const response = await axios.get(`/family/${memberId}`)
      commit('SET_FAMILY', response.data)
    },
    async addFamily({ commit }, newMember) {
      const response = await axios.post('/family', newMember)
      commit('ADD_FAMILY', response.data)
    },
    async putFamily({ commit }, newMember) {
      const response = await axios.put(`/family/${newMember.id}`, newMember)
      commit('PUT_FAMILY', response.data)
    },
  },
}
