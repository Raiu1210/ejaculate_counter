<script>
import firebase from 'firebase'
import { Doughnut, mixins } from 'vue-chartjs'

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  data() {
    return {
      ejaculated_timstamps: [],
      datas: {
        labels: ['0時~2時', '2時~4時', '4時~6時', '6時~8時', '8時~10時', '10時~12時', '12時~14時', '14時~16時', '16時~18時', '18時~20時', '20時~22時', '20時~24時'],
        datasets: [
          {
            data: [],
            backgroundColor: ['#000080', '#0000cd', '#0000ff', '#00bfff', 
                              '#f0e68c', '#ffff00', '#7fff00', '#ffa500', 
                              '#d2691e', '#800000', '#8b008b', '#4b0082'],
            borderColor: 'transparent'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
         bodyFontSize: 28,
          callbacks: {
            label: function(tooltipItem, data) {
              let total = 0 // 合計格納
              let indexItem = data.datasets[0]["data"][tooltipItem.index]
              console.log(indexItem)
              // 全データの合計算出
              data.datasets[0]["data"].forEach(item => {
                total += item
              })
              // パーセント表示
              return data["labels"][tooltipItem.index] + " : " + (Math.round(indexItem / total * 100) + ' %').toString()
            }
          }
        }
      }
    }
  },
  async created() {
    var self = this
    // get auth info
    await firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.state.user = user
        this.$store.state.login = true
      }
    })
    // get ejaculate timestamps
    await firebase.firestore().collection(this.$store.state.user.uid).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        self.ejaculated_timstamps.push(doc.id)
      });
    });

    // generate timestamp distribution
    const num_data = this.ejaculated_timstamps.length
    var time_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.ejaculated_timstamps.forEach(element => {
      const hour = element.slice(11, 13)
      const index = Math.floor(hour/2)
      time_data[index] += 1 / num_data
    });

    // make it 0.539458328  -> 54%
    var percent_data = []
    time_data.forEach(element => {
      percent_data.push((Math.round(element * 100)).toString() + "%")
    })

    this.datas.datasets[0]["data"] = time_data
    this.renderChart(this.datas, this.options)
  },
}

// function hello() {
//   console.log("Hello")
// }
</script>