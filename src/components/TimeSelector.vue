<template>
  <div class="search">
    <select id="month" name="month" v-model="date.month" @change="changeDate">
      <option v-for="(month, index) in months" :value="index" :key="index">
        {{ month }}
      </option>
    </select>

    <select id="year" name="year" v-model="date.year" @change="changeDate">
      <option v-for="year in years" :value="year" :key="year">
        {{ year }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$emit("date-change", this.date);
  },
  data() {
    return {
      months: {
        year: "Annuel",
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
      },
      years: ["2023", "2022", "2021", "2020"],
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      },
    };
  },
  methods: {
    changeDate() {
      this.$emit("date-change", this.date);
    },
  },
};
</script>
