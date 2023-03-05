<template>
  <h1>Home</h1>

  <h2>{{ post.fullName }}</h2>
</template>

<script>
import { ref } from "vue";
import getTest from "../modules/api";

export default {
  setup() {
    const id = ref("3");

    const { test, post, error } = getTest(id.value);

    test();
    return { post, error };
  },
};
</script>

<style></style>
