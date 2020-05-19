<template>
  <div>
    <center>
      <div class="ejaculate_button">
        <v-btn @click="save_evaculate" height="200" width="90%" color="pink lighten-1" dark>
          <span>射精した！</span>  
        </v-btn>
      </div>

      <br>
      <img :src="this.user.photoURL">
      <h3>displayName : {{this.user.displayName}}</h3>
      <h3>uid : {{this.user.uid}}</h3>
    </center>
  </div>  
</template>


<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      user: null,
      login: false
    }
  },
  methods: {
    save_evaculate() {
      const result = confirm("射精を記録しますか？")
      if (result && this.$store.state.login) {
        const now = this.get_current_time()
        console.log(now)
        var db = firebase.firestore()

        db.collection(this.uid).doc(now).set({
          uid: this.user.uid,
          displayName: this.user.displayName
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
      var month = ((d.getMonth() + 1) < 10) ? '0' + d.getMonth() : d.getMonth();
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
        this.user = user
        
        var db = firebase.firestore()
        db.collection("users").doc(this.user.uid).set({
          uid: this.user.uid,
          displayName: this.user.displayName
        })
        .then(function() {
          // console.log("Added")
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
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