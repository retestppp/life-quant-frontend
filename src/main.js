import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'  // <-- 설치한 라우터를 가져와서
import axios from 'axios';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
axios.defaults.baseURL = "http://localhost:8081";
// 애플리케이션 인스턴스 생성
const app = createApp(App);

// 전역 플러그인 등록
app.use(router);

// Provide 사용
app.provide('axios', axios);

// ElementPlus 사용
app.use(ElementPlus);

// Mount 호출
app.mount('#app');
// createApp(App).use(router).mount('#app').provide('$axios', axios).mount('#app');  // <-- 사용할 것이라고 선언. use(router) 추가
// createApp(App).mount('#app')


// Path: src/router/index.js

// __VUE_PROD_HYDRATION_MISMATCH_DETAILS__