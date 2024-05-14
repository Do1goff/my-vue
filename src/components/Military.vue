<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card>
        <v-card-title> Военный комиссариат </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-badge
                color="green"
                :value="data.militaryCommissariat !== abit.militaryCommissariat"
                dot
              >
                <v-autocomplete
                  v-model="data.militaryCommissariat"
                  dense
                  :items="militaryCommissariats"
                  item-text="name"
                  item-value="id"
                  label="Военный комиссариат"
                  @input="send('militaryCommissariat', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="4">
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
                              v-model="militaryCommissariat.district"
                              :items="districts"
                              item-text="title"
                              item-value="value"
                              label="Округ"
                            />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="militaryCommissariat.name"
                              label="Военкомат"
                            />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="militaryCommissariat.telephone"
                              label="телефон"
                            />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="militaryCommissariat.director"
                              label="Начальник"
                            />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="militaryCommissariat.address"
                              label="Адрес"
                            />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="militaryCommissariat.email"
                              label="email"
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
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="data.personal_number !== abit.personal_number"
                dot
              >
                <v-text-field
                  v-model="data.personal_number"
                  v-mask="'XX-######'"
                  dense
                  label="Личный номер"
                  @input="send('personal_number', $event)"
                />
              </v-badge>
            </v-col>
            <v-col cols="6">
              <v-badge
                color="green"
                :value="
                  data.personal_number_giving !== abit.personal_number_giving
                "
                dot
              >
                <v-checkbox
                  v-model="data.personal_number_giving"
                  dense
                  label="Выдача личного номера"
                  @change="send('personal_number_giving', $event)"
                />
              </v-badge>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-card-title>
          <v-badge
            color="green"
            :value="badgeColorMilitaryService()"
            dot
          >
            Военная служба
          </v-badge>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="militaryServiceJSON.rank"
                :items="ranks"
                dense
                label="Воинское звание"
                @input="sendMilitaryService"
              />
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="militaryServiceJSON.post"
                dense
                label="Должность"
                @input="sendMilitaryService"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="militaryServiceJSON.place"
                dense
                label="Где служит"
                @input="sendMilitaryService"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="militaryServiceJSON.unit"
                dense
                label="Воинская часть"
                @input="sendMilitaryService"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="militaryServiceJSON.category"
                dense
                :items="categories"
                item-text="title"
                item-value="value"
                label="Категория"
                @input="sendMilitaryService"
              />
            </v-col>
            <v-col cols="6">
              <v-checkbox
                v-model="militaryServiceJSON.dismissed"
                dense
                label="Уволен?"
                @click="sendMilitaryService"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MilitaryComponent',
  props: {
    abit: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      data: {},
      differences: {},
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
      ranks: [
        'Рядовой',
        'Ефрейтор',
        'Младший сержант',
        'Сержант',
        'Старший сержант',
        'Старшина',
        'Прапорщик',
        'Старший прапорщик',
      ],
    }
  },
  computed: {
    ...mapGetters(['militaryCommissariats']),
    militaryServiceJSON() {
      return this.data.militaryService
        ? JSON.parse(this.data.militaryService)
        : {}
    },
  },
  watch: {
    abit() {
      this.data = { ...this.abit }
    },
  },
  created() {
    this.fetchMilitaryCommissariats()
  },
  mounted() {
    this.data = { ...this.abit }
  },
  methods: {
    ...mapActions(['addMilitaryCommissariat', 'fetchMilitaryCommissariats']),
    badgeColorMilitaryService() {
      if (
        (this.abit.militaryService &&
          this.abit.militaryService !==
            JSON.stringify(this.militaryServiceJSON)) ||
        (!this.abit.militaryService &&
          JSON.stringify(this.militaryServiceJSON) !== '{}')
      ) {
        return true
      } else return false
    },
    saveMilitaryCommissariat() {
      const newMilitaryCommissariat = Object.assign(
        {},
        this.militaryCommissariat
      )
      this.addMilitaryCommissariat(newMilitaryCommissariat)
      this.dialogMilitaryCommissariat = false
    },
    send(key, value) {
      this.differences[key] = value
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
    sendMilitaryService() {
      this.data.militaryService = JSON.stringify(this.militaryServiceJSON)
      this.differences.militaryService = this.data.militaryService
      this.$emit('child-event', this.differences)
      this.differences = {}
    },
  },
}
</script>
