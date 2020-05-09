<template>
  <div>
    <center>
      <br>
      <img :src="this.$store.state.user.photoURL">
      <h3>displayName : {{this.$store.state.user.displayName}}</h3>
      <h3>uid : {{this.$store.state.user.uid}}</h3>
    </center>
  </div>  
</template>


<script>

</script>