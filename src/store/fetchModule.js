import axios from 'axios'

export default {
  state: {
    nationality: [],
    quota: [],
    listAchievements: [],
    priorityRight: [],
    specialty: [],
    cossack_society: [],
    subjects: [],
    exercises: [],
  },
  mutations: {
    SET_NATIONALITY: (state, payload) => (state.nationality = payload),
    SET_QUOTA: (state, payload) => (state.quota = payload),
    SET_LIST_ACHIEVEMENTS: (state, payload) =>
      (state.listAchievements = payload),
    SET_PRIORITY_RIGHT: (state, payload) => (state.priorityRight = payload),
    SET_SPECIALTY: (state, payload) => (state.specialty = payload),
    SET_COSSACK_SOCIETY: (state, payload) => (state.cossack_society = payload),
    SET_SUBJECTS: (state, payload) => (state.subjects = payload),
    SET_EXERCISES: (state, payload) => (state.exercises = payload),
  },
  getters: {
    nationality: (state) => state.nationality,
    quota: (state) => state.quota,
    listAchievements: (state) => state.listAchievements,
    priorityRight: (state) => state.priorityRight,
    specialty: (state) => state.specialty,
    cossack_society: (state) => state.cossack_society,
    subjects: (state) => state.subjects,
    exercises: (state) => state.exercises,
  },
  actions: {
    async fetchNationality({ commit }) {
      const response = await axios.get('/nationality')
      commit('SET_NATIONALITY', response.data)
    },
    async fetchQuota({ commit }) {
      const response = await axios.get('/quota')
      commit('SET_QUOTA', response.data)
    },
    async fetchPriorityRight({ commit }) {
      const response = await axios.get('/priorityRight')
      commit('SET_PRIORITY_RIGHT', response.data)
    },
    async fetchSpecialty({ commit }) {
      const response = await axios.get('/specialty')
      commit('SET_SPECIALTY', response.data)
    },
    async fetchCossackSociety({ commit }) {
      const response = await axios.get('/cossack_society')
      commit('SET_COSSACK_SOCIETY', response.data)
    },
    async fetchListAchievements({ commit }) {
      const response = await axios.get('/list_achievements')
      commit('SET_LIST_ACHIEVEMENTS', response.data)
    },
    async fetchSubjects({ commit }) {
      const response = await axios.get('/subjects')
      commit('SET_SUBJECTS', response.data)
    },
    async fetchExercises({ commit }) {
      const response = await axios.get('/exercises')
      commit('SET_EXERCISES', response.data)
    },
  },
}
