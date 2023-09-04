// import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import axios from './services/api';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.config.globalProperties.$axios = axios;

app.mount('#app');
