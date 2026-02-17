export default [
  {
    path: "/profile",
    name: "PersonInfo",
    component: () => import("@/views/profile/PersonInfo.vue"),
    meta: { layout: "DefaultLayout", title: "Profile" },
  },
];
