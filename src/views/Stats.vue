<template>
  <div>
    <center>
      <CountCard v-bind="{ count: ejaculated_timstamps.length }"></CountCard>
      <AmountCard v-bind="{ count: ejaculated_timstamps.length }"></AmountCard>

      <div class="timely-chart">
        <center>
          <TimelyChart></TimelyChart>
        </center>
      </div>
    </center>
  </div>  
</template>


<script>
import firebase from 'firebase'
import { Bar } from 'vue-chartjs'
import CountCard from '@/components/CountCard.vue'
import AmountCard from '@/components/AmountCard.vue'
import TimelyChart from '@/components/TimelyChart.vue'

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
        console.log(user)

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
        console.log(this.ejaculated_timstamps.length)
      }
    });
  },
  mounted () {
    this.renderChart(this.data, this.options)
  },
  components: {
    CountCard,
    AmountCard,
    TimelyChart
  },
}
</script>


<style scoped>
  .top-card {
    margin: 100px 0px 0px 0px;
  }

  .second-card {
    margin: 20px 0px 0px 0px;
  }

  .timely-chart {
    margin: 20px 0px 0px 0px;
    width: 50%;
  }
</style>