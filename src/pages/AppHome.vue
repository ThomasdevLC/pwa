<template>
  <h1>Home</h1>
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

  <div v-if="name">
    <h2>{{ name }}</h2>
  </div>

  <div v-if="stat">
    <!-- TOTAL  -->

    <p>TOTAL</p>
    <p>{{ stat.nb_total }}</p>
    <p>{{ stat.tx_pres_fm }} %</p>
    <p>{{ stat.tx_fm }} %</p>
    <p>{{ stat.tx_ce }} %</p>

    <!-- VN  -->
    <p>VN</p>
    <p>{{ stat.nb_vn }}</p>
    <p>{{ stat.tx_pres_fm_vn }} %</p>
    <p>{{ stat.tx_fm_vn }} %</p>
    <p>{{ stat.tx_ce_vn }} %</p>

    <!-- VO  -->
    <p>VO</p>
    <p>{{ stat.nb_vo }}</p>
    <p>{{ stat.tx_pres_fm_vo }} %</p>
    <p>{{ stat.tx_fm_vo }} %</p>
    <p>{{ stat.tx_ce_vo }} %</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import getData from "../modules/api";

const name = ref(null);
const stat = ref(null);
const id = ref("1280");
const months = ref([
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
]);
const selectedMonth = ref(new Date().getMonth());
const years = ref(["2023", "2022", "2021", "2020"]);
const selectedYear = ref(new Date().getFullYear());

const getStats = () => {
  getData(year.value, month.value, id.value).then((res) => {
    name.value = res.fullName;
    stat.value = res.month.stat;
  });
};

onMounted(() => {
  getStats();
});

const handleRequest = async () => {
  getStats();
};
</script>

<style></style>
