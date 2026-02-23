<!-- // 메인(요약 + 바로가기) -->
 <!-- <template>
  <div class="page">
    <h2>대시보드</h2>
    <p>오늘 요약(운동/식단/투자/독서/인사이트)을 보여줄 페이지</p>
  </div>
</template>

<script>
export default { name: "DashboardHome" };
</script>

<style scoped>
.page { padding: 20px; }
</style> -->


<template>
  <div class="page">
    <h2 class="page-title">대시보드</h2>

    <!-- 1. 오늘 요약 -->
    <TodaySummaryCard />

    <!-- 2. 빠른 추가 버튼 -->
    <QuickAddButtons />

    <!-- 3. 좋은 말 한 줄 -->
    <GoodQuoteCard />

    <!-- 4. 나쁜 점 피드백 -->
    <BadFeedbackCard />

    <!-- 5. AI 코치 요약 -->
    <AiCoachPanel />
  </div>
</template>

<script>
import TodaySummaryCard from "@/components/dashboard/TodaySummaryCard.vue";
import QuickAddButtons from "@/components/dashboard/QuickAddButtons.vue";
import GoodQuoteCard from "@/components/self/GoodQuoteCard.vue";
import BadFeedbackCard from "@/components/self/BadFeedbackCard.vue";
import AiCoachPanel from "@/components/health/AiCoachPanel.vue";

export default {
  name: "DashboardHome",
  components: {
    TodaySummaryCard,
    QuickAddButtons,
    GoodQuoteCard,
    BadFeedbackCard,
    AiCoachPanel,
  },
};
</script>

<style scoped>
.page {
  padding: 24px;
  max-width: 1100px;
  margin: 0 auto;
}

.page-title {
  margin-bottom: 24px;
}
</style>
