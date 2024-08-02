import axios from 'axios'

export default {
  state: {
    nationality: [],
    establishedQuota: [],
    separateQuota: [],
    listAchievements: [],
    priorityRight: [],
    specialty: [],
    cossack_society: [],
    subjects: [],
    exercises: [],
    formsEntranceTest: [],
    familySocialStatus: [],
    categoryEducation: [],
    categoryUncanceledEducation: [],
    militaryInstitute: [],
    militaryRanks: [],
    militaryPlaces: [],
    militarySVO: [],
  },
  mutations: {
    SET_NATIONALITY: (state, payload) => (state.nationality = payload),
    SET_ESTABLISHED_QUOTA: (state, payload) =>
      (state.establishedQuota = payload),
    SET_SEPARATE_QUOTA: (state, payload) => (state.separateQuota = payload),
    SET_LIST_ACHIEVEMENTS: (state, payload) =>
      (state.listAchievements = payload),
    SET_PRIORITY_RIGHT: (state, payload) => (state.priorityRight = payload),
    SET_SPECIALTY: (state, payload) => (state.specialty = payload),
    SET_COSSACK_SOCIETY: (state, payload) => (state.cossack_society = payload),
    SET_SUBJECTS: (state, payload) => (state.subjects = payload),
    SET_EXERCISES: (state, payload) => (state.exercises = payload),
    SET_FORMS_ENTRANCE_TEST: (state, payload) =>
      (state.formsEntranceTest = payload),
    SET_FAMILY_SOCIAL_STATUS: (state, payload) =>
      (state.familySocialStatus = payload),
    SET_CATEGORY_EDUCATION: (state, payload) =>
      (state.categoryEducation = payload),
    SET_CATEGORY_UNCANCELED_EDUCATION: (state, payload) =>
      (state.categoryUncanceledEducation = payload),
    SET_MILITARY_INSTITUTE: (state, payload) =>
      (state.militaryInstitute = payload),
    SET_MILITARY_RANKS: (state, payload) => (state.militaryRanks = payload),
    SET_MILITARY_PLACES: (state, payload) => (state.militaryPlaces = payload),
    SET_MILITARY_SVO: (state, payload) => (state.militarySVO = payload),
  },
  getters: {
    nationality: (state) => state.nationality,
    establishedQuota: (state) => state.establishedQuota,
    separateQuota: (state) => state.separateQuota,
    listAchievements: (state) => state.listAchievements,
    priorityRight: (state) => state.priorityRight,
    specialty: (state) => state.specialty,
    cossack_society: (state) => state.cossack_society,
    subjects: (state) => state.subjects,
    exercises: (state) => state.exercises,
    formsEntranceTest: (state) => state.formsEntranceTest,
    familySocialStatus: (state) => state.familySocialStatus,
    categoryEducation: (state) => state.categoryEducation,
    categoryUncanceledEducation: (state) => state.categoryUncanceledEducation,
    militaryInstitute: (state) => state.militaryInstitute,
    militaryRanks: (state) => state.militaryRanks,
    militaryPlaces: (state) => state.militaryPlaces,
    militarySVO: (state) => state.militarySVO,
  },
  actions: {
    async fetchNationality({ commit }) {
      const response = await axios.get('/nationality')
      commit('SET_NATIONALITY', response.data)
    },
    async fetchEstablishedQuota({ commit }) {
      const response = await axios.get('/establishedQuota')
      commit('SET_ESTABLISHED_QUOTA', response.data)
    },
    async fetchSeparateQuota({ commit }) {
      const response = await axios.get('/separateQuota')
      commit('SET_SEPARATE_QUOTA', response.data)
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
    async fetchFormsEntranceTest({ commit }) {
      const response = await axios.get('/form_entrance_test')
      commit('SET_FORMS_ENTRANCE_TEST', response.data)
    },
    async fetchFamilySocialStatus({ commit }) {
      const response = await axios.get('/family_social_status')
      commit('SET_FAMILY_SOCIAL_STATUS', response.data)
    },
    async fetchCategoryEducation({ commit }) {
      const response = await axios.get('/categoryEducation')
      commit('SET_CATEGORY_EDUCATION', response.data)
    },
    async fetchCategoryUncanceledEducation({ commit }) {
      const response = await axios.get('/categoryUncanceledEducation')
      commit('SET_CATEGORY_UNCANCELED_EDUCATION', response.data)
    },
    async fetchMilitaryInstitute({ commit }) {
      const response = await axios.get('/militaryInstitute')
      commit('SET_MILITARY_INSTITUTE', response.data)
    },
    async fetchMilitaryRanks({ commit }) {
      const response = await axios.get('/militaryRanks')
      commit('SET_MILITARY_RANKS', response.data)
    },
    async fetchMilitaryPlaces({ commit }) {
      const response = await axios.get('/militaryPlaces')
      commit('SET_MILITARY_PLACES', response.data)
    },
    async fetchMilitarySVO({ commit }) {
      const response = await axios.get('/militarySVO')
      commit('SET_MILITARY_SVO', response.data)
    },
  },
}
