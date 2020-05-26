<template>
  <v-card class="top-card" width="80%">
    <v-card-title class="headline">あなたの累計射精回数</v-card-title>
    <v-divider class="mx-3"></v-divider>
    <v-card-text>
      <div class="body-1 mb-1">{{ count }}回</div>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  props: ["count"]
}
</script>