<template>
  <section class="card">
    <div class="head">
      <h3>AI 코치 요약</h3>
      <button class="btn" @click="refresh">새로고침</button>
    </div>

    <p class="desc">
      운동/식단 기록을 기반으로 오늘의 개선 방향을 한 줄로 제안합니다.
    </p>

    <div class="bubble">
      {{ coachMessage }}
    </div>
  </section>
</template>

<script>
export default {
  name: "AiCoachPanel",
  data() {
    return {
      coachMessage: "오늘은 단백질을 조금 더 챙기고, 유산소 10분만 추가해보세요.",
      messages: [
        "오늘은 단백질을 조금 더 챙기고, 유산소 10분만 추가해보세요.",
        "식단이 안정적입니다. 수분 섭취만 조금 더 늘려보세요.",
        "운동 강도는 좋습니다. 스트레칭 시간을 5분 추가하면 더 좋아요.",
        "오늘은 컨디션 회복이 우선! 걷기 20분으로 가볍게 마무리해요.",
      ],
    };
  },
  methods: {
    refresh() {
      const idx = Math.floor(Math.random() * this.messages.length);
      this.coachMessage = this.messages[idx];
    },
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
  align-items: center;
}
.btn {
  border: 0;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  background: #002060;
  color: #fff;
}
.desc {
  margin: 10px 0 12px;
  color: #666;
  font-size: 13px;
}
.bubble {
  background: #f6f7fb;
  border-radius: 12px;
  padding: 14px;
  font-weight: 700;
}
</style>
