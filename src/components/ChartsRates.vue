<template>
  <div class="center">
    <h3>{{ title }} : {{ total }}</h3>
    <div class="rateBox">
      <p>Prés FM :</p>
      <p>{{ txPres }}</p>
      <div class="rate">
        <div
          class="rate-level"
          :style="{
            width: txPres,
            transform: `scale(calc(${txPres}), 1)`,
            backgroundColor: '#ff8800',
          }"
        ></div>
      </div>
    </div>
    <div class="rateBox">
      <p>Pén FM :</p>
      <p>{{ txFm }}</p>
      <div class="rate">
        <div
          class="rate-level"
          :style="{
            width: txFm,
            transform: `scale(calc(${txFm}), 1)`,
            backgroundColor: '#ff8800',
          }"
        ></div>
      </div>
    </div>
    <div class="rateBox">
      <p>Pén CE :</p>
      <p>{{ txCe }}</p>
      <div class="rate">
        <div
          class="rate-level"
          :style="{
            width: txCe,
            transform: `scale(calc(${txCe}), 1)`,
            backgroundColor: '#ff8800',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "total", "txPres", "txFm", "txCe"],
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
