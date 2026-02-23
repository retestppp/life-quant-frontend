<template>
  <div class="summary-grid">
    <div class="card">
      <div class="label">운동 점수</div>
      <div class="value">{{ loading ? "..." : exerciseScore }}</div>
    </div>

    <div class="card">
      <div class="label">식단 점수</div>
      <div class="value">{{ loading ? "..." : dietScore }}</div>
    </div>

    <div class="card wide">
      <div class="label">오늘 코멘트</div>
      <div class="value2">{{ loading ? "..." : summary }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoachSummaryCards",
  props: {
    loading: { type: Boolean, default: false },
    exerciseScore: { type: Number, default: 0 },
    dietScore: { type: Number, default: 0 },
    summary: { type: String, default: "" },
  },
};
</script>

<style scoped>
.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 12px;
  margin-bottom: 16px;
}
.card {
  background: #fff;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}
.label {
  font-size: 12px;
  color: #666;
  font-weight: 700;
}
.value {
  font-size: 28px;
  font-weight: 900;
  margin-top: 6px;
}
.value2 {
  font-size: 14px;
  font-weight: 700;
  margin-top: 8px;
  color: #222;
  line-height: 1.4;
}
@media (max-width: 980px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>