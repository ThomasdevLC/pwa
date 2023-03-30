<template>
  <div class="total">
    <h3 class="total__title">
      VENTES TOTALES <br />
      <span style="font-weight: 700">{{ total }}</span>
    </h3>
    <!-- <div class="total__radial">
      <progress
        class="total__radial__score"
        :value="percentage"
        max="100"
        :style="{ '--progress': percentage }"
      ></progress>
    </div> -->
  </div>

  <!-- circle 2 -->

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
.total {
  &__title {
    margin: 20px auto;
    text-align: center;
    font-weight: 300;
  }
  &__radial {
    display: grid;
    place-items: center;

    &__score {
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

    /* text score*/
    &__score:after {
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
    &__score {
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
  }
}

////// circle 2 ///////////////////////////////////

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
