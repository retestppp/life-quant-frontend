<template>
  <div class="page">
    <div class="header">
      <div>
        <h2>투자 지수</h2>
        <p class="sub">코스피 / 나스닥 / 금 / S&P500 / 비트코인</p>
      </div>
    </div>

    <!-- 1) 상단 티커바 -->
    <section class="panel">
      <IndexTickerBar
        :active="active"
        @change="active = $event"
      />
    </section>

    <!-- 2) 차트 -->
    <section class="panel" style="margin-top: 16px;">
      <IndexChart :active="active" />
    </section>

    <!-- 3) 테이블 -->
    <section class="panel" style="margin-top: 16px;">
      <IndexTable :active="active" />
    </section>
  </div>
</template>

<script>
import IndexTickerBar from "@/components/investment/IndexTickerBar.vue";
import IndexChart from "@/components/investment/IndexChart.vue";
import IndexTable from "@/components/investment/IndexTable.vue";

export default {
  name: "MarketIndex",
  components: { IndexTickerBar, IndexChart, IndexTable },
  data() {
    return {
      active: "KOSPI", // 기본 선택
    };
  },
};
</script>

<style scoped>
.page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 18px;
}
.sub {
  margin: 6px 0 0;
  color: #666;
  font-size: 13px;
}
.panel {
  background: #fff;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
</style>