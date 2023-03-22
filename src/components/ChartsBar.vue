<template>
  <div class="bar">
    <p class="bar__title">{{ name }}</p>
    <div class="bar__container">
      <div class="bar__container__rate">
        <div
          class="bar__container__level"
          :style="{
            transform: `scale(calc(${scale}), 1)`,
            backgroundColor: `var(--secondary)`,
          }"
        ></div>
      </div>
    </div>
    <p class="bar__score">{{ score }}</p>
  </div>
</template>

<script>
export default {
  props: ["name", "score", "scale"],
};
</script>

<style scoped lang="scss">
.bar {
  &__title {
    font-weight: 400;
    margin-bottom: 0;
  }
  &__score {
    margin-left: auto;
    font-weight: 400;
    margin-bottom: 0;
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
      transform: scale(0, 1);
    }
  }
}
</style>
