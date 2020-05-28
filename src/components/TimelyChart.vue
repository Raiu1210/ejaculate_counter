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
        labels: ['0~2', '2~4', '4~6', '6~8', '8~10', '10~12', '12~14', '14~16', '16~18', '18~20', '20~22', '20~24'],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['#000080', '#0000cd', '#0000ff', '#00bfff', 
                              '#f0e68c', '#ffff00', '#7fff00', '#ffa500', 
                              '#d2691e', '#800000', '#8b008b', '#4b0082']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
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
    var time_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.ejaculated_timstamps.forEach(element => {
      const hour = element.slice(11, 13)
      const index = Math.floor(hour/2)
      time_data[index] += 1
    });

    this.datas.datasets[0]["data"] = time_data
    this.renderChart(this.datas, this.options)
  },
}

// function hello() {
//   console.log("Hello")
// }
</script>