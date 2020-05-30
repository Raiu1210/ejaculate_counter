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
            <v-list-item>
              <v-btn @click="doLogout" text outlined>ログアウト</v-btn>
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
              <router-link to="/" exact>Home</router-link>
            </v-list-item-title>
            <v-list-item-title class="title">
              <router-link to="/stats">stats</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-container>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer dark app>
      Vuetify
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase'

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
    }
  },
  components: {
  },
  methods: {
    doLogout() {
      firebase.auth().signOut()
      this.$store.state.login = false
      this.$router.push('/')
    },
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.state.user = user
        this.$store.state.login = true
        
        var db = firebase.firestore()
        db.collection("users").doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName
        })
        .then(function() {
          // console.log("Added")
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
      } else {
        this.$store.state.login = false
      }
    });
  }
}
</script>