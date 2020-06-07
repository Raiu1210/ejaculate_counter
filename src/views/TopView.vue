<template>
  <div>
    <center>
      <br>
      <img :src="this.$store.state.user.photoURL">
      <h3>{{this.$store.state.user.displayName}}</h3>
      <!-- <h3>uid : {{this.$store.state.user.uid}}</h3> -->

      <div class="ejaculate_button">
        <v-btn @click="save_evaculate" height="200" width="90%" color="pink lighten-1" dark>
          <span class="ejaculated">射精した！</span>  
        </v-btn>
      </div>


      <div class="ejaculate_button">
        <v-btn class="share_button" @click="tweet_my_stats" height="70" width="60%" color="blue lighten-1" dark>
          <span class="share_label">Twitterでシェア</span>  
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
      tweet_msg: 'aaa',
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
    },
    async tweet_my_stats() {
      await firebase.firestore().collection(this.$store.state.user.uid).get().then(function(querySnapshot) {
        var ejaculated_timstamps = []
        querySnapshot.forEach(function(doc) {
          ejaculated_timstamps.push(doc.id)
        });

        const time_zone = ['0時~2時', '2時~4時', '4時~6時', '6時~8時', '8時~10時', '10時~12時', '12時~14時', '14時~16時', '16時~18時', '18時~20時', '20時~22時', '20時~24時']
        const num_data = ejaculated_timstamps.length
        var time_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ejaculated_timstamps.forEach(element => {
          const hour = element.slice(11, 13)
          const index = Math.floor(hour/2)
          time_data[index] += 1 / num_data
        });
        const max_index = time_data.indexOf(Math.max.apply(null, time_data))

        var percent_data = []
        time_data.forEach(element => {
          percent_data.push((Math.round(element * 100)).toString() + "%25")
        })

        var shareURL = "https://twitter.com/intent/tweet?text=" + 
                       "私の射精記録%0a%0a" +
                       "【射精回数】%0a     " + ejaculated_timstamps.length + "回%0a%0a" +
                       "【推計射精量】%0a     約" + ejaculated_timstamps.length*3.5 + " [ml]%0a%0a" +
                       "【メインの射精時間帯】%0a     " + time_zone[max_index] + "  (" + percent_data[max_index] +  ")%0a%0a" +
                       "%20%23射精 %20%23私の射精記録 %20%23ザーメン %0a%0a%0a" +
                       "&url=https://ejaculate-counter.firebaseapp.com/#/  %0a%0a%0a"
        location.href = shareURL
      });

      
    }
  },
  async created() {
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
  }
}
</script>


<style scoped>
  .ejaculated {
    font-size: 50px;
  }

  .ejaculate_button {
    margin: 30px;
  }

  .share_label {
    font-size: 20px;
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


