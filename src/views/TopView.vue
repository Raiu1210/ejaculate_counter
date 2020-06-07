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

      <ShareNetwork
          class="share_button"
          network="twitter"
          url="https://ejaculate-counter.firebaseapp.com/#/"
          v-bind:title="tweet_msg"
          hashtags="わたしの射精記録,射精記録,射精,ザーメン"
        >
        <span class="guide_label">Twitterでシェア</span>
      </ShareNetwork>
    </center>
  </div>  
</template>


<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      tweet_msg: 'aaa',
      ejaculated_timstamps: []
    }
  },
  methods: {
    save_evaculate() {
      const result = confirm("射精を記録しますか？")
      if (result && this.$store.state.login) {
        const now = this.get_current_time()
        var db = firebase.firestore()

        db.collection(this.$store.state.user.uid).doc(now).set({
          uid: this.$store.state.user.uid,
          displayName: this.$store.state.user.displayName
        })
        .then(function() {
          alert("射精の記録を追加したよ！")
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
  async created() {
    var self = this
    
    await firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.state.user = user
        this.$store.state.login = true
        
        var db = firebase.firestore()
        db.collection("users").doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName
        })
      } else {
        this.$store.state.login = false
      }
    })

    // get ejaculate timestamps
    await firebase.firestore().collection(this.$store.state.user.uid).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        self.ejaculated_timstamps.push(doc.id)
      });
    });

    this.tweet_msg = "私の射精記録\n\n" + 
                     "【射精回数】\n\t" + this.ejaculated_timstamps.length + "回\n\n" +
                     "【推計射精量】\n\t" + this.ejaculated_timstamps.length*3.5 + " [ml]\n\n"
                    
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

  .share_button {
    height: 70px;
    width: 50%;
    background-color: #008DDE;
    box-shadow: 0 4px 0 #0078BD;
    
    /* display: inline; */
    position: relative;
    font-family: Arial;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: white;
    border-radius: 5px;
    padding: 20px 10px;
    
  }
  .share_button:active {
    top: 2px;
    box-shadow: 0 2px 0 #0078BD;
  }
  .share_button:hover {
    background-color: #1397D8;
  }

  .guide_label {
    color: white;
    font-size: 14pt;
  }
</style>


