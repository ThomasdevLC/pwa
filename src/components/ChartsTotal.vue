<template>
  <div class="total">
    <h3 class="total__title">
      VENTES TOTALES <br />
      <span style="font-weight: 700">{{ total }}</span>
    </h3>
  </div>

  <div class="wrap-circles">
    <div
      class="circle"
      :style="{
        backgroundImage: `conic-gradient(#2bebc8 ${percentage}%, #60626c 0)`,
      }"
    >
      <div class="inner">
        {{ percentage }}
        <span style="font-size: 22px; font-weight: 300; margin-left: 10px"
          >%</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["total", "percentage"],
};
</script>

<style scoped lang="scss">
.wrap-circles {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0.5rem;
  border-radius: 50%;
  background: #ffcdb2;
  overflow: hidden;
}

.circle .inner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  background: var(--primary);
  border-radius: 50%;
  font-size: 30px;
  font-weight: 400;
  color: white;
}
</style>
