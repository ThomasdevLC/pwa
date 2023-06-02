<template>
  <div class="custom-loader"></div>
</template>

<script>
export default {};
</script>

<style>
.custom-loader {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 6px solid;
  border-color: var(--purple-second);
  border-right-color: var(--purple);
  animation: s2 1s infinite linear;
  margin: auto;
}
@keyframes s2 {
  to {
    transform: rotate(1turn);
  }
}
</style>
