import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

import router from './router';
import api from './api/api';



import './api/mock';
const app = createApp(App)

app.config.globalProperties.$api = api.apis;

import main from './unit/index';
app.config.globalProperties.$main = main;


app.use(router).mount('#app');
