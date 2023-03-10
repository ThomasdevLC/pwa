<template>
  <div class="search">
    <input
      v-model="id"
      type="text"
      @keydown.enter.prevent="$emit('change', date)"
      required
    />

    <select
      id="month"
      name="month"
      v-model="selectedMonth"
      @change="$emit('change', date)"
    >
      <option v-for="(month, index) in months" :value="index" :key="index">
        {{ month }}
      </option>
    </select>

    <select
      id="year"
      name="year"
      v-model="selectedYear"
      @change="$emit('change', date)"
    >
      <option v-for="year in years" :value="year" :key="year">
        {{ year }}
      </option>
    </select>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["change"],

  setup() {
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
    const selectedMonth = ref(new Date().getMonth() + 1);
    const years = ref(["2023", "2022", "2021", "2020"]);
    const selectedYear = ref(new Date().getFullYear());
    return { id, months, selectedMonth, years, selectedYear };
  },
};
</script>
<style></style>
