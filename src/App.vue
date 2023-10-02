<template>
  <div class="body body-desktop">
    <RouterView />
  </div>
</template>

<script setup>
import { useStore } from "./store";
const store = useStore();
</script>

<style lang="scss">
@use "./assets/styles/mixins" as mixin;
@import "vue-select/dist/vue-select.css";

body {
  background: var(--primary);
  @include mixin.xl {
    padding: 20px;
  }
  @include mixin.lg-lt {
    padding: 40px 80px;
  }
  @include mixin.sm-lt {
    padding: 0px;
  }
}

.home {
  margin: 0 auto;
  padding: 20px;
  background: var(--primary);
  min-height: 100vh;
  @include mixin.xl {
    max-width: 400px;
    border: 1px solid var(--text-color);
    border-radius: 10px;
  }
}

.total {
  text-align: center;
}

.total h3 {
  font-size: 24px;
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
