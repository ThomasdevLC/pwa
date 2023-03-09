<template>
  <div v-if="!data">LOADER</div>

  <div v-else>
    <div>
      <h2>{{ data.fullName }} {{ data.typeToString }}</h2>
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
    </div>

    <div v-if="stat">
      <div class="radial">
        <div
          class="pie animate no-round"
          :style="{ '--p': percentage.value, '--c': 'orange' }"
        >
          {{ percentage.value }}%
        </div>
      </div>
      <div class="numbers">
        <!-- VN  -->
        <div v-if="stat.nb_vn">
          <h3>VN : {{ stat.nb_vn }}</h3>

          <table
            class="charts-css bar show-labels data-spacing-5 labels-align-start show-data-axes"
          >
            <tbody>
              <tr>
                <th scope="row">Pré FM :</th>
                <td
                  :style="
                    '--size: calc(' +
                    stat.tx_pres_fm_vn +
                    '  / 100 ); --color: orange;'
                  "
                >
                  <span class="data"> {{ stat.tx_pres_fm_vn }} </span>
                </td>
              </tr>
              <tr>
                <th scope="row">Pén FM :</th>

                <td
                  :style="
                    '--size: calc(' +
                    stat.tx_fm_vn +
                    ' / 100 ); --color: orange;'
                  "
                >
                  <span class="data"> {{ stat.tx_fm_vn }} </span>
                </td>
              </tr>
              <tr>
                <th scope="row">Péné CE :</th>

                <td
                  :style="
                    '--size: calc(' +
                    stat.tx_ce_vn +
                    ' / 100 ); --color: orange;'
                  "
                >
                  <span class="data"> {{ stat.tx_ce_vn }} </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="numbers">
        <!-- VO  -->
        <div v-if="stat.nb_vo">
          <h3>VO : {{ stat.nb_vo }}</h3>
          <table
            id="my-chart"
            class="charts-css bar show-labels labels-align-start data-spacing-5 labels-align-start show-data-axes"
          >
            <tbody>
              <tr>
                <th class="title" scope="row">Prés FM %</th>
                <td
                  :style="
                    '--size: calc(' +
                    stat.tx_pres_fm_vo +
                    '  / 100 ); --color: orange; '
                  "
                >
                  <span class="data"> {{ stat.tx_pres_fm_vo }} </span>
                </td>
              </tr>
              <tr>
                <th scope="row">Péné FM %</th>

                <td
                  :style="
                    '--size: calc(' +
                    stat.tx_fm_vo +
                    ' / 100 ); --color: orange;'
                  "
                >
                  <span class="data"> {{ stat.tx_fm_vo }} </span>
                </td>
              </tr>
              <tr>
                <th class="title" scope="row">Péné CE %</th>

                <td
                  :style="
                    ';--size: calc(' +
                    stat.tx_ce_vo +
                    ' / 100 ); --color: orange ; '
                  "
                >
                  <span class="data"> {{ stat.tx_ce_vo }} </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- <pre> {{ data }}  </pre> -->
    </div>
  </div>
</template>

<script setup>
import "charts.css";
import { ref, onMounted, computed } from "vue";
import getData from "../modules/api";

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

const getStats = async () => {
  try {
    const res = await getData(
      selectedYear.value,
      selectedMonth.value,
      id.value
    );
    data.value = res;
    console.log(res.select.stat);

    stat.value = res.month.stat;
    objectives.value = res.month.objectives.total;
    total.value = res.month.stat.nb_total;
    error.value = null;
    console.log("test home", res);
  } catch (err) {
    console.log("err home", err);
    error.value = err.message;
    stat.value = null;
  }
};

const percentageCalc = computed(() => {
  const percentage = Math.round((total.value / objectives.value) * 100);
  return Math.min(percentage, 100);
});

percentage.value = percentageCalc;

onMounted(() => {
  getStats();
});

const handleRequest = () => {
  getStats();
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

#my-chart.bar {
  --labels-size: 100px;
}

.data {
  padding: 0px 5px;
}

@property --p {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

.radial {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pie {
  --p: 20;
  --b: 22px;
  --c: #ff8800;
  --w: 150px;

  width: var(--w);
  aspect-ratio: 1;
  position: relative;
  display: inline-grid;
  margin: 5px;
  place-content: center;
  font-size: 25px;
  font-weight: bold;
  font-family: sans-serif;
}
.pie:before,
.pie:after {
  content: "";
  position: absolute;
  border-radius: 50%;
}
.pie:before {
  inset: 0;
  background: radial-gradient(farthest-side, var(--c) 98%, #0000) top/var(--b)
      var(--b) no-repeat,
    conic-gradient(var(--c) calc(var(--p) * 1%), #0000 0);
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(99% - var(--b)),
    #000 calc(100% - var(--b))
  );
  mask: radial-gradient(
    farthest-side,
    #0000 calc(99% - var(--b)),
    #000 calc(100% - var(--b))
  );
}
.pie:after {
  inset: calc(50% - var(--b) / 2);
  background: var(--c);
  transform: rotate(calc(var(--p) * 3.6deg))
    translateY(calc(50% - var(--w) / 2));
}
.animate {
  animation: p 1s 0.5s both;
}
.no-round:before {
  background-size: 0 0, auto;
  border: 3px solid rgb(211, 198, 198);
}
.no-round:after {
  content: none;
}
@keyframes p {
  from {
    --p: 0;
  }
}
</style>
