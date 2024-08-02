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
        <v-icon>mdi-magnify</v-icon>
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
      absolute
      bottom
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group v-model="group">
          <v-list-item>
            <v-list-item-title
              ><v-icon>mdi-magnify</v-icon> Мультизапрос
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title
              ><v-icon>mdi-file-document-outline</v-icon>
              Документы</v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title
              ><v-icon>mdi-download-circle-outline</v-icon>
              Занесение</v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title
              ><v-icon>mdi-history</v-icon> История</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style></style>
