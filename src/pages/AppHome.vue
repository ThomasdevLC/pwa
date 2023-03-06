<template>
  <label>Vendeur:</label>
  <input v-model="id" type="text" required />

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

  <select id="year" name="year" v-model="selectedYear" @change="handleRequest">
    <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
  </select>
  <div v-if="error">{{ error }}</div>
  <div v-if="name">
    <h2>{{ name }}</h2>
  </div>

  <!-- TEST -->
  <div>
    <pre>{{ selectedMonth }}</pre>
    <pre>{{ selectedYear }}</pre>
    <pre>{{ id }}</pre>
  </div>

  <div v-if="stat">
    <!-- TOTAL  -->

    <div class="numbers">
      <h3>TOTAL</h3>
      <p>{{ stat.nb_total }}</p>
      <p>{{ stat.tx_pres_fm }} %</p>
      <p>{{ stat.tx_fm }} %</p>
      <p>{{ stat.tx_ce }} %</p>
    </div>

    <div class="numbers">
      <!-- VN  -->
      <h3>VN</h3>
      <p>{{ stat.nb_vn }}</p>
      <p>{{ stat.tx_pres_fm_vn }} %</p>
      <p>{{ stat.tx_fm_vn }} %</p>
      <p>{{ stat.tx_ce_vn }} %</p>
    </div>

    <div class="numbers">
      <!-- VO  -->
      <h3>VO</h3>
      <p>{{ stat.nb_vo }}</p>
      <p>{{ stat.tx_pres_fm_vo }} %</p>
      <p>{{ stat.tx_fm_vo }} %</p>
      <p>{{ stat.tx_ce_vo }} %</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import getData from "../modules/api";

const name = ref(null);
const stat = ref(null);
const id = ref("1283");
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

const getStats = async () => {
  try {
    const res = await getData(
      selectedYear.value,
      selectedMonth.value,
      id.value
    );
    name.value = res.fullName;
    stat.value = res.month.stat;
    console.log("test home", res);
  } catch (err) {
    console.log("err home", err);
    error.value = err.message;
    stat.value = null;
  }
};

onMounted(() => {
  getStats();
});

const handleRequest = async () => {
  getStats();
};
</script>

<style>
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
