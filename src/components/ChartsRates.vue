<template>
  <div>
    <h3>{{ title }} : {{ total }}</h3>
    <ChartsBar name="Prés" :score="txPres" :scale="txPres" />
    <ChartsBar name="Fm" :score="txFm" :scale="txFm" />
    <ChartsBar name="Ce" :score="txCe" :scale="txCe" />
  </div>
</template>

<script>
import ChartsBar from "../components/ChartsBar.vue";

export default {
  components: { ChartsBar },

  props: ["title", "total", "txPres", "txFm", "txCe"],
};
</script>

<style></style>
