export default [
  {
    path: "/dashboard",
    name: "DashboardHome",
    component: () => import("@/views/dashboard/DashboardHome.vue"),
    meta: { layout: "DefaultLayout", title: "Dashboard" },
  },
];
