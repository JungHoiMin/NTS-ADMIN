import 'bootstrap-icons/font/bootstrap-icons.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'element-plus/theme-chalk/dark/css-vars.css';
import App from './App.vue';
import router from './router';
import HmPlus from '@/plugins/HmPlus';
import '@/plugins/HmPlus/css/hm.plus.scss';

const pinia = createPinia();

const app = createApp(App);

app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.use(HmPlus);

app.mount('#app');
