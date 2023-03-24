<template>
  <div class="timeselect">
    <div class="search__box">
      <div class="search__box__icon">
        <i class="fa-solid fa-calendar-days"></i>
      </div>
      <vSelect
        class="search__box__select search__box__select-month"
        :options="months"
        label="name"
        :reduce="(v) => v.id"
        :clearable="false"
        v-model="date.month"
        @update:modelValue="changeDate"
      />
    </div>
    <div class="search__box">
      <!-- <div class="search__box__icon">
        <i class="fa-solid fa-calendar-days"></i>
      </div> -->
      <vSelect
        class="search__box__select search__box__select-year"
        :options="years"
        label="name"
        :reduce="(v) => v.id"
        :clearable="false"
        v-model="date.year"
        @update:modelValue="changeDate"
      />
    </div>
  </div>
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

<style scoped lang="scss">
@import "vue-select/dist/vue-select.css";

.timeselect {
  display: flex;
  margin-bottom: 10px;
}

.search__box {
  display: flex;
  width: 100%;

  &__select {
    width: 100%;
    height: 32px;
    background: black;
    margin-bottom: 10px;
    font-weight: 300;
  }
  &__icon {
    height: 32px;
    background: black;
    color: white;
    padding: 10px;
    border-radius: 6px 0 0 6px;
    display: flex;
    justify-content: center;
  }
}

.search__box__select-month {
  border-radius: 0px;
}
.search__box__select-year {
  border-radius: 0 6px 6px 0;
}

.search__box__select {
  --vs-controls-color: var(--gray);
  --vs-search-input-bg: black;
  --vs-border-width: 0px;

  --vs-dropdown-bg: black;
  --vs-dropdown-color: var(--gray);
  --vs-dropdown-option-color: var(--gray);

  --vs-selected-bg: var(--purple);
  --vs-selected-color: white;

  --vs-search-input-color: white;

  --vs-dropdown-option--active-bg: var(--purple);
  --vs-dropdown-option--active-color: white;
}
</style>
