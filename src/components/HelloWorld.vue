<template>
  <v-container fluid>
    <v-app-bar
      color="grey"
      dark
    >
      <v-spacer />
      <v-btn class="ml-3">
        <router-link to="/abit/1">
          Home
        </router-link>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>
