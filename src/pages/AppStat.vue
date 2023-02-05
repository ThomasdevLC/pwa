<script setup>
import { RouterLink, RouterView } from 'vue-router'

defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">STAT</h1>

  </div>
</template>

<style scoped>

</style>
