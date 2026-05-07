<template>
  <div class="wrap">
    <div class="title">차트</div>
    <div class="desc">선택된 지수: <b>{{ active }}</b></div>

    <div class="box">
      <iframe
        :key="iframeKey"
        class="tv-iframe"
        :src="tvSrc"
        frameborder="0"
        allowfullscreen
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexChart",
  props: {
    active: { type: String, default: "KOSPI" },
  },
  data() {
    return {
      iframeKey: 0,
      symbolMap: {
        // 🇰🇷 코스피 대체 (미국 상장 한국 ETF)
        KOSPI: "AMEX:EWY",   // iShares MSCI South Korea ETF
        NASDAQ: "NASDAQ:QQQ",
        GOLD: "OANDA:XAUUSD",
        SP500: "AMEX:SPY",
        BTC: "COINBASE:BTCUSD",
      },
    };
  },
  computed: {
    tvSrc() {
      const symbol = this.symbolMap[this.active] || "KRX:KOSPI";

      // ⚠️ 파라미터를 최소로(안정)
      const params = new URLSearchParams({
        symbol,
        interval: "60",
        theme: "dark",
        timezone: "Asia/Seoul",
        locale: "kr",
        hide_side_toolbar: "0",
        allow_symbol_change: "0",
      });

      return `https://s.tradingview.com/widgetembed/?${params.toString()}`;
    },
  },
  watch: {
    active() {
      this.iframeKey += 1; // 선택 바뀔 때 강제 리로드
    },
  },
};
</script>

<style scoped>
.wrap { display: grid; gap: 8px; }
.title { font-weight: 900; }
.desc { color: #374151; }

.box {
  height: 520px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #1f2937;
  background: #0b1220;
}

.tv-iframe {
  width: 100%;
  height: 100%;
}
</style>