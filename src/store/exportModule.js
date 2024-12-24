import axios from 'axios'
export default {
  state: {
    importedData: [],
    exportedData: null,
    ppo_results: [],
    ppo_group: null,
    ege_results: [],
    entrance_results: [],
    sport_results: [],
    calls_results: [],
  },
  mutations: {
    IMPORT: (state, payload) => (state.importedData = payload),
    EXPORT: (state, payload) => (state.exportedData = payload),
    IMPORT_PPO: (state, payload) => (
      (state.ppo_results = payload.data), (state.ppo_group = payload.group)
    ),
    IMPORT_EGE: (state, payload) => (state.ege_results = payload),
    IMPORT_ENTRANCE: (state, payload) => (state.entrance_results = payload),
    IMPORT_SPORT: (state, payload) => (state.sport_results = payload),
    IMPORT_CALLS: (state, payload) => (state.calls_results = payload),
  },
  getters: {
    importedData: (state) => state.importedData,
    exportedData: (state) => state.exportedData,
    ppo_results: (state) => state.ppo_results,
    ppo_group: (state) => state.ppo_group,
    ege_results: (state) => state.ege_results,
    entrance_results: (state) => state.entrance_results,
    sport_results: (state) => state.sport_results,
    calls_results: (state) => state.calls_results,
  },
  actions: {
    async importFromExcel({ commit }, file) {
      const response = await axios.post('/export', file)
      commit('IMPORT', response.data)
    },
    async exportToExcel({ commit }) {
      const response = await axios.get('/export', { responseType: 'blob' })
      console.log(response)
      const blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel',
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'abits.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      commit('EXPORT', response.data)
    },
    async egeFromExcel({ commit }, file) {
      const response = await axios.post('/export/ege', file)
      commit('IMPORT_EGE', response.data)
    },
    async sportFromExcel({ commit }, file) {
      const response = await axios.post('/export/sport', file)
      commit('IMPORT_SPORT', response.data)
    },
    async entranceFromExcel({ commit }, file) {
      const response = await axios.post('/export/entrance', file)
      commit('IMPORT_ENTRANCE', response.data)
    },
    async ppoFromExcel({ commit }, file) {
      const response = await axios.post('/export/ppo', file)
      commit('IMPORT_PPO', response.data)
    },
    async callsFromExcel({ commit }, file) {
      const response = await axios.post('/export/calls', file)
      commit('IMPORT_CALLS', response.data)
    },
    async egeToCSV({ commit }) {
      const response = await axios.post('/export/egeCSV', {
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'egeCSV.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      commit('EXPORT', response.data)
    },
    async exportToTemplateExcel({ commit }, { data, fileName }) {
      const response = await axios.post(
        '/export/toTemplateExcel',
        { data, fileName },
        {
          responseType: 'blob',
        }
      )
      console.log(response)
      const blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel',
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      commit('EXPORT', response.data)
    },
    async exportToWord({ commit }, { data, fileName }) {
      const response = await axios.post(
        '/export/word',
        { data, fileName },
        {
          responseType: 'blob',
        }
      )

      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      commit('EXPORT', response.data)
    },
    async holesToStatements({ commit }, data) {
      const response = await axios.post('/export/holesStatements', data, {
        responseType: 'blob',
      })
      console.log(response)
      const blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel',
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'PPO.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      commit('EXPORT', response.data)
    },
  },
}
