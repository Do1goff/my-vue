<template>
  <v-container fluid>
    <v-app-bar
    color="grey"
    dark>
    <v-spacer></v-spacer>
    <v-btn class="ml-3">
        <router-link to="/">Home</router-link>
    </v-btn>

    <v-btn class="ml-3">
        <router-link to="/abits">abits</router-link>
    </v-btn>
    </v-app-bar>
</v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
  }
</script>