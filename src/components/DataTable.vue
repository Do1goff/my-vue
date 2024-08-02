<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :headers="headers"
    :items="$store.getters.allAbits"
    item-key="id"
    :search="search"
    height="600px"
    dense
    fixed-header
    disable-pagination
    hide-default-footer
    @click:row="checkChangeAbit($event)"
    item-class="selected"
  >
    <template #top>
      <v-toolbar>
        <v-toolbar-title>
          <p>{{ $store.getters.allAbits.length }}</p></v-toolbar-title
        >
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
          v-model="dialogCheck"
          max-width="500px"
        >
          <v-card>
            <v-card-title>Вернуться, чтобы сохранить изменения?</v-card-title>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                @click="cancelChange"
              >
                Вернуться
              </v-btn>
              <v-btn
                color="light-grey"
                @click="changeAbit"
              >
                Продолжить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
                          @input="normalizationText"
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
                        <v-text-field
                          v-model="data.birthday"
                          label="Дата рождения"
                          type="date"
                          :rules="[rules.required]"
                          @keyup.enter="saveAbitData"
                        />
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
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item="{ item }">
      <tr
        :class="getClass(item)"
        @click="checkChangeAbit(item)"
        dense
      >
        <td
          class="fixed-column"
          style="font-size: 12px; padding: 0; margin: 0; text-align: center"
        >
          {{ item.id }}
        </td>
        <td
          class="fixed-column"
          style="font-size: 12px; padding: 0; margin: 0; text-align: center"
        >
          {{ item.personal_file_number }}
        </td>
        <td
          class="fixed-column"
          style="font-size: 12px; padding: 0; margin: 0; text-align: center"
        >
          {{
            item.admission_examination_group
              ? item.admission_examination_group.name
              : ''
          }}
        </td>
        <td
          class="fixed-column"
          style="font-size: 12px; padding: 0; margin: 0; text-align: center"
        >
          {{ item.lastName }} {{ item.firstName }} {{ item.surName }}
        </td>
        <td
          class="fixed-column"
          style="font-size: 12px; padding: 0; margin: 0; text-align: center"
        >
          {{ formatDate(item.birthday) }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DataTableComponent',
  props: [
    'message',
    'educationChild',
    'residenceChild',
    'uncanceledEducationChild',
    'militaryServiceChild',
    'passportChild',
  ],
  data() {
    return {
      data: {},
      search: '',
      headers: [
        {
          text: 'ID',
          value: 'id',
          width: '1%',
          align: 'center',
        },
        {
          text: '№ ЛД',
          value: 'personal_file_number',
          width: '1%',
          align: 'center',
        },
        {
          text: 'Группа',
          value: 'admission_examination_group',
          width: '1%',
          align: 'center',
        },
        {
          text: 'ФИО',
          value: 'lastName',
          align: 'center',
        },
        // {
        //   text: 'Имя',
        //   value: 'firstName',
        // },
        // {
        //   text: 'Отчество',
        //   value: 'surName',
        // },
        {
          text: 'Дата рождения',
          value: 'birthday',
          width: '1%',
          align: 'center',
        },
        // {
        //   text: 'Действия',
        //   value: 'actions',
        // },
      ],
      selectedAbitId: null,
      menu: false,
      dialogAdd: false,
      dialogCheck: false,
      defaultAbit: {
        lastName: '',
        firstName: '',
        surName: '',
      },
      rules: {
        required: (value) => !!value || 'Обязательно.',
      },
      formValid: false,
      editBirthday: '',
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
    ...mapActions(['addAbit', 'fetchAbits', 'selectAbit']),
    normalizationText(event) {
      this.data.lastName = event
        .replace(/\s+/g, '')
        .replace(/\b\w/g, (l) => l.toUpperCase())
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
      this.editBirthday = ''
      this.dialogAdd = false
      this.$router.replace({
        name: 'component',
        params: { id: this.allAbits.length },
      })
      this.selectedAbitId = this.allAbits.length
    },
    closeAdd() {
      this.dialogAdd = false
      this.data = Object.assign({}, this.defaultAbit)
    },
    checkChangeAbit(item) {
      if (`${item.id}` !== this.$route.path.split('/')[2]) {
        if (
          this.message ||
          this.educationChild ||
          this.uncanceledEducationChild ||
          this.residenceChild ||
          this.passportChild ||
          this.militaryServiceChild
        ) {
          this.dialogCheck = true
          this.selectedAbitId = item.id
        } else {
          this.selectedAbitId = item.id
          this.changeAbit()
        }
      }
    },
    cancelChange() {
      this.dialogCheck = false
      this.selectedAbitId = this.id
    },
    async changeAbit() {
      if (this.$route.path.split('/')[3]) {
        await this.$router.replace({
          name: 'component',
          params: { id: this.selectedAbitId },
        })
      } else {
        await this.$router.replace({
          name: 'abit',
          params: { id: this.selectedAbitId },
        })
      }
      this.dialogCheck = false
      this.$emit('checkSave')
    },
    saveAbitData() {
      this.formValid = true
      if (!this.$refs.form.validate()) {
        this.formValid = false
        return
      }
      this.saveAdd()
    },
    getClass(item) {
      if (this.$route.path.split('/')[2] === `${item.id}`) {
        return 'selected'
      } else if (
        item.expulsion ? JSON.parse(item.expulsion).reason !== null : false
      ) {
        return 'expulsed'
      }
    },
  },
}
</script>

<style scoped>
.selected {
  background-color: rgb(115, 220, 255);
}

.expulsed {
  background-color: red;
}

.v-data-table {
  table-layout: fixed;
}

.fixed-column {
  width: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
