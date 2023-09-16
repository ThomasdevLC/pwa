<template>
  <div class="login">
    <div class="smartphone">
      <div class="camera"></div>
      <div class="screen"></div>
      <div class="button"></div>
    </div>

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

    <div class="login__container">
      <form class="login__container__form" @submit.prevent="auth">
        <img :src="image" />
        <div class="login__container__form__input">
          <i class="material-icons">mail_outline</i>
          <input id="email" type="email" placeholder="email" name="email" v-model="email" required />
        </div>

        <div class="login__container__form__input">
          <i class="material-icons">lock_outline</i>
          <input id="password" type="password" placeholder="mot de passe" name="password" v-model="password" required />
        </div>

        <button class="login__container__form__btn" type="submit">connexion</button>
      </form>
      <div class="idvalid" style="color: white">
        <div class="mt-3">
          <p v-if="error">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../assets/photos/logo.png";
import { useStore } from "../store";
import { fetchData } from "../api";

export default {
  mounted() {
    if (this.$route.params.email) {
      this.email = `${this.$route.params.email.replace("_", ".")}@groupegca.com`;
      this.password = Math.floor(Math.random() * 90000) + 10000;
    }
  },
  data() {
    return {
      store: useStore(),
      email: null,
      password: null,
      error: null,
      image: logo,
    };
  },
  methods: {
    async auth() {
      try {
        this.store.user = await fetchData("auth", [this.email]);
        this.$router.push("/");
      } catch (err) {
        this.error = err;
      }
    },
  },
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
        height: 36px;
      }

      &__input input {
        padding: 10px;
        border-radius: 0 6px 6px 0;
        border: none;
        outline: none;
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

  .smartphone {
    width: 300px;
    height: 500px;
    background: #000;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }

  .screen {
    width: 100%;
    height: 80%;
    background: #ffffff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .button {
    width: 40px;
    height: 5px;
    background: #333;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
  }

  .camera {
    width: 20px;
    height: 20px;
    background: #333;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
