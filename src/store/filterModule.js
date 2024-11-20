import axios from 'axios'
export default {
  state: {
    filteredAbits: null,
    filterTemplates: [],
  },
  mutations: {
    FILTER: (state, payload) => (state.filteredAbits = payload),
    FILTER_TEMPLATES: (state, payload) => (state.filterTemplates = payload),
  },
  getters: {
    filteredAbits: (state) => state.filteredAbits,
    filterTemplates: (state) => state.filterTemplates,
  },
  actions: {
    async filterAbits({ commit }, filters) {
      const response = await axios.post('/filter', filters)
      commit('FILTER', response.data)
    },
    async exportFilterToExcel(data) {
      const response = await axios.post('/filter/export', data, {
        responseType: 'blob',
      })
      const blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel',
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'filter.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    async getFilterTemplates({ commit }) {
      const response = await axios.get('/filter/template')
      commit('FILTER_TEMPLATES', response.data)
    },
    async addFilterTemplate({ commit }, data) {
      const response = await axios.post('/filter/template', data)
      commit('FILTER_TEMPLATES', response.data)
    },
  },
}
