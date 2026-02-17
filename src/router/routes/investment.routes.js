export default [
  {
    path: "/investment/index",
    name: "MarketIndex",
    component: () => import("@/views/investment/MarketIndex.vue"),
    meta: { layout: "DefaultLayout", title: "Market Index" },
  },
  {
    path: "/investment/analysis",
    name: "MarketAnalysis",
    component: () => import("@/views/investment/MarketAnalysis.vue"),
    meta: { layout: "DefaultLayout", title: "Market Analysis" },
  },
];
