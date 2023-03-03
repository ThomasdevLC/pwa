<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <!-- LIST DES ITEMS -->
            <li class="nav-item" v-for="route in routes" :key="route.title">
              <a class="nav-link" @click="goto(route)">{{ route.title }}</a>
            </li>
            <!-- LIST DES ITEMS -->
          </ul>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<script>
export default {
  computed: {
    routes() {
      return [
        {
          title: "Home",
          name: "home",
          path: "/",
          icon: "",
          visible: true,
        },
        {
          title: "Stat",
          name: "stat",
          path: "/stat",
          icon: "",
          visible: true,
        },
        {
          title: "Tx pres",
          name: "pres",
          path: "/pres",
          icon: "",
          visible: true,
        },
      ];
    },
  },
  data() {
    return {
      selectedItem: "home",
    };
  },
  methods: {
    goto(route) {
      console.log("ROUTE", route);
      this.$router.push(route.path);
      /** todo : ajouter la class nav et active */
    },
  },
};
</script>

<style scoped></style>
