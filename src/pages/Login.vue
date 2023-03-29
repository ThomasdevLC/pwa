<template>
  <div class="login">
    <div class="login__container">
      <form class="login__container__form">
        <img :src="image" />

        <div class="login__container__form__input">
          <i class="material-icons">mail_outline</i>
          <input
            id="email"
            type="email"
            placeholder="email"
            name="email"
            required
          />
        </div>

        <div class="login__container__form__input">
          <i class="material-icons">lock_outline</i>
          <input
            id="password"
            type="password"
            placeholder="mot de passe"
            name="password"
            required
          />
        </div>

        <button
          class="btn btn--form"
          type="submit"
          value="Log in"
          @click="getUser"
        >
          connexion
        </button>
      </form>
      <div class="idvalid" style="color: white">
        <div class="mt-3">
          <input v-model="userId" />
          <p v-if="error">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../assets/photos/logo.png";
import { useStore } from "../store";
import fetchData from "../modules/api3";

export default {
  data() {
    return {
      store: useStore(),
      userId: 1283,
      error: null,
      image: logo,
    };
  },
  methods: {
    submit() {
      console.log("SUBMIT");
      console.log(this.store.user);
    },
    getUser() {
      let data = [this.userId];
      console.log("userId", data);
      fetchData("user", data)
        .then((res) => {
          console.log("USER", res);
          this.store.user = res;
          this.$router.push("/2");
        })
        .catch((err) => {
          console.log("err home", err);
          this.error = err.message;
        });
    },
  },
};
</script>

<style scoped>
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
}

.login__container {
  width: 400px;
  padding: 36px 48px 48px 48px;
  background-color: var(--gray-second);
  border-radius: 8px;
}

img {
  height: 60px;
  margin: auto;
}

.login__container__form {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;
}

.login__container__form__input {
  display: flex;
}

.login__container__form__input input {
  padding: 10px;
  border-radius: 0 6px 6px 0;
  border: none;
  outline: none;
}
.login__container__form__input i {
  color: var(--gray);
  background: white;
  width: 40px;
  padding: 10px;
  border-radius: 6px 0 0 6px;
  display: grid;
  place-items: center;
}

.btn--form {
  background-color: var(--purple);
  color: #fdf2e9;
  align-self: end;
  padding: 8px;
}

.btn,
.btn:link,
.btn:visited {
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

/*  */

.btn--form:hover {
  background-color: #fff;
  color: var(--purple);
}
</style>
