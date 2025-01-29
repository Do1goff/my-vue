import axios from 'axios'

export default {
  state: { access: null, user: null, users: [] },
  mutations: {
    SET_AUTH(state, data) {
      state.access = data
      state.user = data
      sessionStorage.setItem('user', JSON.stringify(data))
    },
    CLEAR_AUTH(state) {
      state.access = null
      state.user = null
    },
    SET_USERS: (state, payload) => (state.users = payload),
    ADD_USER: (state, newUser) => state.users.push(newUser),
    PUT_USER(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.access,
    user: (state) => state.user,
    users: (state) => state.users,
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post('/login', credentials)
      commit('SET_AUTH', response.data)
    },
    logout({ commit }) {
      commit('CLEAR_AUTH')
    },
    async fetchUsers({ commit }) {
      const response = await axios.get(`/users`)
      commit('SET_USERS', response.data)
    },
    async addUser({ commit }, newUser) {
      const response = await axios.post('/users', newUser)
      commit('ADD_USER', response.data)
    },
    async putUsers({ commit }, user) {
      const response = await axios.put(`/users/${user.id}`, user)
      commit('PUT_USER', response.data)
    },
  },
}
