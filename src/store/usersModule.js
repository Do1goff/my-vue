import axios from 'axios'

export default {
  state: { token: null, user: null },
  mutations: {
    SET_AUTH(state, data) {
      state.token = data
      state.user = data
      // localStorage.setItem('user', data)
    },
    CLEAR_AUTH(state) {
      state.token = null
      state.user = null
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post('/login', credentials)
      commit('SET_AUTH', response.data)
    },
    logout({ commit }) {
      commit('CLEAR_AUTH')
    },
  },
}
