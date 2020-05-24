<template>
  <div>
    <center>
      <v-card class="top-card" width="60%">
        <v-card-title class="headline">あなたの累計射精回数</v-card-title>
        <v-divider class="mx-3"></v-divider>
        <v-card-text>
          <div class="body-1 mb-1">{{ejaculated_timstamps.length}}回</div>
        </v-card-text>
      </v-card>
      <span>{{ejaculated_timstamps}}</span>
      <Chart></Chart>
    </center>
  </div>  
</template>


<script>
import firebase from 'firebase'
import { Bar } from 'vue-chartjs'
import Chart from '@/components/Chart.vue';

export default {
  extends: Bar,
  data() {
    return {
      ejaculated_timstamps: [],
    }
  },
  methods: {

  },
  async created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.state.user = user
        this.$store.state.login = true

        var tmp_ejaculated_timstamps = []  
        firebase.firestore().collection(this.$store.state.user.uid).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            tmp_ejaculated_timstamps.push(doc.id)
            console.log(doc.id, " => ", doc.data());
          });
        });
                      
        this.ejaculated_timstamps = tmp_ejaculated_timstamps
        console.log(this.ejaculated_timstamps)
      }
    });
  },
  mounted () {
    this.renderChart(this.data, this.options)
  },
  components: {
    Chart,
  },
}
</script>


<style scoped>
  .top-card {
    margin: 100px 0px 0px 0px;
  }
</style>