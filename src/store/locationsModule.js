import axios from 'axios'

export default {
  state: {
    regions: [],
    districts: [],
    districtsByRegion: [],
    cities: [],
    citiesByDistrict: [],
    statusesLocations: [],
    location: null,
    locations: [],
  },
  mutations: {
    ADD_REGION: (state, newData) => state.regions.push(newData),
    SET_REGION: (state, payload) => (state.regions = payload),
    ADD_DISTRICT: (state, newData) => state.districts.push(newData),
    SET_DISTRICT: (state, payload) => (state.districts = payload),
    SET_DISTRICT_BY_REGION: (state, payload) =>
      (state.districtsByRegion = payload),
    ADD_CITY: (state, newData) => state.cities.push(newData),
    SET_CITY: (state, payload) => (state.cities = payload),
    SET_CITIES_BY_DISTRICT: (state, payload) =>
      (state.citiesByDistrict = payload),
    SET_STATUSES_LOCATIONS: (state, payload) =>
      (state.statusesLocations = payload),

    SET_LOCATIONS: (state, payload) => (state.locations = payload),
    SET_LOCATION: (state, location) => (state.location = location),
    ADD_LOCATION(state, newLocation) {
      state.locations.push(newLocation)
      state.location = newLocation
    },
    UPDATE_LOCATION(state, updatedLocation) {
      const index = state.locations.findIndex(
        (location) => location.id === updatedLocation.id
      )
      if (index !== -1) {
        state.locations.splice(index, 1, updatedLocation)
      }
      state.location = updatedLocation
    },
  },
  getters: {
    regions: (state) => state.regions,
    districts: (state) => state.districts,
    districtsByRegion: (state) => state.districtsByRegion,
    cities: (state) => state.cities,
    citiesByDistrict: (state) => state.citiesByDistrict,
    statusesLocations: (state) => state.statusesLocations,
    locations: (state) => state.locations,
    location: (state) => state.location,
  },
  actions: {
    async fetchRegions({ commit }) {
      const response = await axios.get('/regions')
      commit('SET_REGION', response.data)
    },
    async addRegion({ commit }, newData) {
      const response = await axios.post('/regions', newData)
      commit('ADD_REGION', response.data)
    },
    async fetchDistricts({ commit }) {
      const response = await axios.get('/districts')
      commit('SET_DISTRICT', response.data)
    },
    async addDistrict({ commit }, newData) {
      const response = await axios.post('/districts', newData)
      commit('ADD_DISTRICT', response.data)
    },
    async fetchDistrictsByRegion({ commit }, regionId) {
      const response = await axios.get(`/regions/${regionId}/districts`)
      commit('SET_DISTRICT_BY_REGION', response.data.districts)
    },
    async fetchCities({ commit }) {
      const response = await axios.get('/cities')
      commit('SET_CITY', response.data)
    },
    async addCity({ commit }, newData) {
      const response = await axios.post('/cities', newData)
      commit('ADD_CITY', response.data)
    },
    async fetchCitiesByDistrict({ commit }, districtId) {
      const response = await axios.get(`/districts/${districtId}/cities`)
      commit('SET_CITIES_BY_DISTRICT', response.data.cities)
    },
    async fetchStatusesLocations({ commit }) {
      const response = await axios.get('/statusesLocations')
      commit('SET_STATUSES_LOCATIONS', response.data)
    },

    async fetchLocations({ commit }) {
      const response = await axios.get('/locations')
      commit('SET_LOCATIONS', response.data)
    },
    async selectLocation({ commit }, locationID) {
      const response = await axios.get(`/locations/${locationID}`)
      commit('SET_LOCATION', response.data)
    },
    async addLocation({ commit }, newLocation) {
      const response = await axios.post('/locations', newLocation)
      commit('ADD_LOCATION', response.data)
    },
    async updateLocation({ commit }, updatedLocation) {
      const response = await axios.put(
        `/locations/${updatedLocation.id}`,
        updatedLocation
      )
      commit('UPDATE_LOCATION', response.data)
    },
  },
}
