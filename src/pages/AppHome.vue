<template>
  <h1>Home</h1>
  <h2>{{ post.title }}</h2>
  <p>{{ post.body }}</p>
  <p v-if="error">{{ error }}</p>
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
