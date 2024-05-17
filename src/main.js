import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'  // <-- 설치한 라우터를 가져와서
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8081";
createApp(App).use(router).mount('#app').provide('$axios', axios);  // <-- 사용할 것이라고 선언. use(router) 추가
// createApp(App).mount('#app')


// Path: src/router/index.js

// __VUE_PROD_HYDRATION_MISMATCH_DETAILS__