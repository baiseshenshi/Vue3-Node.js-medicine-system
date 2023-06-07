import { createApp } from 'vue';
import { createRouter } from 'vue-router';
import { createWebHashHistory } from 'vue-router';
import { createPinia } from 'pinia';
import axios from 'axios';
import * as echarts from 'echarts';


import App from './App.vue'
import routes from './router/router.js';

import './assets/style.css'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 把axios挂载到全局
app.config.globalProperties.$axios = axios
// 把echarts挂载到全局
app.config.globalProperties.$echarts = echarts

app.mount('#app')
