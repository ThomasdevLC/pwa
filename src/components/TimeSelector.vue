<template>
  <div class="timeselect">
    <div class="search__box">
      <div class="search__box__icon">
        <i class="material-icons">calendar_month</i>
      </div>
      <vSelect
        class="search__box__select search__box__select-month"
        v-model="store.date.month"
        :options="months"
        label="name"
        :reduce="(v) => v.id"
        :clearable="false"
        @update:modelValue="changeDate"
      />
    </div>
    <div class="search__box">
      <vSelect
        class="search__box__select search__box__select-year"
        v-model="store.date.year"
        :options="years"
        label="name"
        :reduce="(v) => v.id"
        :clearable="false"
        @update:modelValue="changeDate"
      />
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { useStore } from "../store";

export default {
  components: { vSelect },
  emits: ["date-change"],

  mounted() {
    this.$emit("date-change");
  },
  data() {
    const currentYear = new Date().getFullYear();

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
        { id: String(currentYear), name: String(currentYear) },
        { id: String(currentYear - 1), name: String(currentYear - 1) },
        { id: String(currentYear - 2), name: String(currentYear - 2) },
        { id: String(currentYear - 3), name: String(currentYear - 3) },
      ],
      store: useStore(),
    };
  },
  methods: {
    changeDate() {
      this.$emit("date-change");
    },
  },
};
</script>

<style scoped lang="scss">
@use "../assets/styles/mixins" as mixin;
@import "vue-select/dist/vue-select.css";

.timeselect {
  display: flex;
  margin-bottom: 20px;
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

    @include mixin.xs {
      font-size: 14px;
    }
  }
  &__icon {
    height: 32px;
    background: black;
    color: white;
    padding: 10px;
    border-radius: 6px 0 0 6px;
    display: flex;
    place-items: center;
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
  --vs-dropdown-color: white;
  --vs-dropdown-option-color: white;

  --vs-selected-bg: var(--purple);
  --vs-selected-color: white;

  --vs-search-input-color: white;

  --vs-dropdown-option--active-bg: var(--purple);
  --vs-dropdown-option--active-color: white;
}
</style>
