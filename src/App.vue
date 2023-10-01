<template>
  <div class="body">
    <RouterView />
  </div>
</template>

<script setup>
import { useStore } from "./store";
const store = useStore();
</script>

<style lang="scss">
@import "vue-select/dist/vue-select.css";

body {
  background: var(--primary) !important;
}

.home {
  margin: 0 auto;
  max-width: 920px;
  padding: 20px;
  background: var(--primary);
  min-height: 100vh;
}

.total {
  text-align: center;
}

.total h3 {
  font-weight: 300;
}

.separator {
  border-bottom: 1px solid var(--gray);
  width: 70%;
  margin: 30px auto;
}

input {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
