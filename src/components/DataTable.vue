<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :headers="headers"
    :items="$store.getters.allAbits"
    item-key="id"
    height="500px"
    fixed-header
    :search="search"
    disable-pagination
    hide-default-footer
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Список</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-text-field
          v-model="search"
          label="Поиск"
          class="mx-4"
        />

        <v-dialog
          v-model="dialogAdd"
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
                <v-form
                  ref="form"
                  @submit.prevent="saveAbitData"
                >
                  <v-container>
                    <v-row>
                      <v-col cols="3">
                        <v-text-field
                          v-model="data.lastName"
                          label="Фамилия"
                          :rules="[rules.required]"
                        />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="data.firstName"
                          label="Имя"
                          :rules="[rules.required]"
                        />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="data.surName"
                          label="Отчество"
                        />
                      </v-col>
                      <v-col cols="3">
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              :value="formatDate(data.birthday)"
                              :rules="[rules.required]"
                              label="Дата рождения"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker @input="changeDate" />
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="blue darken-1"
                text
                @click="closeAdd"
              >
                Отмена
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="saveAbitData"
              >
                <!-- :disabled="isFormValid()" -->
                <!-- @click="saveAdd" -->
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template #item.birthday="{ item }">
      {{ formatDate(item.birthday) }}
    </template>
    <template #item.actions="{ item }">
      <router-link
        :to="{
          name: 'abit',
          params: {
            id: item.id,
          },
        }"
      >
        <v-icon
          small
          :class="{ selected: isSelectedAbit(item) }"
          @click="changeAbit(item)"
        >
          mdi-pencil
        </v-icon>
      </router-link>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DataTableComponent',
  data() {
    return {
      formValid: false,
      date: null,
      menu: false,
      dialogAdd: false,
      search: '',
      headers: [
        {
          text: 'ID',
          value: 'id',
        },
        {
          text: 'имя',
          align: 'start',
          value: 'firstName',
        },
        {
          text: 'фамилия',
          value: 'lastName',
        },
        {
          text: 'дата рождения',
          value: 'birthday',
        },
        {
          text: 'Действия',
          value: 'actions',
        },
      ],
      data: {},
      editedAbit: {},
      defaultAbit: {
        lastName: '',
        firstName: '',
        surName: '',
      },
      selectedAbitId: null,
      rules: {
        required: (value) => !!value || 'Обязательно.',
      },
    }
  },

  computed: {
    ...mapGetters(['allAbits']),
  },

  created() {
    this.fetchAbits()
  },

  methods: {
    moment,
    ...mapActions(['addAbit', 'fetchAbits']),

    changeDate(event) {
      this.data.birthday = new Date(event).toISOString()
      this.menu = false
    },

    formatDate(dateString) {
      if (!dateString) return null
      const date = new Date(dateString)
      return moment(date).format('DD-MM-YYYY')
    },

    async saveAdd() {
      const newAbit = Object.assign({}, this.data)
      newAbit.birthday = new Date(this.data.birthday)
      await this.addAbit(newAbit)
      this.data = Object.assign({}, this.defaultAbit)
      this.dialogAdd = false
      this.$router.replace({
        name: 'abit',
        params: { id: this.allAbits.length },
      })
      this.selectedAbitId = this.allAbits.length
    },

    closeAdd() {
      this.dialogAdd = false
      this.data = Object.assign({}, this.defaultAbit)
    },
    changeAbit(item) {
      this.selectedAbitId = item.id
    },
    saveAbitData() {
      this.formValid = true
      if (!this.$refs.form.validate()) {
        this.formValid = false
        return
      }
      this.saveAdd()
    },
    isFormValid() {
      return this.formValid
    },
    isSelectedAbit(item) {
      return this.selectedAbitId === item.id
    },
  },
}
</script>

<style>
.selected {
  background-color: rgb(115, 220, 255);
}
</style>
