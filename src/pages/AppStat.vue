<template>
  <progress class="test" value="80" max="100" style="--progress: 70"></progress>

  <div
    class="circle"
    :style="{ backgroundImage: 'conic-gradient(#b5838d 8%, #ffcdb2 0)' }"
  >
    <div class="inner">48%</div>
  </div>
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

/* test 2 ////////// */

body {
  font-family: "Lato";
  font-size: 16px;
}

/*** <--- CIRCLE STYLES ---> ***/
.wrap-circles {
  display: flex;
  min-height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background: #000;
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
  width: 115px;
  height: 115px;
  background: #000;
  border-radius: 50%;
  font-size: 1.85em;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.75);
}
</style>
