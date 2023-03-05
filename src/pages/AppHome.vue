<template>
  <h1>Home</h1>

  <h2>{{ post.fullName }}</h2>

  <!-- TOTAL  -->

  <p>TOTAL</p>
  <p>{{ post.month.stat.nb_total }}</p>
  <p>{{ post.month.stat.tx_pres_fm }} %</p>
  <p>{{ post.month.stat.tx_fm }} %</p>
  <p>{{ post.month.stat.tx_ce }} %</p>

  <!-- VN  -->
  <p>VN</p>
  <p>{{ post.month.stat.nb_vn }}</p>
  <p>{{ post.month.stat.tx_pres_fm_vn }} %</p>
  <p>{{ post.month.stat.tx_fm_vn }} %</p>
  <p>{{ post.month.stat.tx_ce_vn }} %</p>

  <!-- VO  -->
  <p>VO</p>
  <p>{{ post.month.stat.nb_vo }}</p>
  <p>{{ post.month.stat.tx_pres_fm_vo }} %</p>
  <p>{{ post.month.stat.tx_fm_vo }} %</p>
  <p>{{ post.month.stat.tx_ce_vo }} %</p>
</template>

<script>
import { computed, ref } from "vue";
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
