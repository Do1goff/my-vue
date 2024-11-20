<template>
  <v-dialog
    v-model="citySelectDialog"
    max-width="2500px"
    @click:outside="closeSelect"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        v-bind="attrs"
        v-on="on"
        @click="openSelect"
      >
        Выбрать
      </v-btn>
    </template>
    <v-form
      ref="formLocation"
      v-model="formLocationValid"
    >
      <v-card>
        <v-card-title> Выбрать </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-autocomplete
                label="Регион"
                v-model="selectedRegion"
                :items="regions"
                :rules="[rules.required]"
                :item-text="nameAndStatusRegions"
                item-value="id"
                @input="selectRegion"
              >
                <template #no-data>
                  <v-dialog
                    v-model="regionDialog"
                    max-width="2500px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Добавить
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title> Добавить </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                v-model="editRegion.name"
                                label="Регион"
                              />
                            </v-col>
                            <v-col cols="6">
                              <v-autocomplete
                                v-model="editRegion.status"
                                :items="statusesLocations"
                                item-text="name"
                                item-value="id"
                                label="Статус"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          text
                          @click="addNewRegion"
                        >
                          Сохранить
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                label="Район"
                v-model="selectedDistrict"
                :items="districtsByRegion"
                :item-text="nameAndStatusDistricts"
                item-value="id"
                @input="selectDistrict"
                :disabled="
                  selectedRegion !== 0 ? districtsByRegion.length == 0 : true
                "
              >
                <template #no-data>
                  <v-dialog
                    v-model="districtDialog"
                    max-width="2500px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Добавить
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title> Добавить </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="4">
                              <v-autocomplete
                                label="Регион"
                                v-model="selectedRegion"
                                :items="regions"
                                :item-text="nameAndStatusRegions"
                                item-value="id"
                              />
                            </v-col>
                            <v-col cols="4">
                              <v-text-field
                                v-model="editDistrict.name"
                                label="Район"
                              />
                            </v-col>
                            <v-col cols="4">
                              <v-select
                                v-model="editDistrict.status"
                                :items="statusesLocations"
                                item-text="name"
                                item-value="id"
                                label="Статус"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          text
                          @click="addNewDistrict"
                        >
                          Сохранить
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                label="Город"
                v-model="selectedCity"
                :items="citiesByDistrict"
                :item-text="nameAndStatusCities"
                item-value="id"
                @input="selectCity"
                :disabled="
                  selectedDistrict !== 0 ? citiesByDistrict.length == 0 : true
                "
              >
                <template #no-data>
                  <v-dialog
                    v-model="cityDialog"
                    max-width="2500px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Добавить
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title> Добавить </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col>
                              <v-autocomplete
                                label="Регион"
                                v-model="selectedRegion"
                                :items="regions"
                                :item-text="nameAndStatusRegions"
                                item-value="id"
                                @input="selectRegion"
                              />
                            </v-col>
                            <v-col>
                              <v-autocomplete
                                label="Район"
                                v-model="selectedDistrict"
                                :items="districtsByRegion"
                                :item-text="nameAndStatusDistricts"
                                item-value="id"
                              />
                            </v-col>
                            <v-col>
                              <v-text-field
                                v-model="editCity.name"
                                label="Город"
                              />
                            </v-col>
                            <v-col cols="4">
                              <v-select
                                v-model="editCity.status"
                                :items="statusesLocations"
                                item-text="name"
                                item-value="id"
                                label="Статус"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          text
                          @click="addNewCity"
                        >
                          Сохранить
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="saveLocation"
            :disabled="!formLocationValid"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'LocationComponent',
  props: ['abit'],
  data() {
    return {
      data: {},
      formLocationValid: false,
      rules: {
        required: (value) => !!value || 'Обязательно.',
      },
      regionDialog: false,
      districtDialog: false,
      cityDialog: false,
      citySelectDialog: false,
      editRegion: {},
      selectedRegion: {},
      editDistrict: {},
      selectedDistrict: {},
      editCity: {},
      selectedCity: {},
      locationObject: {},
      locationModel: '',
      locationText: '',
    }
  },
  computed: {
    ...mapGetters([
      'regions',
      'districts',
      'cities',
      'statusesLocations',
      'districtsByRegion',
      'citiesByDistrict',
      'locations',
      'location',
    ]),
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
    },
  },
  mounted() {
    this.data = { ...this.abit }
  },
  created() {
    this.fetchRegions()
    this.fetchDistricts()
    this.fetchCities()
    this.fetchStatusesLocations()
    this.fetchLocations()
  },

  methods: {
    ...mapActions([
      'fetchRegions',
      'fetchDistricts',
      'fetchCities',
      'addRegion',
      'addDistrict',
      'addCity',
      'fetchStatusesLocations',
      'fetchDistrictsByRegion',
      'fetchCitiesByDistrict',
      'fetchLocations',
      'selectLocation',
      'addLocation',
      'updateLocation',
    ]),
    nameAndStatusRegions(item) {
      const foundRegion = this.regions.find((obj) => obj.id === item.id)
      return `${item.name} ${foundRegion ? foundRegion.status.name : ''}`
    },
    nameAndStatusDistricts(item) {
      const foundDistrict = this.districts.find((obj) => obj.id === item.id)
      return `${item.name} ${foundDistrict ? foundDistrict.status.name : ''}`
    },
    nameAndStatusCities(item) {
      const foundCity = this.cities.find((obj) => obj.id === item.id)
      return `${item.name} ${foundCity ? foundCity.status.name : ''}`
    },
    addNewRegion() {
      this.addRegion(this.editRegion)
      this.editRegion = {}
      this.regionDialog = false
    },
    selectRegion() {
      if (this.selectedRegion !== null) {
        const foundRegion = this.regions.find(
          (obj) =>
            obj.id ===
            (this.selectedRegion.id
              ? this.selectedRegion.id
              : this.selectedRegion)
        )
        this.fetchDistrictsByRegion(this.selectedRegion)

        const locationRegion =
          `${foundRegion.name}` + ' ' + `${foundRegion.status.name}`
        this.locationObject.regionId = foundRegion.id
      }
    },
    async addNewDistrict() {
      await this.addDistrict(this.editDistrict)
      await this.fetchDistrictsByRegion(this.selectedRegion)
      this.editDistrict = {}
      this.districtDialog = false
    },
    selectDistrict() {
      if (this.selectedDistrict !== null) {
        const foundRegion = this.regions.find(
          (obj) =>
            obj.id ===
            (this.selectedRegion.id
              ? this.selectedRegion.id
              : this.selectedRegion)
        )
        const foundDistrict = this.districts.find(
          (obj) => obj.id === this.selectedDistrict
        )
        const locationDistrict =
          `${foundRegion.name}` +
          ' ' +
          `${foundRegion.status.name}` +
          ', ' +
          `${foundDistrict.status.name}` +
          ' ' +
          `${foundDistrict.name}`
        this.fetchCitiesByDistrict(this.selectedDistrict)
        this.locationObject.regionId = foundRegion.id
        this.locationObject.districtId = foundDistrict.id
        this.locationObject.cityId = null
        this.locationText = locationDistrict
      }
    },
    async addNewCity() {
      await this.addCity(this.editCity)
      await this.fetchCitiesByDistrict(this.selectedDistrict)
      this.editCity = {}
      this.cityDialog = false
    },
    selectCity() {
      const foundRegion = this.regions.find(
        (obj) =>
          obj.id ===
          (this.selectedRegion.id
            ? this.selectedRegion.id
            : this.selectedRegion)
      )
      const foundDistrict = this.districts.find(
        (obj) =>
          obj.id ===
          (this.selectedDistrict.id
            ? this.selectedDistrict.id
            : this.selectedDistrict)
      )
      const foundCity = this.cities.find((obj) => obj.id === this.selectedCity)
      const locationCity =
        `${foundRegion.name}` +
        ' ' +
        `${foundRegion.status.name}` +
        ', ' +
        `${foundDistrict.status.name}` +
        ' ' +
        `${foundDistrict.name}` +
        ', ' +
        `${foundCity.status.name}` +
        ' ' +
        `${foundCity.name}`
      this.locationObject.regionId = foundRegion.id
      this.locationObject.districtId = foundDistrict.id
      this.locationObject.cityId = foundCity.id
      this.locationText = locationCity
    },
    async openSelect() {
      if (this.data.residence) {
        this.selectedRegion = this.location.region
        await this.fetchDistrictsByRegion(this.location.region.id)
        this.selectedDistrict = this.location.district
        await this.fetchCitiesByDistrict(this.selectedDistrict.id)
        this.selectedCity = this.location.city
      } else if (!this.data.residence) {
        this.selectedRegion = 0
        this.selectedDistrict = 0
        this.selectedCity = 0
      }
    },
    async closeSelect() {
      // this.selectedCity = 0
      // this.selectedDistrict = 0
      // this.selectedRegion = 0
      // this.editCity = {}
      // this.editDistrict = {}
      // this.editRegion = {}
    },

    async saveLocation() {
      this.locationModel = this.locationText
      this.$emit('send-locationObject', this.locationObject)
      this.$emit('send-locationText', this.locationModel)

      this.citySelectDialog = false
    },
  },
}
</script>
