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

      <v-btn icon>
        <HistoryComponent />
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-filter</v-icon>
      </v-btn>

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
                ><v-icon>mdi-magnify</v-icon> Дырки
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
      isReloading: false,
    }
  },

  computed: {},
  mounted() {
    window.addEventListener('beforeunload', this.handleBeforeUpload)
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
      console.log('beforeUnload')
      const message = 'Вы уверены?'
      event.returnValue = message
      return message
    },
  },
}
</script>
