

<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  data() {
    return {
      datas: {
        labels: ['0~2', '2~4', '4~6', '6~8', '8~10', '10~12', '12~14', '14~16', '16~18', '18~20', '20~22', '20~24'],
        datasets: [
          {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            backgroundColor: ['#f87979', '#aa4c8f', '#38b48b', '#006e54', '#c1e4e9', '#89c3eb', '#c3d825', '#066e54', '#102e54', '#406e74', '#702e94', '#406e70']
          }
        ]
      },
      options: {
        responsive: true
      }
    }
  },
  mounted() {
    this.renderChart(this.datas, this.options)
  }
}
</script>