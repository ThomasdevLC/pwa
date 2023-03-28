<template>
  <div class="container" style="color: white">

    <div class="mt-5">

      <input v-model="userId">

      <p v-if="error">{{error}}</p>

      <button @click="getUser">Valider</button>

      <pre>{{store.user}}</pre>
    </div>

  </div>
</template>

<script>
import {useStore} from '../store'
import fetchData from "../modules/api3";

export default {
  data() {
    return {
      store: useStore(),
      userId: 1283,
      error: null
    }
  },
  methods: {
    submit() {
      console.log('SUBMIT')
      console.log(this.store.user)
    },
    getUser() {
      let data = [this.userId];
      console.log("userId", data);
      fetchData("user", data)
          .then((res) => {
            console.log("USER", res);
            this.store.user = res
            this.$router.push('/2')
          })
          .catch((err) => {
            console.log("err home", err);
            this.error = err.message;
          });
    },
  }

}
</script>

<style scoped>

</style>