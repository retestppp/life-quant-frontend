<template>
  <section class="card">
    <h3>빠른 추가</h3>

    <div class="btns">
      <button class="btn" @click="go('/health/exercise')">운동 기록</button>
      <button class="btn" @click="go('/health/diet')">식단 기록</button>
      <button class="btn" @click="go('/reading/review')">독서 후기</button>
      <button class="btn" @click="go('/investment/index')">투자 지수</button>
      <button class="btn" @click="go('/self/insight')">인사이트</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "QuickAddButtons",
  methods: {
    go(path) {
      this.$router.push(path);
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
.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}
.btn {
  border: 0;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  background: #002060;
  color: #fff;
}
.btn:hover { opacity: 0.9; }
</style>
