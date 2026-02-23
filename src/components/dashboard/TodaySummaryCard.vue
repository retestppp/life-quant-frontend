<template>
  <section class="card">
    <div class="head">
      <h3>오늘 요약</h3>
      <span class="date">{{ today }}</span>
    </div>

    <div class="grid">
      <div class="item">
        <div class="label">운동</div>
        <div class="value">{{ summary.exercise }} 분</div>
      </div>
      <div class="item">
        <div class="label">식단</div>
        <div class="value">{{ summary.diet }}</div>
      </div>
      <div class="item">
        <div class="label">투자</div>
        <div class="value">{{ summary.invest }}</div>
      </div>
      <div class="item">
        <div class="label">독서</div>
        <div class="value">{{ summary.reading }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TodaySummaryCard",
  data() {
    return {
      today: new Date().toLocaleDateString(),
      summary: {
        exercise: 30,
        diet: "균형",
        invest: "관망",
        reading: "10p",
      },
    };
  },
};
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  margin-bottom: 16px;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}
.date { font-size: 12px; color: #666; }
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.item {
  background: #f6f7fb;
  border-radius: 12px;
  padding: 12px;
}
.label { font-size: 12px; color: #666; margin-bottom: 6px; }
.value { font-weight: 700; }
@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
