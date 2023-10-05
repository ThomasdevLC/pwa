<template>
  <div class="charts">
    <h3 v-if="$route.path === '/'">
      {{ title }}
      <span style="font-weight: 700; margin-left: 10px">
        {{ total }}
      </span>
    </h3>
    <ChartsBar name="Prés" :score="txPres" :obj="objPres" />
    <ChartsBar name="Fm" :score="txFm" :obj="objFm" />
    <ChartsBar name="Ce" :score="txCe" :obj="objCe" />
  </div>
</template>

<script>
import ChartsBar from "../components/ChartsBar.vue";

export default {
  components: { ChartsBar },

  props: ["title", "total", "txPres", "txFm", "txCe", "objPres", "objFm", "objCe"],
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
