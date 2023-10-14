// import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import router from './router';

import axios from './services/api';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

const i18n = createI18n({
  legacy: false,
  locale: 'id-ID',
  fallbackLocale: 'en',
  numberFormats: {
    'id-ID': {
      currency: {
        style: 'currency',
        currency: 'IDR',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    },
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
      },
    },
  },
});

app.use(createPinia());
app.use(router);
app.use(i18n);

app.config.globalProperties.$axios = axios;

app.mount('#app');
