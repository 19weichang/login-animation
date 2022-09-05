import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueCookies from 'vue-cookies'
// import store from './store';

createApp(App).use(createPinia()).use(Antd).use(VueCookies).use(router).mount('#app')
