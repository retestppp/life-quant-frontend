export default [
  {
    path: "/reading/review",
    name: "BookReview",
    component: () => import("@/views/reading/BookReview.vue"),
    meta: { layout: "DefaultLayout", title: "Reading" },
  },
];
