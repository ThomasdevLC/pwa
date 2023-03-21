<template>
  <div class="rateBox">
    <p>{{ name }}</p>
    <p>{{ score }}</p>

    <div class="rate">
      <div
        class="rate-level"
        :style="{
          transform: `scale(calc(${scale}), 1)`,
          backgroundColor: '#2bebc8',
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "score", "scale"],
};
</script>

<style>
.rateBox {
  width: 100%;
  margin: 20px 0;
}
.rateBox p {
  color: black;
  margin: 0 0 10px;
  font-weight: 500;
}
.rateBox p:nth-child(2) {
  float: right;
  position: relative;
  top: -35px;
}

.rate {
  background: lightgray;
}

.rate-level {
  height: 22px;
  border-radius: 0 8px 8px 0px;
  transform-origin: left;
  transition: all 0.5s ease-in-out;
  transform: scale(0, 1);
}
</style>
