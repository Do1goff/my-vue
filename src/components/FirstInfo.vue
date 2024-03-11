<template>
  <v-row no-gutters>
    <v-col cols="6">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field
                dense
                :value="abit.id"
                label="№ п/п"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                dense
                :value="abit.personal_file_reg"
                label="р/н"
              />
            </v-col>
            <v-col cols="4">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    dense
                    :value="formatDate(dateCreateAt)"
                    label="Дата"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker @input="changeDate('createAt', $event)" />
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                dense
                required
                :value="abit.personal_file_number"
                :rules="[rules.required]"
                label="№ личного дела"
                @input="updateData('personal_file_number', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="abit.lastName"
                label="Фамилия"
                @input="updateData('lastName', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="abit.firstName"
                label="Имя"
                @input="updateData('firstName', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="abit.surName"
                label="Отчество"
                @input="updateData('surName', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    dense
                    :value="formatDate(abit.birthday)"
                    label="Дата рождения"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker @input="changeDate('birthday', $event)" />
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-select
                dense
                :value="abit.personal_file_existence"
                :items="personal_file_existence"
                item-text="title"
                item-value="value"
                label="Наличие личного дела"
                @input="updateData('personal_file_existence', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-autocomplete
                dense
                :value="abit.nationality"
                :items="nationality"
                item-text="name"
                item-value="id"
                label="Национальность"
                @input="updateData('nationality', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                dense
                :value="abit.gender"
                :items="genders"
                item-text="title"
                item-value="value"
                label="пол"
                @input="updateData('gender', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-select
                dense
                :value="abit.family_status"
                :items="family_status"
                item-text="title"
                item-value="value"
                label="семейное положение"
                @input="updateData('family_status', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="abit.abit_childrens"
                label="количество детей"
                type="number"
                @input="updateDataInt('abit_childrens', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-textarea
                rows="1"
                dense
                :value="abit.residence"
                label="Место жительства"
                @input="updateData('residence', $event)"
              />
            </v-col>
            <v-col cols-="6">
              <v-text-field
                dense
                :value="abit.secondCitizenship"
                label="Второе гражданство"
                @input="updateData('secondCitizenship', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title> Семья </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                dense
                :value="abit.family_social_status"
                label="Происхождение"
                @input="updateData('family_social_status', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="abit.family_childrens"
                type="number"
                label="Количество детей в семье"
                @input="updateDataInt('family_childrens', $event)"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                rows="1"
                dense
                :value="abit.family_address"
                label="Место жительства родителей"
                @input="updateData('family_address', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-autocomplete
            dense
            :value="abit.cossack_society"
            :items="cossack_society"
            item-text="name"
            label="Казачье общество"
            @input="updateData('cossack_society', $event)"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                dense
                :value="abit.telephone"
                label="телефон"
                type="tel"
                @input="updateData('telephone', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="abit.telephone2"
                label="2 телефон"
                @input="updateData('telephone2', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title> Мать </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                dense
                :value="motherJSON.lastName"
                label="Фамилия"
                @input="updateMother('lastName', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="motherJSON.firstName"
                label="Имя"
                @input="updateMother('firstName', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="motherJSON.surName"
                label="Отчество"
                @input="updateMother('surName', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    dense
                    :value="formatDate(motherJSON.birthday)"
                    label="Дата рождения"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker @input="changeDateMother('birthday', $event)" />
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="motherJSON.status"
                label="Статус"
                @input="updateMother('status', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-checkbox
                dense
                :value="abit.mother_fail"
                label="Утеря матери"
                @click="data.mother_fail = !abit.mother_fail"
                @input="updateData('mother_fail', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title> Отец </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                dense
                :value="fatherJSON.lastName"
                label="Фамилия"
                @input="updateFather('lastName', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="fatherJSON.firstName"
                label="Имя"
                @input="updateFather('firstName', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="fatherJSON.surName"
                label="Отчество"
                @input="updateFather('surName', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="menu4"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    dense
                    :value="formatDate(fatherJSON.birthday)"
                    label="Дата рождения"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker @input="changeDateFather('birthday', $event)" />
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                :value="fatherJSON.status"
                label="Статус"
                @input="updateFather('status', $event)"
              />
            </v-col>
            <v-col cols="6">
              <v-checkbox
                dense
                :value="abit.father_fail"
                label="Утеря отца"
                @click="data.father_fail = !abit.father_fail"
                @input="updateData('father_fail', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                dense
                :value="abit.specialty_military_commissariat"
                :items="specialty"
                item-text="name"
                item-value="id"
                label="Желаемая специальность"
                @input="updateData('specialty_military_commissariat', $event)"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <v-textarea
            dense
            :value="abit.note"
            label="Примечания"
            rows="1"
            @input="updateData('note', $event)"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-btn
      color="blue darken-1"
      text
      @click="save"
    >
      Сохранить
    </v-btn>
  </v-row>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
  name: 'FirstInfoComponent',
  props: ['abit'],
  data() {
    return {
      data: {},
      rules: {
        required: (value) => !!value || 'Обязательно.',
      },
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      mother: {},
      father: {},
      genders: [
        { value: 'men', title: 'Мужской' },
        { value: 'women', title: 'Женский' },
      ],
      family_status: [
        { value: 'single', title: 'холост' },
        { value: 'married', title: 'женат' },
      ],
      personal_file_existence: [
        { value: 'print', title: 'бумажное' },
        { value: 'electro', title: 'электронное' },
      ],
    }
  },
  computed: {
    nationality() {
      return this.$store.getters.nationality
    },
    specialty() {
      return this.$store.getters.specialty
    },
    cossack_society() {
      return this.$store.getters.cossack_society
    },
    motherJSON() {
      return this.abit.mother ? JSON.parse(this.abit.mother) : this.mother
    },
    fatherJSON() {
      return this.abit.father ? JSON.parse(this.abit.father) : this.father
    },
    dateCreateAt() {
      return this.data.createAt ? this.data.createAt : this.abit.createAt
    },
  },
  created() {
    this.$store.dispatch('fetchNationality')
    this.$store.dispatch('fetchSpecialty')
    this.$store.dispatch('fetchCossackSociety')
  },
  methods: {
    ...mapActions(['selectAbit', 'updateAbit']),
    updateData(fieldName, event) {
      this.data[fieldName] = event
    },
    updateDataInt(fieldName, event) {
      this.data[fieldName] = parseInt(event, 10)
    },
    save() {
      this.data.id = this.abit.id
      this.data.mother = JSON.stringify(this.motherJSON)
      this.data.father = JSON.stringify(this.fatherJSON)
      this.updateAbit(this.data)
    },

    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD-MM-YYYY')
    },
    changeDate(fieldName, event) {
      this.data[fieldName] = new Date(event).toISOString()
      this.menu1 = false
      this.menu2 = false
    },
    changeDateMother(fieldName, event) {
      this.motherJSON[fieldName] = new Date(event).toISOString()
      this.menu3 = false
    },
    changeDateFather(fieldName, event) {
      this.fatherJSON[fieldName] = new Date(event).toISOString()
      this.menu4 = false
    },
    updateMother(fieldName, event) {
      this.motherJSON[fieldName] = event
    },
    updateFather(fieldName, event) {
      this.fatherJSON[fieldName] = event
    },
  },
}
</script>
