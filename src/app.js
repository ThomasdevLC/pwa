import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./routerApp";

import "./assets/app.css";
import "./assets/styles/index.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
