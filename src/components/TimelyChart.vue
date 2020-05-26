<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ["ejaculated_timstamps"],
  data() {
    return {
      datas: {
        labels: ['0~2', '2~4', '4~6', '6~8', '8~10', '10~12', '12~14', '14~16', '16~18', '18~20', '20~22', '20~24'],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['#f87979', '#aa4c8f', '#38b48b', '#006e54', '#c1e4e9', '#89c3eb', '#c3d825', '#066e54', '#102e54', '#406e74', '#702e94', '#406e70']
          }
        ]
      },
      options: {
        responsive: true
      }
    }
  },
  created() {
    // const slicer = 2
    // const limit = 12

    this.ejaculated_timstamps.forEach(element => {
      const hour = element.slice(11, 13)
      const index = Math.floor(hour/2)
      this.datas.datasets[0]["data"][index] += 1
      
    });

    console.log(this.datas.datasets[0]["data"])
    // this.datas.datasets[0]["data"]
  },
  mounted() {
    this.renderChart(this.datas, this.options)
  }
}

// function hello() {
//   console.log("Hello")
// }
</script>