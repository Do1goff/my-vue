<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card>
          <v-card-title> Военный комиссариат </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :value="abit.militaryCommissariat"
                  :items="militaryCommissariats"
                  item-text="name"
                  label="Военный комиссариат"
                  @input="updateData('militaryCommissariat', $event)"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-dialog
              v-model="dialogMilitaryCommissariat"
              max-width="1200px"
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
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Добавить</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-select
                            :value="militaryCommissariat.district"
                            :items="districts"
                            item-text="title"
                            item-value="value"
                            label="Округ"
                            @input="
                              updateMilitaryCommissariat('district', $event)
                            "
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            :value="militaryCommissariat.name"
                            label="Военкомат"
                            @input="updateMilitaryCommissariat('name', $event)"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            :value="militaryCommissariat.telephone"
                            label="телефон"
                            @input="
                              updateMilitaryCommissariat('telephone', $event)
                            "
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            :value="militaryCommissariat.director"
                            label="Начальник"
                            @input="
                              updateMilitaryCommissariat('director', $event)
                            "
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            :value="militaryCommissariat.address"
                            label="Адрес"
                            @input="
                              updateMilitaryCommissariat('address', $event)
                            "
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            :value="militaryCommissariat.email"
                            label="email"
                            @input="updateMilitaryCommissariat('email', $event)"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="saveMilitaryCommissariat"
                  >
                    Сохранить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  :value="abit.personal_number"
                  label="Личный номер"
                  @input="updateData('personal_number', $event)"
                />
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  :value="abit.personal_number_giving"
                  label="Выдача личного номера"
                  @click="
                    data.personal_number_giving = !abit.personal_number_giving
                  "
                  @input="updateData('personal_number_giving', $event)"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title> Военная служба </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  :value="militaryServiceJSON.rank"
                  label="Воинское звание"
                  @input="updateMilitaryService('rank', $event)"
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  :value="militaryServiceJSON.post"
                  label="Должность"
                  @input="updateMilitaryService('post', $event)"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :value="militaryServiceJSON.place"
                  label="Где служит"
                  @input="updateMilitaryService('place', $event)"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :value="militaryServiceJSON.unit"
                  label="Воинская часть"
                  @input="updateMilitaryService('unit', $event)"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  :value="militaryServiceJSON.category"
                  :items="categories"
                  item-text="title"
                  item-value="value"
                  label="Категория"
                  @input="updateMilitaryService('category', $event)"
                />
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  :value="militaryServiceJSON.dismissed"
                  label="Уволен?"
                  @click="
                    militaryServiceJSON.dismissed =
                      !militaryServiceJSON.dismissed
                  "
                  @input="updateMilitaryService('dismissed', $event)"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      color="blue darken-1"
      text
      @click="save"
    >
      Сохранить
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'MilitaryComponent',
  props: ['abit'],
  data() {
    return {
      data: {},
      militaryService: {},
      militaryCommissariat: {},
      dialogMilitaryCommissariat: false,
      districts: [
        { value: 'central', title: 'Центральный' },
        { value: 'west', title: 'Западный' },
        { value: 'east', title: 'Восточный' },
        { value: 'south', title: 'Южный' },
        { value: 'north', title: 'Северный флот' },
      ],
      categories: [
        { value: 'conscription', title: 'По призыву' },
        { value: 'contract', title: 'Контракт' },
      ],
    }
  },
  computed: {
    militaryCommissariats() {
      return this.$store.getters.militaryCommissariats
    },
    militaryServiceJSON() {
      return this.abit.militaryService
        ? JSON.parse(this.abit.militaryService)
        : {}
    },
  },
  created() {
    this.$store.dispatch('fetchMilitaryCommissariats')
  },
  methods: {
    ...mapActions(['updateAbit', 'addMilitaryCommissariat']),

    updateData(fieldName, event) {
      this.data[fieldName] = event
    },
    updateMilitaryService(fieldName, event) {
      this.militaryServiceJSON[fieldName] = event
    },
    updateMilitaryCommissariat(fieldName, event) {
      this.militaryCommissariat[fieldName] = event
    },
    save() {
      this.data.id = this.abit.id
      this.data.militaryService = JSON.stringify(this.militaryServiceJSON)
      this.updateAbit(this.data)
    },
    saveMilitaryCommissariat() {
      const newMilitaryCommissariat = Object.assign(
        {},
        this.militaryCommissariat
      )
      this.addMilitaryCommissariat(newMilitaryCommissariat)
      this.dialogMilitaryCommissariat = false
    },
  },
}
</script>
