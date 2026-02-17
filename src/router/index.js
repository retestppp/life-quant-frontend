import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes"; // ./routes/index.js 를 의미

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/dashboard" },
    ...routes,
    { path: "/:pathMatch(.*)*", redirect: "/dashboard" }, // Vue3 404
  ],
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;


// // 수정전 20260218[S]
// // src/router/index.js
// import { createRouter, createWebHistory } from 'vue-router';
// // import LoginPage from '@/views/common/LoginPage.vue';
// import index from '@/views/MainPage.vue';
// import exercise from '@/views/exercise/ExerciseRecord.vue';
// import diet from '@/views/diet/DietRecord.vue';
// import personInfo from '@/views/personInfo/PersonInfo.vue';
// // import index from '../../public/index.html';

// const routes = [
//     {
//         path: '/login',
//         name: 'emptyLayout',
//         component: () => import('@/components/layout/EmptyLayout.vue'),
//         children: [
//             {
//                 path: '',
//                 name: 'login',
//                 component: ()=> import('@/views/auth/LoginPage.vue'),
//             },
//             {
//                 path: '/chartview',
//                 name: 'chartview',
//                 component: ()=> import('@/views/ChartView.vue'),
//             },
//         ],
//     },

//     {
//         path: '/',
//         name: 'defaultLayout',
//         component: () => import('@/components/layout/DefaultLayout.vue'),
//         children: [
//             {
//                 path: '', // 경로
//                 name: "main", // 이름
//                 component: ()=> import('@/views/MainPage.vue'),
//             },
//             {
//                 path: "/hello", // 경로
//                 name: "index", // 이름
//                 component: index// 로드 파일
//             },
//             {
//                 path: '/exercise',
//                 name: 'exercise',
//                 component: exercise
//             },
//             {
//                 path: '/diet',
//                 name: 'diet',
//                 component: diet
//             },
//             {
//                 path: '/personInfo',
//                 name: 'personInfo',
//                 component: personInfo
//             },
//         ],
//     },

// ];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

// export default router;
// // 수정전 20260218[E]


// // src/main.js
// import { createApp } from 'vue';
// import App from '../App.vue';
// import appRouter from '../router'; // 여기서 router가 초기화되기 전에 사용됨

// const app = createApp(App);
// app.use(appRouter);
// app.mount('#app');
// // app.mount('#app');
