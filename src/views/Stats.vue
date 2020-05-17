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

  },
  methods: {

  },
  created() {
    var db = firebase.firestore()

    db.collection(this.$store.state.user.uid).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
  }
}
</script>