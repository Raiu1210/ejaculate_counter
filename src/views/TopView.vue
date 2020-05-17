<template>
  <div>
    <center>
      <!-- <br>
      <img :src="this.$store.state.user.photoURL">
      <h3>displayName : {{this.$store.state.user.displayName}}</h3>
      <h3>uid : {{this.$store.state.user.uid}}</h3>
      <v-btn @click="doLogout" text outlined>ログアウト</v-btn> -->
      
      <div class="ejaculate_button">
        <v-btn @click="save_evaculate" height="200" width="90%" color="pink lighten-1" dark>
          <span>射精した！</span>  
        </v-btn>
      </div>
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
    save_evaculate() {
      const result = confirm("射精を記録しますか？")
      if (result) {
        const uid = this.$store.state.user.uid
        const now = this.get_current_time()
        console.log(now)
        var db = firebase.firestore()

        db.collection(uid).doc(now).set({
          uid: this.$store.state.user.uid,
          displayName: this.$store.state.user.displayName
        })
        .then(function() {
          console.log("Added")
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
      }
    },
    get_current_time() {
      var d = new Date();
      var year  = d.getFullYear();
      var month = d.getMonth() + 1;
      var day   = d.getDate();
      var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
      var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
      var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
  
      return year + '-' + month + '-' + day + '-' + hour + '-' + min + '-' + sec
    }
  },
}
</script>


<style scoped>
  span {
    font-size: 50px;
  }

  .ejaculate_button {
    margin: 30px;
  }
</style>