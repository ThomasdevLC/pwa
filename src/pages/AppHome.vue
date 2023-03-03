<template>
  <h1>Home</h1>
</template>

<script>
import { ref } from "vue";
import getTest from "../modules/api";

export default {
  setup() {
    const id = ref("3");

    const { test } = getTest(id.value);

    test();
  },
};
</script>

<style></style>
