import axios from 'axios'

export default {
  state: { personalAchievements: [] },
  mutations: {
    SET_PERSONAL_ACHIEVEMENTS: (state, payload) =>
      (state.personalAchievements = payload),
    ADD_PERSONAL_ACHIEVEMENTS: (state, newAchievement) =>
      state.personalAchievements.push(newAchievement),
    PUT_PERSONAL_ACHIEVEMENTS(state, newAchievement) {
      const index = state.personalAchievements.findIndex(
        (personalAchievements) =>
          personalAchievements.abitAchievementId ===
          newAchievement.abitAchievementId,
      )
      if (index !== -1) {
        state.personalAchievements.splice(index, 1, newAchievement)
      }
    },
  },
  getters: { personalAchievements: (state) => state.personalAchievements },
  actions: {
    async fetchPersonalAchievements({ commit }, achievementId) {
      const response = await axios.get(
        `/personal_achievements/${achievementId}`,
      )
      commit('SET_PERSONAL_ACHIEVEMENTS', response.data)
    },
    async addPersonalAchievements({ commit }, newAchievement) {
      const response = await axios.post(
        '/personal_achievements',
        newAchievement,
      )
      commit('ADD_PERSONAL_ACHIEVEMENTS', response.data)
    },
    async putPersonalAchievements({ commit }, newAchievement) {
      const response = await axios.put(
        `/personal_achievements/${newAchievement.abitAchievementId}`,
        newAchievement,
      )
      commit('PUT_PERSONAL_ACHIEVEMENTS', response.data)
    },
  },
}
