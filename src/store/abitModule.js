import axios from 'axios'

export default {
  state: {
    abits: [],
    selectedAbit: null,
    nationality: [],
    specialty: [],
    cossack_society: [],
    subjects: [],
    militaryCommissariats: [],
    commissions: [],
    examinationGroups: [],
  },
  mutations: {
    SET_ABITS: (state, payload) => (state.abits = payload),
    SET_SELECTED_ABIT: (state, abit) => (state.selectedAbit = abit),
    ADD_ABIT: (state, newAbit) => state.abits.push(newAbit),
    SET_NATIONALITY: (state, payload) => (state.nationality = payload),
    SET_SPECIALTY: (state, payload) => (state.specialty = payload),
    SET_COSSACK_SOCIETY: (state, payload) => (state.cossack_society = payload),
    SET_SUBJECTS: (state, payload) => (state.subjects = payload),
    ADD_MILITARY_COMMISSARIAT: (state, newMilitaryCommissariat) =>
      state.militaryCommissariats.push(newMilitaryCommissariat),
    SET_MILITARY_COMMISSARIAT: (state, payload) =>
      (state.militaryCommissariats = payload),
    ADD_ADMISSION_COMMISSION: (state, newCommission) =>
      state.commissions.push(newCommission),
    SET_ADMISSION_COMMISSION: (state, payload) => (state.commissions = payload),
    ADD_EXAMINATION_GROUP: (state, newGroup) =>
      state.commissions.push(newGroup),
    SET_EXAMINATION_GROUP: (state, payload) =>
      (state.examinationGroups = payload),

    // DELETE_ABIT:(state,abitID)=>state.abits = state.abits.filter(abit => abit.id !== abitID),
    UPDATE_ABIT(state, updatedAbit) {
      const index = state.abits.findIndex((abit) => abit.id === updatedAbit.id)
      if (index !== -1) {
        state.abits.splice(index, 1, updatedAbit)
      }
    },
  },
  getters: {
    allAbits: (state) => state.abits,
    selectedAbit: (state) => state.selectedAbit,
    nationality: (state) => state.nationality,
    specialty: (state) => state.specialty,
    cossack_society: (state) => state.cossack_society,
    subjects: (state) => state.subjects,
    militaryCommissariats: (state) => state.militaryCommissariats,
    commissions: (state) => state.commissions,
    examinationGroups: (state) => state.examinationGroups,
  },
  actions: {
    async fetchAbits({ commit }) {
      const response = await axios.get('http://localhost:4000/abits')
      commit('SET_ABITS', response.data)
    },
    async selectAbit({ commit }, abitID) {
      const response = await axios.get(`http://localhost:4000/abits/${abitID}`)
      commit('SET_SELECTED_ABIT', response.data)
    },
    async addAbit({ commit }, newAbit) {
      const response = await axios.post('http://localhost:4000/abits', newAbit)
      commit('ADD_ABIT', response.data)
    },
    async fetchNationality({ commit }) {
      const response = await axios.get('http://localhost:4000/nationality')
      commit('SET_NATIONALITY', response.data)
    },
    async fetchSpecialty({ commit }) {
      const response = await axios.get('http://localhost:4000/specialty')
      commit('SET_SPECIALTY', response.data)
    },
    async fetchCossackSociety({ commit }) {
      const response = await axios.get('http://localhost:4000/cossack_society')
      commit('SET_COSSACK_SOCIETY', response.data)
    },
    async fetchSubjects({ commit }) {
      const response = await axios.get('http://localhost:4000/subjects')
      commit('SET_SUBJECTS', response.data)
    },
    async fetchMilitaryCommissariats({ commit }) {
      const response = await axios.get(
        'http://localhost:4000/military_commissariat'
      )
      commit('SET_MILITARY_COMMISSARIAT', response.data)
    },
    async addMilitaryCommissariat({ commit }, newMilitaryCommissariat) {
      const response = await axios.post(
        'http://localhost:4000/military_commissariat',
        newMilitaryCommissariat
      )
      commit('ADD_MILITARY_COMMISSARIAT', response.data)
    },
    async fetchAdmissionCommissions({ commit }) {
      const response = await axios.get('http://localhost:4000/commission')
      commit('SET_ADMISSION_COMMISSION', response.data)
    },
    async addAdmissionCommission({ commit }, newCommission) {
      const response = await axios.post(
        'http://localhost:4000/commission',
        newCommission
      )
      commit('ADD_ADMISSION_COMMISSION', response.data)
    },
    async fetchExaminationGroups({ commit }) {
      const response = await axios.get(
        'http://localhost:4000/examination_group'
      )
      commit('SET_EXAMINATION_GROUP', response.data)
    },
    async addExaminationGroup({ commit }, newGroup) {
      const response = await axios.post(
        'http://localhost:4000/examination_group',
        newGroup
      )
      commit('ADD_EXAMINATION_GROUP', response.data)
    },

    // async deleteAbit({commit}, abitID){
    //     await axios.delete(`http://localhost:4000/abits/${abitID}`)
    //     commit('DELETE_ABIT',abitID)
    // },
    async updateAbit({ commit }, updatedAbit) {
      await axios.put(
        `http://localhost:4000/abits/${updatedAbit.id}`,
        updatedAbit
      )
      commit('UPDATE_ABIT', updatedAbit)
    },
  },
}
