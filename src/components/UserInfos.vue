<template>
  <div class="user">
    <img class="user__image" :src="image" />
    <div class="user__infos">
      <p class="user__infos__name">Bonjour, {{ store.user.name }} <br /></p>
      <p class="user__infos__store">{{ store.user.storeToString }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import Img1 from "../assets/photos/vendor.jpg";
import Img3 from "../assets/photos/bd.jpg";
import Img2 from "../assets/photos/db.jpg";
import { useStore } from "../store";

export default {
  setup() {
    const store = useStore();
    const image = computed(() => getImageBasedOnName(store));

    const getImageBasedOnName = (store) => {
      if (store.user.name === "Benoit") {
        return Img2;
      } else if (store.user.name === "David") {
        return Img3;
      } else {
        return Img1;
      }
    };

    return {
      store,
      image,
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
      margin-bottom: 5px;
    }

    &__store {
      font-size: 12px;
      color: var(--gray);
    }
  }
}
</style>
