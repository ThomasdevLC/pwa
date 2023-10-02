<template>
  <div class="semi-donut margin" :style="`--percentage: ${result}; --fill: var(--secondary)`">
    <span>{{ title }}</span> <br /><span class="objectives">{{ obj }}</span>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["title", "total", "obj"],
  setup(props) {
    const result = computed(() => {
      const calcResult = (props.total / props.obj) * 100;
      return Math.min(calcResult, 100);
    });

    return {
      result,
    };
  },
};
</script>

<style lang="scss">
@use "../assets/styles/animations" as animations;

.semi-donut {
  --percentage: 0;
  width: 210px;
  height: 105px;
  position: relative;
  font-size: 22px;
  font-weight: 500;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-sizing: border-box;
  margin: auto;
  margin-bottom: 40px;
  &:after {
    content: "";
    width: 210px;
    height: 210px;
    border: 15px solid;
    border-color: var(--gray) var(--gray) var(--fill) var(--fill);
    position: absolute;
    border-radius: 50%;
    left: 0;
    top: 0;
    box-sizing: border-box;
    transform: rotate(calc(1deg * (-45 + var(--percentage) * 1.8)));
    animation: fillAnimation 1s ease-in;
  }

  @include animations.fillAnimation;
  @include animations.fillGraphAnimation;
}

.objectives {
  font-size: 20px;
  font-weight: 300;
  padding-left: 10px;
}
</style>
