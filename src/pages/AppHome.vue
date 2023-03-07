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

  <div v-if="stat">
    <!-- TOTAL  -->

    <!-- <div class="numbers">
      <div v-if="stat.nb_total">
        <h3>TOTAL</h3>
        <p>VN{{ stat.nb_total }}</p>
        <p>{{ stat.tx_pres_fm }} %</p>
        <p>{{ stat.tx_fm }} %</p>
        <p>{{ stat.tx_ce }} %</p>
      </div>
    </div> -->

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
import { ref, onMounted } from "vue";
import getData from "../modules/api";

const name = ref(null);
const stat = ref(null);
const id = ref("");
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
    error.value = null;

    console.log("test home", res);
  } catch (err) {
    console.log("err home", err);
    error.value = err.message;
    stat.value = null;
  }
};

// onMounted(() => {
//   getStats();
// });

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
