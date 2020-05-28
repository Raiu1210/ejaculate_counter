<template>
  <div>
    <center>
      <CountCard v-bind="{ count: ejaculated_timstamps.length }"></CountCard>
      <AmountCard v-bind="{ count: ejaculated_timstamps.length }"></AmountCard>
      <TimeGraphCard></TimeGraphCard>
    </center>
  </div>  
</template>


<script>
import firebase from 'firebase'
import CountCard from '@/components/CountCard.vue'
import AmountCard from '@/components/AmountCard.vue'
import TimeGraphCard from '@/components/TimeGraphCard.vue'

export default {
  data() {
    return {
      ejaculated_timstamps: [],
    }
  },
  methods: {

  },
  async created() {
    var self = this
    var tmp_ejaculated_timstamps = [] 
    await firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.state.user = user
        this.$store.state.login = true

        firebase.firestore().collection(this.$store.state.user.uid).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            tmp_ejaculated_timstamps.push(doc.id)
          });

          self.ejaculated_timstamps = tmp_ejaculated_timstamps
        });
      }
    });
  },
  mounted () {
    
  },
  components: {
    CountCard,
    AmountCard,
    TimeGraphCard,
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
</style>