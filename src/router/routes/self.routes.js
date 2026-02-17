export default [
  {
    path: "/self/insight",
    name: "PersonalInsight",
    component: () => import("@/views/self/PersonalInsight.vue"),
    meta: { layout: "DefaultLayout", title: "Insight" },
  },
];
