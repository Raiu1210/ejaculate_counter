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
// import firebase from 'firebase'
import CountCard from '@/components/CountCard.vue'
import AmountCard from '@/components/AmountCard.vue'
import TimelyChart from '@/components/TimelyChart.vue'

export default {
  data() {
    return {
      ejaculated_timstamps: [],
    }
  },
  methods: {

  },
  async created() {
    // var self = this
    // var tmp_ejaculated_timstamps = [] 
    
  },
  mounted () {
    
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