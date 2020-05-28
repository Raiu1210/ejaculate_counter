<template>
  <v-card class="second-card" width="80%">
    <v-card-title class="headline">射精時間帯</v-card-title>
    <v-divider class="mx-3"></v-divider>
    <v-card-text>
      <div class="timely-chart">
        <TimelyChart></TimelyChart>
      </div>
    </v-card-text>
  </v-card>
</template>


<script>
import TimelyChart from '@/components/TimelyChart.vue'

export default {
  components: {
    TimelyChart,
  },
}
</script>


<style scoped>
  .timely-chart {
    margin: 20px 0px 0px 0px;
    width: 90%;
  }
</style>