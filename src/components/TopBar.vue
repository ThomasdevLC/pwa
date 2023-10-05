<template>
  <div class="top">
    <img class="top__logo" :src="image" />

    <div class="top__buttons">
      <div class="top__buttons__reload" @click="reload">
        <i class="fa-solid fa-rotate-right"></i>
      </div>
      <div class="top__buttons__connect" @click="redirectToLogin">
        <i class="fa-solid fa-power-off"></i>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../assets/photos/logo.png";

export default {
  data() {
    return {
      image: logo,
    };
  },

  methods: {
    reload() {
      this.$emit("custom-reload");
    },
    redirectToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.top {
  display: flex;
  margin-bottom: 20px;

  &__logo {
    height: 35px;
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
      cursor: pointer;
      &:hover {
        background-color: var(--purple-second);
      }
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
      cursor: pointer;
    }
  }
}
</style>
