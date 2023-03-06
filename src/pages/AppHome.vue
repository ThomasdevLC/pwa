<template>
  <h1>Home</h1>
  <!-- <label>Vendeur:</label>
  <input v-model="id" type="text" required />

  <select id="month" name="month" v-model="month" @change="handleRequest">
    <option>Mois</option>
    <option value="1">Janvier</option>
    <option value="2">Février</option>
    <option value="3">Mars</option>
    <option value="4">Avril</option>
    <option value="5">Mai</option>
    <option value="6">Juin</option>
    <option value="7">Juilet</option>
    <option value="8">Août</option>
    <option value="9">Septembre</option>
    <option value="10">Octobre</option>
    <option value="11">Novembre</option>
    <option value="12">Décembre</option>
  </select> -->

  <div v-if="stat">
    <h2>{{ stat.fullName }}</h2>
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

onMounted(() => {
  getStats();
});

const stat = ref(null);
const id = ref("1283");
const year = ref("2023");
const month = ref("2");

function getStats() {
  getData(year.value, month.value, id.value).then((res) => {
    stat.value = res.month.stat;
  });
}
</script>

<style></style>
