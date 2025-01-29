<template>
  <v-container
    class="BGclr"
    style="height: 100vh"
    align="center"
    justify="center"
    fluid
  >
    <v-card
      class="mx-auto"
      max-width="50%"
      style="margin-top: 100px"
    >
      <v-card-title><p>Авторизация</p></v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="userLogin"
            label="Логин"
            required
          ></v-text-field>

          <v-text-field
            v-model="userPassword"
            label="Пароль"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          @click="auth"
        >
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      color="warning"
    >
      <span> Неверный логин или пароль </span>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AuthView',

  data() {
    return {
      userLogin: '',
      userPassword: '',
      snackbar: false,
    }
  },
  created() {},

  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['login']),
    async auth() {
      const credentials = {
        username: this.userLogin,
        password: this.userPassword,
      }
      await this.login(credentials)
      if (this.isAuthenticated) {
        this.$router.push('/abit')
      } else {
        this.snackbar = true
      }
    },
  },
}
</script>

<style>
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
