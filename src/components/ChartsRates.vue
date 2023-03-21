<template>
  <div class="center">
    <h3>{{ title }} : {{ total }}</h3>
    <ChartsBar name="Prés FM" :score="txPres" :scale="txPres" />
    <ChartsBar name="FM" :score="txFm" :scale="txFm" />
    <ChartsBar name="CE" :score="txCe" :scale="txCe" />
  </div>
</template>

<script>
import ChartsBar from "../components/ChartsBar.vue";

export default {
  components: { ChartsBar },

  props: ["title", "total", "txPres", "txFm", "txCe"],
};
</script>

<style>
.center {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
}

h3 {
  margin: 0;
  padding: 0;
  color: #333;
}
</style>
