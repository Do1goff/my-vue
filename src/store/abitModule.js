import axios from 'axios'

export default {
  state: {
    abits: [],
    selectedAbit: null,
    nationality: [],
    quota: [],
    telephones: [],
    family: [],
    listAchievements: [],
    personalAchievements: [],
    priorityRight: [],
    specialty: [],
    cossack_society: [],
    subjects: [],
    exercises: [],
    schoolMarks: [],
    egeMarks: [],
    entranceTestMarks: [],
    sportScores: [],
    militaryCommissariats: [],
    commissions: [],
    examinationGroups: [],
    addresses: [],
    institutes: [],
  },
  mutations: {
    SET_ABITS: (state, payload) => (state.abits = payload),
    SET_SELECTED_ABIT: (state, abit) => (state.selectedAbit = abit),
    ADD_ABIT: (state, newAbit) => state.abits.push(newAbit),
    SET_NATIONALITY: (state, payload) => (state.nationality = payload),
    SET_QUOTA: (state, payload) => (state.quota = payload),
    SET_TELEPHONES: (state, payload) => (state.telephones = payload),
    ADD_TELEPHONES: (state, newNumber) => state.telephones.push(newNumber),
    PUT_TELEPHONES(state, newNumber) {
      const index = state.telephones.findIndex(
        (telephones) => telephones.id === newNumber.id
      )
      if (index !== -1) {
        state.telephones.splice(index, 1, newNumber)
      }
      // state.selectedAbit = updatedAbit
    },
    SET_FAMILY: (state, payload) => (state.family = payload),
    ADD_FAMILY: (state, newMember) => state.family.push(newMember),
    PUT_FAMILY(state, newMember) {
      const index = state.family.findIndex(
        (family) => family.id === newMember.id
      )
      if (index !== -1) {
        state.family.splice(index, 1, newMember)
      }
      // state.selectedAbit = updatedAbit
    },
    SET_LIST_ACHIEVEMENTS: (state, payload) =>
      (state.listAchievements = payload),
    SET_PERSONAL_ACHIEVEMENTS: (state, payload) =>
      (state.personalAchievements = payload),
    ADD_PERSONAL_ACHIEVEMENTS: (state, newAchievement) =>
      state.personalAchievements.push(newAchievement),
    PUT_PERSONAL_ACHIEVEMENTS(state, newAchievement) {
      const index = state.personalAchievements.findIndex(
        (personalAchievements) =>
          personalAchievements.abitAchievementId ===
          newAchievement.abitAchievementId
      )
      if (index !== -1) {
        state.personalAchievements.splice(index, 1, newAchievement)
      }
    },
    SET_PRIORITY_RIGHT: (state, payload) => (state.priorityRight = payload),
    SET_SPECIALTY: (state, payload) => (state.specialty = payload),
    SET_COSSACK_SOCIETY: (state, payload) => (state.cossack_society = payload),
    SET_SUBJECTS: (state, payload) => (state.subjects = payload),
    SET_EXERCISES: (state, payload) => (state.exercises = payload),
    SET_SCHOOL_MARK: (state, payload) => (state.schoolMarks = payload),
    ADD_SCHOOL_MARK: (state, newMark) => state.schoolMarks.push(newMark),
    PUT_SCHOOL_MARK(state, newMark) {
      // state.schoolMarks.splice(newMark.abitSubjectId, 1, newMark),
      const index = state.schoolMarks.findIndex(
        (schoolMarks) => schoolMarks.id === newMark.abitSubjectId
      )
      if (index !== -1) {
        state.schoolMarks.splice(index, 1, newMark)
      }
      // state.selectedAbit = updatedAbit
    },
    SET_EGE_MARK: (state, payload) => (state.egeMarks = payload),
    ADD_EGE_MARK: (state, newMark) => state.egeMarks.push(newMark),
    PUT_EGE_MARK(state, newMark) {
      // state.schoolMarks.splice(newMark.abitSubjectId, 1, newMark),
      const index = state.egeMarks.findIndex(
        (egeMarks) => egeMarks.id === newMark.abitSubjectId
      )
      if (index !== -1) {
        state.egeMarks.splice(index, 1, newMark)
      }
      // state.selectedAbit = updatedAbit
    },
    // PUT_EGE_MARK: (state, newMark) =>
    //   state.egeMarks.splice(newMark.abitSubjectId, 1, newMark),
    SET_ENTRANCE_TEST_MARK: (state, payload) =>
      (state.entranceTestMarks = payload),
    ADD_ENTRANCE_TEST_MARK: (state, newMark) =>
      state.entranceTestMarks.push(newMark),
    PUT_ENTRANCE_TEST_MARK(state, newMark) {
      // state.schoolMarks.splice(newMark.abitSubjectId, 1, newMark),
      const index = state.entranceTestMarks.findIndex(
        (entranceTestMarks) => entranceTestMarks.id === newMark.abitSubjectId
      )
      if (index !== -1) {
        state.entranceTestMarks.splice(index, 1, newMark)
      }
      // state.selectedAbit = updatedAbit
    },
    // PUT_ENTRANCE_TEST_MARK: (state, newMark) =>
    //   state.entranceTestMarks.splice(newMark.abitSubjectId, 1, newMark),
    SET_SPORT_SCORE: (state, payload) => (state.sportScores = payload),
    ADD_SPORT_SCORE: (state, newScore) => state.sportScores.push(newScore),
    PUT_SPORT_SCORE(state, newMark) {
      // state.schoolMarks.splice(newMark.abitSubjectId, 1, newMark),
      const index = state.sportScores.findIndex(
        (sportScores) => sportScores.id === newMark.id
      )
      if (index !== -1) {
        state.sportScores.splice(index, 1, newMark)
      }
      // state.selectedAbit = updatedAbit
    },
    ADD_MILITARY_COMMISSARIAT: (state, newMilitaryCommissariat) =>
      state.militaryCommissariats.push(newMilitaryCommissariat),
    SET_MILITARY_COMMISSARIAT: (state, payload) =>
      (state.militaryCommissariats = payload),
    ADD_ADMISSION_COMMISSION: (state, newCommission) =>
      state.commissions.push(newCommission),
    SET_ADMISSION_COMMISSION: (state, payload) => (state.commissions = payload),
    ADD_EXAMINATION_GROUP: (state, newGroup) =>
      state.examinationGroups.push(newGroup),
    SET_EXAMINATION_GROUP: (state, payload) =>
      (state.examinationGroups = payload),
    ADD_ADDRESS: (state, newAddress) => state.addresses.push(newAddress),
    SET_ADDRESS: (state, payload) => (state.addresses = payload),
    ADD_INSTITUTE: (state, newInstitute) => state.institutes.push(newInstitute),
    SET_INSTITUTE: (state, payload) => (state.institutes = payload),

    // DELETE_ABIT:(state,abitID)=>state.abits = state.abits.filter(abit => abit.id !== abitID),
    UPDATE_ABIT(state, updatedAbit) {
      const index = state.abits.findIndex((abit) => abit.id === updatedAbit.id)
      if (index !== -1) {
        state.abits.splice(index, 1, updatedAbit)
      }
      state.selectedAbit = updatedAbit
    },
  },
  getters: {
    allAbits: (state) => state.abits,
    selectedAbit: (state) => state.selectedAbit,
    nationality: (state) => state.nationality,
    quota: (state) => state.quota,
    telephones: (state) => state.telephones,
    family: (state) => state.family,
    listAchievements: (state) => state.listAchievements,
    personalAchievements: (state) => state.personalAchievements,
    priorityRight: (state) => state.priorityRight,
    specialty: (state) => state.specialty,
    cossack_society: (state) => state.cossack_society,
    subjects: (state) => state.subjects,
    exercises: (state) => state.exercises,
    schoolMarks: (state) => state.schoolMarks,
    egeMarks: (state) => state.egeMarks,
    entranceTestMarks: (state) => state.entranceTestMarks,
    sportScores: (state) => state.sportScores,
    militaryCommissariats: (state) => state.militaryCommissariats,
    commissions: (state) => state.commissions,
    examinationGroups: (state) => state.examinationGroups,
    addresses: (state) => state.addresses,
    institutes: (state) => state.institutes,
  },
  actions: {
    async fetchAbits({ commit }) {
      const response = await axios.get('/abits')
      commit('SET_ABITS', response.data)
    },
    async selectAbit({ commit }, abitID) {
      const response = await axios.get(`/abits/${abitID}`)
      commit('SET_SELECTED_ABIT', response.data)
    },
    async addAbit({ commit }, newAbit) {
      const response = await axios.post('/abits', newAbit)
      commit('ADD_ABIT', response.data)
    },

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

    async fetchTelephones({ commit }, numberId) {
      const response = await axios.get(`/telephone/${numberId}`)
      commit('SET_TELEPHONES', response.data)
    },
    async addTelephones({ commit }, newNumber) {
      const response = await axios.post('/telephone', newNumber)
      commit('ADD_TELEPHONES', response.data)
    },
    async putTelephones({ commit }, newNumber) {
      const response = await axios.put(`/telephone/${newNumber.id}`, newNumber)
      commit('PUT_TELEPHONES', response.data)
    },

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

    async fetchListAchievements({ commit }) {
      const response = await axios.get('/list_achievements')
      commit('SET_LIST_ACHIEVEMENTS', response.data)
    },
    async fetchPersonalAchievements({ commit }, achievementId) {
      const response = await axios.get(
        `/personal_achievements/${achievementId}`
      )
      commit('SET_PERSONAL_ACHIEVEMENTS', response.data)
    },
    async addPersonalAchievements({ commit }, newAchievement) {
      const response = await axios.post(
        '/personal_achievements',
        newAchievement
      )
      commit('ADD_PERSONAL_ACHIEVEMENTS', response.data)
    },
    async putPersonalAchievements({ commit }, newAchievement) {
      const response = await axios.put(
        `/personal_achievements/${newAchievement.abitAchievementId}`,
        newAchievement
      )
      commit('PUT_PERSONAL_ACHIEVEMENTS', response.data)
    },

    async fetchSubjects({ commit }) {
      const response = await axios.get('/subjects')
      commit('SET_SUBJECTS', response.data)
    },
    async fetchExercises({ commit }) {
      const response = await axios.get('/exercises')
      commit('SET_EXERCISES', response.data)
    },
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

    async fetchEgeMark({ commit }, markId) {
      const response = await axios.get(`/ege_marks/${markId}`)
      commit('SET_EGE_MARK', response.data)
    },
    async addEgeMark({ commit }, newMark) {
      const response = await axios.post('/ege_marks', newMark)
      commit('ADD_EGE_MARK', response.data)
    },
    async putEgeMark({ commit }, newMark) {
      const response = await axios.put(
        `/ege_marks/${newMark.abitSubjectId}`,
        newMark
      )
      commit('PUT_EGE_MARK', response.data)
    },
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
    // async fetchSportScore({ commit }) {
    //   const response = await axios.get('/sport')
    //   commit('SET_SPORT_SCORE', response.data)
    // },
    // async addSportScore({ commit }, newScore) {
    //   const response = await axios.post('/sport', newScore)
    //   commit('ADD_SPORT_SCORE', response.data)
    // },
    async fetchSportScore({ commit }, markId) {
      const response = await axios.get(`/sport/${markId}`)
      commit('SET_SPORT_SCORE', response.data)
    },
    async addSportScore({ commit }, newMark) {
      const response = await axios.post('/sport', newMark)
      commit('ADD_SPORT_SCORE', response.data)
    },
    async putSportScore({ commit }, newMark) {
      const response = await axios.put(`/sport/${newMark.id}`, newMark)
      commit('PUT_SPORT_SCORE', response.data)
    },
    async fetchMilitaryCommissariats({ commit }) {
      const response = await axios.get('/military_commissariat')
      commit('SET_MILITARY_COMMISSARIAT', response.data)
    },
    async addMilitaryCommissariat({ commit }, newMilitaryCommissariat) {
      const response = await axios.post(
        '/military_commissariat',
        newMilitaryCommissariat
      )
      commit('ADD_MILITARY_COMMISSARIAT', response.data)
    },

    async fetchAdmissionCommissions({ commit }) {
      const response = await axios.get('/commission')
      commit('SET_ADMISSION_COMMISSION', response.data)
    },
    async addAdmissionCommission({ commit }, newCommission) {
      const response = await axios.post('/commission', newCommission)
      commit('ADD_ADMISSION_COMMISSION', response.data)
    },

    async fetchExaminationGroups({ commit }) {
      const response = await axios.get('/examination_group')
      commit('SET_EXAMINATION_GROUP', response.data)
    },
    async addExaminationGroup({ commit }, newGroup) {
      const response = await axios.post('/examination_group', newGroup)
      commit('ADD_EXAMINATION_GROUP', response.data)
    },

    async fetchAddresses({ commit }) {
      const response = await axios.get('/addresses')
      commit('SET_ADDRESS', response.data)
    },
    async addAddresses({ commit }, newAddress) {
      const response = await axios.post('/addresses', newAddress)
      commit('ADD_ADDRESS', response.data)
    },

    async fetchInstitutes({ commit }) {
      const response = await axios.get('/institutes')
      commit('SET_INSTITUTE', response.data)
    },
    async addInstitutes({ commit }, newInstitute) {
      const response = await axios.post('/institutes', newInstitute)
      commit('ADD_INSTITUTE', response.data)
    },
    // async deleteAbit({commit}, abitID){
    //     await axios.delete(`/abits/${abitID}`)
    //     commit('DELETE_ABIT',abitID)
    // },
    async updateAbit({ commit }, updatedAbit) {
      const response = await axios.put(`/abits/${updatedAbit.id}`, updatedAbit)
      commit('UPDATE_ABIT', response.data)
    },
  },
}
