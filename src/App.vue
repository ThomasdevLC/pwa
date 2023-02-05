<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/stat">Stat</RouterLink>
      <RouterLink to="/pres">Tx pres</RouterLink>
    </nav>

    <RouterView />

  </div>

</template>

<style scoped>

</style>
