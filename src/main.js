import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./main.css";

import { initFile } from "./utils/file";

initFile();

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");
