<template>
  <h1>Home</h1>
  <label>Vendeur:</label>
  <input v-model="id" type="text" required />
  <select id="year" name="year" v-model="year" @change="handleRequest">
    <option>Année</option>
    <option value="2018">2018</option>
    <option value="2019">2019</option>
    <option value="2020">2020</option>
    <option value="2021">2021</option>
    <option value="2022">2022</option>
    <option value="2023">2023</option>
  </select>
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
  </select>

  <div v-if="stats">
    <h2>{{ stats.fullName }}</h2>
    <!-- TOTAL  -->

    <p>TOTAL</p>
    <p>{{ stats.month.stat.nb_total }}</p>
    <p>{{ stats.month.stat.tx_pres_fm }} %</p>
    <p>{{ stats.month.stat.tx_fm }} %</p>
    <p>{{ stats.month.stat.tx_ce }} %</p>

    <!-- VN  -->
    <p>VN</p>
    <p>{{ stats.month.stat.nb_vn }}</p>
    <p>{{ stats.month.stat.tx_pres_fm_vn }} %</p>
    <p>{{ stats.month.stat.tx_fm_vn }} %</p>
    <p>{{ stats.month.stat.tx_ce_vn }} %</p>

    <!-- VO  -->
    <p>VO</p>
    <p>{{ stats.month.stat.nb_vo }}</p>
    <p>{{ stats.month.stat.tx_pres_fm_vo }} %</p>
    <p>{{ stats.month.stat.tx_fm_vo }} %</p>
    <p>{{ stats.month.stat.tx_ce_vo }} %</p>
  </div>
</template>

<script>
import { ref } from "vue";
import getDatas from "../modules/api";

export default {
  setup() {
    const id = ref("1283");
    const year = ref("2023");
    const month = ref("2");

    const { statDatas, stats, error } = getDatas(
      year.value,
      month.value,
      id.value
    );

    statDatas();

    const handleRequest = async () => {
      await statDatas();
    };

    return { stats, error, id, year, month, handleRequest };
  },
};
</script>

<style></style>
