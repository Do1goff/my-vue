<template>
  <v-app>
    <v-system-bar color="deep-white darken-3"></v-system-bar>

    <v-app-bar
      dark
      fixed
      height="30%"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Абитуриент</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <MultiQuery />
      </v-btn>

      <v-btn
        icon
        v-if="fox"
      >
        <HistoryComponent />
      </v-btn>

      <router-link
        to="/adminPanel"
        style="text-decoration: none"
        v-if="fox"
      >
        <v-btn icon>
          <v-icon>mdi-account-cowboy-hat-outline</v-icon>
        </v-btn>
      </router-link>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      bottom
      temporary
      app
    >
      <router-link
        to="/abit"
        style="text-decoration: none"
      >
        <v-list-item height="100px">
          <v-list-item-avatar
            tile
            height="70px"
            width="70px"
          >
            <v-img src="http://localhost:8080/favicon.ico"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title><h3>Абитуриент</h3></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group v-model="group">
          <router-link
            to="/abit"
            style="text-decoration: none"
          >
            <v-list-item>
              <v-list-item-title
                ><v-icon>mdi-account</v-icon> Основная страница
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link
            to="/holes"
            style="text-decoration: none"
          >
            <v-list-item>
              <v-list-item-title
                ><v-icon>mdi-magnify</v-icon> Несдача
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link
            to="/exportDocuments"
            style="text-decoration: none"
          >
            <v-list-item>
              <v-list-item-title
                ><v-icon>mdi-file-document-outline</v-icon>
                Документы</v-list-item-title
              >
            </v-list-item>
          </router-link>

          <router-link
            to="/upload"
            style="text-decoration: none"
          >
            <v-list-item>
              <v-list-item-title
                ><v-icon>mdi-download-circle-outline</v-icon>
                Занесение</v-list-item-title
              >
            </v-list-item>
          </router-link>

          <router-link
            to="/generateCalls"
            style="text-decoration: none"
          >
            <v-list-item>
              <v-list-item-title
                ><v-icon>mdi-phone</v-icon> Вызовы</v-list-item-title
              >
            </v-list-item>
          </router-link>

          <router-link
            to="/statistics"
            style="text-decoration: none"
          >
            <v-list-item>
              <v-list-item-title
                ><v-icon>mdi-chart-bar</v-icon> Статистика</v-list-item-title
              >
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HistoryComponent from './views/HistoryComponent.vue'
import MultiQuery from './views/MultiQuery.vue'
export default {
  name: 'App',
  components: {
    HistoryComponent,
    MultiQuery,
  },
  data() {
    return {
      drawer: false,
      group: null,
      fox: null,
    }
  },

  computed: {},
  mounted() {
    window.addEventListener('beforeunload', this.handleBeforeUpload)
    this.fox = JSON.parse(sessionStorage.getItem('user'))?.access == 'Админ'
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handleBeforeUpload)
  },
  created() {},

  watch: {
    group() {
      this.drawer = false
    },
  },

  methods: {
    handleBeforeUpload() {
      const message = 'Вы уверены?'
      event.returnValue = message
      return message
    },
  },
}
</script>
