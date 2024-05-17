// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
// import LoginPage from '@/views/common/LoginPage.vue';
import loginPage from '@/views/common/LoginPage.vue';
import index from '@/components/index.vue';
import exercise from '@/views/exercise/ExerciseRecord.vue';
// import index from '../../public/index.html';

const routes = [
    {
        path: "/", // 경로
        name: "main", // 이름
        component: index// 로드 파일
    },
    {
        path: "/hello", // 경로
        name: "index", // 이름
        component: index// 로드 파일
    },
    {
        path: '/login',
        name: 'Login',
        component: loginPage
    },
    {
        path: '/exercise',
        name: 'exercise',
        component: exercise
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// // src/main.js
// import { createApp } from 'vue';
// import App from '../App.vue';
// import appRouter from '../router'; // 여기서 router가 초기화되기 전에 사용됨

// const app = createApp(App);
// app.use(appRouter);
// app.mount('#app');
// // app.mount('#app');
