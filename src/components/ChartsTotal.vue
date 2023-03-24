<template>
  <h3>Total : {{ total }}</h3>
  <div class="radial">
    <progress
      class="test"
      :value="percentage"
      max="100"
      :style="{ '--progress': percentage }"
    ></progress>
  </div>
</template>

<script>
export default {
  props: ["total", "percentage"],
};
</script>

<style>
.radial {
  display: grid;
  place-items: center;
}
progress {
  /* Reset the default appearance */
  -webkit-appearance: none;
  appearance: none;
}

/*gets rid of all pseudo elements*/
::-webkit-progress-inner-element,
::-webkit-progress-bar,
::-webkit-progress-value {
  display: none;
}

::-moz-progress-bar,
::-moz-meter-bar {
  background: transparent;
}

/* overlays text*/
.test:after {
  content: attr(value) "%";
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;
  background: var(--primary);
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 400;
}

/*using a conical gradient to create the doughnut chart  */
.test {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  --fill: calc(var(--progress) * 1%);
  background: conic-gradient(var(--secondary) var(--fill), var(--gray) 0);
  transition: all 1s ease-in-out;
  animation: fill-progress 1s ease-in-out forwards;
}
@keyframes fill-progress {
  to {
    --fill: calc(var(--progress) * 1%);
  }
}
</style>
