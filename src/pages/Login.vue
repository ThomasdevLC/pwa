<template>
  <div class="login">
    <div class="login__container">
      <div class="login__container__form">
        <img :src="image" />
        <div class="login__container__form__input">
          <i class="material-icons">mail_outline</i>

          <input id="email" type="email" placeholder="email" name="email" v-model="email" required />
        </div>

        <div class="login__container__form__input">
          <i class="material-icons">lock_outline</i>
          <input id="password" type="password" placeholder="mot de passe" name="password" v-model="password" required />
        </div>
        <button class="login__container__form__btn" value="Log in" @click="auth">connexion</button>
        <div class="idvalid" style="color: white">
          <div class="mt-3">
            <p v-if="error">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import image from "../assets/photos/logo.png";
import { useStore } from "../store";
import { fetchData } from "../api";
import { useRoute, useRouter } from "vue-router";

const $router = useRouter();
const $route = useRoute();
const store = useStore();

const email = ref("");
const password = ref();
const error = ref();

onMounted(() => {
  if ($route.params.email) {
    email.value = `${$route.params.email.replace("_", ".")}@groupegca.com`;
    password.value = Math.floor(Math.random() * 90000) + 10000;
  }
});

const auth = async () => {
  store.user = await fetchData("auth", [email.value]);
  await store.initApp();

  if (store.user.role === "Vendor") $router.push("/vendors");
  else $router.push("/stores");
};
</script>

<style scoped lang="scss">
.idvalid input {
  color: black;
  background: var(--gray-second);
  outline: none;
  border: none;
}

.login {
  height: 100vh;
  display: grid;
  place-items: center;

  &__container {
    min-width: 350px;
    padding: 30px 20px 30px 20px;
    background-color: var(--gray-second);
    border-radius: 8px;

    &__form {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 16px;

      img {
        height: 50px;
        margin: auto;
      }

      &__input {
        display: flex;
        height: 40px;
      }

      &__input input {
        padding: 10px;
        border-radius: 0 6px 6px 0;
        border: none;
        outline: none;
        margin: 0;
      }

      &__input i {
        color: var(--gray);
        background: white;
        width: 40px;
        padding: 10px;
        border-radius: 6px 0 0 6px;
        display: flex;
        place-items: center;
      }

      &__btn {
        font-family: var(--font-family) !important;
        font-weight: 400 !important;
        padding: 8px;
        font-size: 20px;
        font-weight: 600;
        border-radius: 6px;
        border: none;
        background-color: var(--purple);
        color: #fff;
        text-decoration: none;
        transition: all 0.2s;
        cursor: pointer;
      }
    }
  }
}
</style>
