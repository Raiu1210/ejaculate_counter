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
      user: null
    }
  },
  methods: {

  },
  async created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.user = user
        this.db = firebase.firestore();
        const collection = this.db.collection(this.user.uid).get()
        console.log(collection)
      }
    });
  }
}
</script>