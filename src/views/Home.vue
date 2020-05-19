<template>
  <div class="home">
    <Signin v-show="!this.login"></Signin>
    <Top v-show="this.login"></Top>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import Signin from '@/components/Signin.vue'
import Top from '@/views/TopView.vue'

export default {
  name: 'Home',
  data() {
    return {
      user: null,
      login: false
    }
  },
  components: {
    Signin,
    Top
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.user = user
        this.login = true
      }
    });
  }
}
</script>
