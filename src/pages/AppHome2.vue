<template>
  <div>
    <TimeSelector @someEvent="toto" @change="toto" />
  </div>

  <div v-if="data">
    <!-- <div>
      <h2>{{ data.fullName }} {{ data.typeToString }} Mensuel</h2>
      <h2>{{ data.storeToString }}</h2>
    </div>

    <div class="search">
      <input
        v-model="id"
        type="text"
        @keydown.enter.prevent="handleRequest"
        required
      />

      <select
        id="month"
        name="month"
        v-model="selectedMonth"
        @change="handleRequest"
      >
        <option v-for="(month, index) in months" :value="index" :key="index">
          {{ month }}
        </option>
      </select>

      <select
        id="year"
        name="year"
        v-model="selectedYear"
        @change="handleRequest"
      >
        <option v-for="year in years" :value="year" :key="year">
          {{ year }}
        </option>
      </select>
      <div v-if="error">{{ error }}</div>
    </div> -->

    <div class="numbers">
      <ChartsTotal :total="stat.nb_total" :percentage="percentage.value" />
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

  <pre> {{ data }}  </pre>
</template>

<script>
import "charts.css";
import { ref, onMounted, computed } from "vue";
import getData from "../modules/api";
import ChartsTotal from "../components/ChartsTotal.vue";
import ChartsRates from "../components/ChartsRates2.vue";
import TimeSelector from "../components/TimeSelector.vue";

export default {
  components: { ChartsTotal, ChartsRates, TimeSelector },

  setup() {
    // infos id + date
    const id = ref("1283");
    const data = ref(null);
    const months = ref({
      1: "Janvier",
      2: "Février",
      3: "Mars",
      4: "Avril",
      5: "Mai",
      6: "Juin",
      7: "Juillet",
      8: "Août",
      9: "Septembre",
      10: "Octobre",
      11: "Novembre",
      12: "Décembre",
    });
    const selectedMonth = ref(new Date().getMonth() + 1);
    const years = ref(["2023", "2022", "2021", "2020"]);
    const selectedYear = ref(new Date().getFullYear());
    const error = ref(null);

    // infos stats
    const stat = ref(null);
    const total = ref(null);
    const objectives = ref(null);
    const percentage = ref(null);

    const toto = (date) => {
      console.log("TOTO", date.month);
      getData(date.year, date.month, date.id)
        .then((res) => {
          console.log("RES TOTO", res);
          data.value = res;
          stat.value = res.month.stat;
          objectives.value = res.month.objectives.total;
          total.value = res.month.stat.nb_total;
          error.value = null;
        })

        .catch((err) => {
          console.log("err home", err);
          error.value = err.message;
          stat.value = null;
        });
    };

    const percentageCalc = computed(() => {
      const percentage = Math.round((total.value / objectives.value) * 100);
      return Math.min(percentage, 100);
    });

    percentage.value = percentageCalc;

    onMounted(() => {});

    return {
      id,
      data,
      error,
      stat,
      total,
      objectives,
      percentage,
      percentageCalc,
      // handleRequest,
      toto,
    };
  },
};
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
