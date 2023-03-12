<template>
  <div>
    <TimeSelector @date-change="getStat" />
  </div>

  <div v-if="data">


    <div class="numbers">
      <ChartsTotal :total="stat.nb_total" :percentage="percentage" />
      <ChartsRates
          title="VN"
          :total="stat.nb_vn"
          :txPres="stat.tx_pres_fm_vn"
          :txFm="stat.tx_fm_vn"
          :txCe="stat.tx_ce_vn"
      />
    </div>
    <div class="numbers">
      <ChartsRates
          title="VO"
          :total="stat.nb_vo"
          :txPres="stat.tx_pres_fm_vo"
          :txFm="stat.tx_fm_vo"
          :txCe="stat.tx_ce_vo"
      />
    </div>
  </div>

  <!-- TEST -->
<!--  <div>
    <pre> {{ data }}  </pre>

  </div>-->

</template>

<script>
import "charts.css";
import getData from "../modules/api";
import TimeSelector from "../components/TimeSelector.vue";
import ChartsTotal from "../components/ChartsTotal.vue";
import ChartsRates from "../components/ChartsRates.vue";

export default {
  components: {TimeSelector, ChartsTotal, ChartsRates},
  mounted() {
  },
  data() {
    return {
      data: null,
      error: null,
      stat: null,
      objectives: null,
      total: null,
    }
  },
  computed: {
    percentage() {
      let percentage = Math.round((this.total / this.objectives) * 100);
      return Math.min(percentage, 100);
    }
  },
  methods: {
    getStat(date) {
      getData(date.year, date.month, date.id)
          .then((res) => {
            console.log("RES TOTO", res);
            this.data = res;
            /** todo : Faire une ternaire */
            this.stat = res.month.stat;
            this.objectives = res.month.objectives.total;
            this.total = res.month.stat.nb_total;
            this.error = null;
          })
          .catch((err) => {
            console.log("err home", err);
            this.error = err.message;
            this.stat = null;
          });
    }
  }
}
</script>

<style>
.search {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
  margin-bottom: 50px;
}
input,
select {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #eee;
}

.numbers {
  padding: 30px 30px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #e7e7e7;
  max-width: 700px;
  margin: auto;
}
.numbers h3 {
  display: inline-block;
  position: relative;
  font-size: 26px;
  color: white;
  margin-bottom: 10px;
  max-width: 400px;
}
.numbers h3::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 130px;
  left: -30px;
  transform: rotateZ(-1deg);
}
</style>


