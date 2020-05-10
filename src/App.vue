<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>Navigation Lists</v-navigation-drawer>

    <!-- top bar -->
    <v-app-bar dark app clipped-left>
      <!-- left side -->
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>射精カウンター</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- right side -->
      <v-toolbar-items>
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-on="on" text outlined>Support</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="support in supports" :key="support">
              <v-list-item-content>
                <v-list-item-title>{{ support }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <!-- navigation bar -->
    <v-navigation-drawer app v-model="drawer" clipped >
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Navigation lists
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-container>
    </v-navigation-drawer>

    <v-content>
      <Signin v-show="!this.$store.state.login"></Signin>
      <Top v-show="this.$store.state.login"></Top>
      <button type="button" @click="doLogout">ログアウト</button>
    </v-content>

    <v-footer dark app>
      Vuetify
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import Top from '@/components/Top.vue'
import Signin from '@/components/Signin.vue'

export default {
  data() {
    return {
      drawer: false,
      supports:[
        'Consulting and suppourt',
        'Discord community',
        'Report a bug',
        'Github issue board',
        'Stack overview'
      ],
      isLogin: false,
      loginUser: null
    }
  },
  components: {
    Signin,
    Top
  },
  methods: {
    doLogout() {
      firebase.auth().signOut()
      this.$store.state.login = false
    },
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.state.login = true;
        this.$store.state.user = user;
        console.log(this.$store.state.user)
      }
    });
  }
}
</script>