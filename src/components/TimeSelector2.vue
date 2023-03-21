<template>
  <vSelect
    :options="months"
    label="name"
    :reduce="(v) => v.id"
    :clearable="false"
    v-model="date.month"
    @update:modelValue="changeDate"
  />
  <vSelect
    :options="years"
    label="name"
    :reduce="(v) => v.id"
    :clearable="false"
    v-model="date.year"
    @update:modelValue="changeDate"
  />
</template>

<script>
import vSelect from "vue-select";

export default {
  components: { vSelect },
  props: ["currentDate"],
  emits: ["date-change"],

  mounted() {
    // this.$emit("date-change", this.date);
  },
  data() {
    return {
      months: [
        { id: "year", name: "Annuel" },
        { id: 1, name: "Janvier" },
        { id: 2, name: "Février" },
        { id: 3, name: "Mars" },
        { id: 4, name: "Avril" },
        { id: 5, name: "Mai" },
        { id: 6, name: "Juin" },
        { id: 7, name: "Juillet" },
        { id: 8, name: "Août" },
        { id: 9, name: "Septembre" },
        { id: 10, name: "Octobre" },
        { id: 11, name: "Novembre" },
        { id: 12, name: "Décembre" },
      ],

      years: [
        { id: "2023", name: "2023" },
        { id: "2022", name: "2022" },
        { id: "2021", name: "2021" },
        { id: "2020", name: "2020" },
      ],
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

<style>
@import "vue-select/dist/vue-select.css";
</style>
