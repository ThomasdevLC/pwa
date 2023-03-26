<template>
  <div class="charts">
    <h3>
      {{ title }}
      <span style="font-weight: 700; margin-left: 10px"> {{ total }}</span>
    </h3>
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

<style>
.charts {
  margin-top: 30px;
}

.charts h3 {
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 15px;
}
</style>
