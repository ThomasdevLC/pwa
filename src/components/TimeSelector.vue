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
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  emits: ["change"],

  setup() {
    const date = {
      year: "2023",
      month: "2",
      id: "1283",
    };

    return { date };
  },
};
</script>
<style></style>
