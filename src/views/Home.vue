<template>
  <div class="home">
    <Signin v-show="!this.$store.state.login"></Signin>
    <Top v-show="this.$store.state.login"></Top>
  </div>
</template>

<script>
// @ is an alias to /src
import Signin from '@/components/Signin.vue'
import Top from '@/views/TopView.vue'

export default {
  name: 'Home',
  components: {
    Signin,
    Top
  }
}
</script>
