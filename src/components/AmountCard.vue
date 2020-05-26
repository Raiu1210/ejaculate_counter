<template>
  <v-card class="second-card" width="80%">
    <v-card-title class="headline">あなたの推計射精量[ml]</v-card-title>
    <v-divider class="mx-3"></v-divider>
    <v-card-text>
      <div class="body-1 mb-1">{{ count * 3.5 }} [ml]</div>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  props: ["count"]
}
</script>