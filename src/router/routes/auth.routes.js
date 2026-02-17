export default [
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("@/views/auth/LoginPage.vue"),
    meta: { layout: "EmptyLayout", title: "Login" },
  },
];
