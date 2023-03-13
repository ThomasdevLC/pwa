<template>
  <div class="rateBox">
    <p>{{ name }}</p>
    <p>{{ score }}</p>

    <div class="rate">
      <div
        class="rate-level"
        :style="{
          width: width,
          transform: `scale(calc(${scale}), 1)`,
          backgroundColor: '#ff8800',
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "score", "width", "scale"],
};
</script>

<style>
.center {
  width: 100%;
}

h3 {
  margin: 0;
  padding: 0;
  color: #333;
}

.rateBox {
  width: 100%;
  margin: 20px 0;
}
.rateBox p {
  color: #333;
  margin: 0 0 10px;
  font-weight: 900;
}
.rateBox p:nth-child(2) {
  float: right;
  position: relative;
  top: -35px;
}

.rate {
  background: #5f5e5e;
  padding: 3px;
  border: 1px solid #ff8800;
}

.rate-level {
  height: 12px;
  transform-origin: left;
  transition: all 0.6s ease-in-out;
  transform: scale(0, 1);
}
</style>
