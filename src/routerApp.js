import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./pages/AppHome.vue";
import Login from "./pages/Login.vue";
import AppHome2 from "./pages/AppHome2.vue";
import AppStat from "./pages/AppStat.vue";
import AppPres from "./pages/AppPres.vue";

const routerApp = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
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
    {
      path: "/stat",
      name: "stat",
      component: AppStat,
    },
    {
      path: "/pres",
      name: "pres",
      component: AppPres,
    },
  ],
});

export default routerApp;
