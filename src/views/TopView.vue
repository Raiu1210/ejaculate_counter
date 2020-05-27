<template>
  <div>
    <center>
      <br>
      <img :src="this.$store.state.user.photoURL">
      <h3>{{this.$store.state.user.displayName}}</h3>
      <!-- <h3>uid : {{this.$store.state.user.uid}}</h3> -->

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
  data() {
    return {
      
    }
  },
  methods: {
    save_evaculate() {
      const result = confirm("射精を記録しますか？")
      if (result && this.$store.state.login) {
        const now = this.get_current_time()
        var db = firebase.firestore()

        console.log(this.uid)

        db.collection(this.$store.state.user.uid).doc(now).set({
          uid: this.$store.state.user.uid,
          displayName: this.$store.state.user.displayName
        })
        .then(function() {
          alert("射精の記録を追加したよ！")
          console.log("Added")
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            alert("Some thing went wrong")
        });
      }
    },
    get_current_time() {
      var d = new Date();
      var year  = d.getFullYear();
      var month = ((d.getMonth() + 1) < 10) ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
      var day   = ( d.getDate()   < 10 ) ? '0' + d.getDate()   : d.getDate();
      var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
      var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
      var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
  
      return year + '-' + month + '-' + day + '-' + hour + '-' + min + '-' + sec
    }
  },
  created() {
    console.log(this.$parent.user)
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


<style scoped>
  span {
    font-size: 50px;
  }

  .ejaculate_button {
    margin: 30px;
  }
</style>