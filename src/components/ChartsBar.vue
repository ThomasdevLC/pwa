<template>
  <div class="bar">
    <p class="bar__title">{{ name }}</p>
    <div class="bar__container">
      <div class="bar__container__rate">
        <div
          class="bar__container__level"
          :style="{
            width: `${score}%`,
            backgroundColor: score < obj ? 'var(--obj)' : 'var(--secondary)',
          }"
        ></div>
      </div>
    </div>
    <p class="bar__score">{{ score }} %</p>
  </div>
</template>

<script>
export default {
  props: ["name", "score", "scale", "obj"],
};
</script>

<style scoped lang="scss">
.bar {
  box-sizing: border-box;

  margin: 15px 0;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  gap: 6px;
  position: relative;
  z-index: 0;

  &__title {
    font-weight: 400;
    line-height: 1;
  }
  &__score {
    margin-left: auto;
    font-weight: 400;
    line-height: 1;
  }

  &__container {
    &__rate {
      background: var(--gray);
      border-radius: 0 6px 6px 0px;
    }

    &__level {
      height: 20px;
      border-radius: 0 6px 6px 0px;
      transform-origin: left;
      transition: all 0.5s ease-in-out;
      transform: width(0, 1);
    }
  }
}
</style>
