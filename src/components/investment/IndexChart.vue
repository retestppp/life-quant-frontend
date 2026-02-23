<template>
  <div class="wrap">
    <div class="title">차트 영역</div>
    <div class="desc">선택된 지수: <b>{{ active }}</b></div>

    <!-- 나중에 여기 안에 TradingView iframe/embed 붙이면 됨 -->
    <div class="box">
      (여기에 코스피/나스닥/금/SP500/BTC 차트가 나오게 만들 예정)
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexChart",
  props: {
    active: { type: String, default: "KOSPI" },
  },
};
</script>

<style scoped>
.wrap { display: grid; gap: 8px; }
.title { font-weight: 900; }
.desc { color: #374151; }
.box {
  height: 420px;
  border: 1px dashed #d1d5db;
  border-radius: 12px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#6b7280;
}
</style>