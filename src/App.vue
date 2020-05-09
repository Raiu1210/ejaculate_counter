<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>Navigation Lists</v-navigation-drawer>

    <v-app-bar dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vuetify</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Button</v-btn>
    </v-app-bar>

    <v-footer dark app>
      Vuetify
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data(){
    return{
        drawer: false
    }
  }
}
</script>