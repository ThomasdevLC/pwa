import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import AppVendor from "./pages/AppVendor.vue";
import AppStores from "./pages/AppStores.vue";

const routerApp = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppVendor,
    },
    {
      path: "/vendors",
      name: "home",
      component: AppVendor,
    },
    {
      path: "/stores",
      name: "AppStores",
      component: AppStores,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/login/:email",
      name: "login_auth",
      component: Login,
    },
  ],
});

export default routerApp;
