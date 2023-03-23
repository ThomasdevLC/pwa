<template>
  <div class="top">
    <img class="top__logo" :src="image" />

    <div class="top__buttons">
      <div class="top__buttons__reload">
        <i class="fa-solid fa-rotate-right"></i>
      </div>
      <div class="top__buttons__connect">
        <i class="fa-solid fa-power-off"></i>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../assets/photos/logo.png";
export default {
  data() {
    return { image: logo };
  },
};
</script>

<style lang="scss">
.top {
  display: flex;
  margin-bottom: 20px;

  &__logo {
    width: 30%;
  }
  &__buttons {
    display: flex;
    margin-left: auto;

    &__reload {
      width: 35px;
      height: 35px;
      color: white;
      background: var(--purple);
      border-radius: 6px;
      display: grid;
      place-items: center;
    }

    &__connect {
      width: 35px;
      height: 35px;
      color: var(--purple);
      background: var(--gray-second);
      border-radius: 6px;
      display: grid;
      place-items: center;
      margin-left: 20px;
    }
  }
}
</style>
