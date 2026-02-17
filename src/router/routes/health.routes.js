export default [
  {
    path: "/health/exercise",
    name: "ExerciseRecord",
    component: () => import("@/views/health/ExerciseRecord.vue"),
    meta: { layout: "DefaultLayout", title: "Exercise" },
  },
  {
    path: "/health/diet",
    name: "DietRecord",
    component: () => import("@/views/health/DietRecord.vue"),
    meta: { layout: "DefaultLayout", title: "Diet" },
  },
  {
    path: "/health/ai",
    name: "HealthAiCoach",
    component: () => import("@/views/health/HealthAiCoach.vue"),
    meta: { layout: "DefaultLayout", title: "AI Coach" },
  },
];
