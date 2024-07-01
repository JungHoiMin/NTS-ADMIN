import 'bootstrap-icons/font/bootstrap-icons.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import HmPlugin from './plugins/HmPlugin';

const pinia = createPinia();

const app = createApp(App);

app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.use(HmPlugin);

app.mount('#app');
