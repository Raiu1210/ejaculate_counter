<template>
  <div>
    <center>
      <h1>Hello</h1>
    </center>
  </div>  
</template>


<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      db: null,
      user: null,
      allData: []
    }
  },
  methods: {

  },
  async created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.state.user = user
        this.$store.state.login = true

        // this.db = firebase.firestore();
        // const collectionRef = this.db.collection(this.$store.state.user.uid)

        console.log(this.$store.state.user.uid)
        
        firebase.firestore().collection(this.$store.state.user.uid).get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        });
                      

      }
    });
  }
}
</script>