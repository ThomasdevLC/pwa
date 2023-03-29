<template>
  <div class="user">
    <img class="user__image" :src="image" />
    <div class="user__infos">
      <p class="user__infos__name">Bonjour, {{ name }} <br /></p>
      <p class="user__infos__store">{{ store }}</p>
    </div>
  </div>
</template>

<script>
import Img1 from "../assets/photos/vendor.jpg";

export default {
  props: ["name", "store"],

  data() {
    return {
      image: Img1,
    };
  },
};
</script>

<style lang="scss">
.user {
  display: flex;
  margin-bottom: 30px;

  &__image {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--secondary);
    padding: 2px;
  }

  &__infos {
    padding: 5px 0 0 20px;

    &__name {
      font-size: 16px;
      margin: 0;
    }

    &__store {
      font-size: 12px;
      color: var(--gray);
    }
  }
}
</style>
