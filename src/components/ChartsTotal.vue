<template>
  <div class="total">
    <h3 class="total__title">Total : {{ total }}</h3>
    <div class="total__radial">
      <progress
        class="total__radial__score"
        :value="percentage"
        max="100"
        :style="{ '--progress': percentage }"
      ></progress>
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
    margin-bottom: 10px;
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
</style>
