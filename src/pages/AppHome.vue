<template>
  <div v-if="name">
    <h2>{{ name }}</h2>
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
  <div class="thing">
    <div style="width: 90%"><canvas id="myChart"></canvas></div>
  </div>

  <div v-if="stat">
    <div class="numbers">
      <!-- VN  -->
      <div v-if="stat.nb_vn">
        <h3>VN</h3>
        <p>Total : {{ stat.nb_vn }}</p>
        <p>Présentation FM : {{ stat.tx_pres_fm_vn }} %</p>
        <p>Pénétration FM : {{ stat.tx_fm_vn }} %</p>
        <p>Pénétration CE : {{ stat.tx_ce_vn }} %</p>
      </div>
    </div>

    <div class="numbers">
      <!-- VO  -->
      <div v-if="stat.nb_vo">
        <h3>VO</h3>
        <p>Total : {{ stat.nb_vo }}</p>
        <p>Présentation FM :{{ stat.tx_pres_fm_vo }} %</p>
        <p>Pénétration FM :{{ stat.tx_fm_vo }} %</p>
        <p>Pénétration CE :{{ stat.tx_ce_vo }} %</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from "chart.js/auto";
import { ref, onMounted, computed } from "vue";
import getData from "../modules/api";

const name = ref(null);
const stat = ref(null);
const id = ref("1285");
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
const selectedMonth = ref(new Date().getMonth());
const years = ref(["2023", "2022", "2021", "2020"]);
const selectedYear = ref(new Date().getFullYear());
const error = ref(null);

const chartVn = ref();

console.log("chart", chartVn);
console.log("stat", stat);

const getStats = async () => {
  try {
    const res = await getData(
      selectedYear.value,
      selectedMonth.value,
      id.value
    );
    name.value = res.fullName;
    stat.value = res.month.stat;
    chartVn.value = [
      res.month.stat.tx_pres_fm_vn,
      res.month.stat.tx_fm_vn,
      res.month.stat.tx_ce_vn,
    ];
    error.value = null;
    console.log("test home", res);
    return chartVn;
  } catch (err) {
    console.log("err home", err);
    error.value = err.message;
    stat.value = null;
  }
};

onMounted(() => {
  getStats();

  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  myChart;
});

const handleRequest = async () => {
  getStats();
};
</script>

<style>
.search {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
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
  margin: 0 40px 30px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #e7e7e7;
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
