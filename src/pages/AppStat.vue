<template>
  <progress class="test" value="80" max="100" style="--progress: 80"></progress>
</template>

<script>
export default {};
</script>

<style scoped>
progress,
meter {
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
  background: white;
  border-radius: 50%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
}

/*using a conical gradient to create the doughnut chart  */
.test {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  --fill: calc(var(--progress) * 1%);
  background: conic-gradient(CornflowerBlue var(--fill), lightgrey 0);
  transition: all 1s ease-in-out;
  animation: fill-progress 1s ease-in-out forwards;
}
@keyframes fill-progress {
  to {
    --fill: calc(var(--progress) * 1%);
  }
}
</style>
