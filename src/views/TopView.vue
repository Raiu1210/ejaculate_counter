<template>
  <div>
    <center>
      <br>
      <img :src="this.$store.state.user.photoURL">
      <h3>displayName : {{this.$store.state.user.displayName}}</h3>
      <h3>uid : {{this.$store.state.user.uid}}</h3>
      <v-btn @click="doLogout" text outlined>ログアウト</v-btn>
    </center>
  </div>  
</template>


<script>
import firebase from 'firebase'

export default {
  methods: {
    doLogout() {
      firebase.auth().signOut()
      this.$store.state.login = false
    },
  },
}
</script>