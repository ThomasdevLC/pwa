import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import AppVendor from "./pages/AppVendor.vue";
import AppStores from "./pages/AppStores.vue";
import AppHome2 from "./pages/AppHome2.vue";

const routerApp = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppVendor,
    },
    {
      path: "/appstores",
      name: "AppStores",
      component: AppStores,
    },

    {
      path: "/login/:email",
      name: "login_auth",
      component: Login,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/2",
      name: "home2",
      component: AppHome2,
    },
  ],
});

export default routerApp;
