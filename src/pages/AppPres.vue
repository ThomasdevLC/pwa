<template>
  <div class="main">
    <div class="bar">
      <p>Pres</p>
      <div class="">
        <div class="bar__rate">
          <div
            class="bar__rate__level"
            :style="{
              transform: `scale(calc(${scale}), 1)`,
              backgroundColor: `var(--secondary)`,
            }"
          ></div>
        </div>
      </div>
      <p>{{ score }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "score", "scale"],
};
</script>

<style>
.main {
  background: var(--primary);
}
.bar {
  margin: 10px 0;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 6fr 1fr;
  gap: 6px;
}
.bar p {
  margin: 0 0 10px;
  font-weight: 00;
}

.bar__rate {
  background: var(--gray);
  border-radius: 0 6px 6px 0px;
}

.bar__rate__level {
  height: 20px;
  border-radius: 0 6px 6px 0px;
  transform-origin: left;
  transition: all 0.5s ease-in-out;
  transform: scale(0, 1);
}
</style>
