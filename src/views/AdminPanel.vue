<template>
  <v-container
    fluid
    class="BGclr"
    style="height: 100vh"
  >
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="this.users"
              item-key="id"
              :search="search"
              fixed-header
              height="600px"
              disable-pagination
              hide-default-footer
              dense
            >
              <template #top>
                <v-dialog
                  v-model="userDialog"
                  width="50%"
                >
                  <v-card>
                    <v-card-title>Настройка пользователя</v-card-title>
                    <v-card-text>
                      <v-select
                        v-model="userAccess"
                        :items="AccessArray"
                        attach
                        chips
                        label="Access"
                        multiple
                      />
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        @click="save"
                        color="primary"
                        >Сохранить</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  color="primary"
                  icon
                  @click="selectUser(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>
            Настройки
            <v-spacer />
            <v-switch />
          </v-card-title>
          <v-card-text>
            <v-btn
              label="Добавить пользователя"
              @click="createUser"
            />

            <v-dialog
              v-model="userAddDialog"
              width="50%"
            >
              <v-card>
                <v-card-title>Настройка пользователя</v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="userLogin"
                    label="Логин"
                  />
                  <v-text-field
                    v-model="userPassword"
                    label="Пароль"
                  />
                  <v-select
                    v-model="userAccess"
                    :items="AccessArray"
                    attach
                    chips
                    label="Access"
                    multiple
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    @click="addNewUser"
                    color="primary"
                    >Сохранить</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-text>
          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AdminPanel',
  data() {
    return {
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Username',
          value: 'username',
          align: 'start',
        },
        {
          text: 'Access',
          value: 'access',
          align: 'center',
          width: '1%',
        },
        {
          text: 'Действие',
          value: 'actions',
          align: 'center',
        },
      ],
      userDialog: false,
      userLogin: '',
      userPassword: '',
      userAddDialog: false,
      userAccess: null,
      editedUser: null,
      search: null,
      AccessArray: ['Админ', 'ППО', 'Председатель'],
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['users']),
  },
  async created() {
    await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers', 'putUsers', 'addUser']),
    async save() {
      this.editedUser.access = this.userAccess
      await this.putUsers(this.editedUser)
      this.userAccess = null
    },
    selectUser(item) {
      this.userDialog = true
      this.userAccess = item.access
      this.editedUser = item
    },
    createUser() {
      this.userAddDialog = true
    },
    addNewUser() {
      const newUser = Object.assign(
        {},
        {
          username: this.userLogin,
          password: this.userPassword,
          access: this.userAccess,
        },
      )
      this.addUser(newUser)
      this.userLogin = ''
      this.userPassword = ''
      this.userAccess = null
      this.userAddDialog = false
    },
  },
}
</script>

<style>
.v-data-table {
  table-layout: fixed;
}
.BGclr {
  position: sticky;
  background: -webkit-linear-gradient(
    30deg,
    #ffffff,
    #abaffc,
    #ebe8ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    30deg,
    #ffffff,
    #abaffc,
    #ebe8ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
