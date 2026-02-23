<template>
  <div class="ticker">
    <button
      v-for="item in items"
      :key="item.key"
      class="chip"
      :class="{ active: item.key === active }"
      @click="$emit('change', item.key)"
    >
      <div class="name">{{ item.label }}</div>
      <div class="sub">{{ item.sub }}</div>
    </button>
  </div>
</template>

<script>
export default {
  name: "IndexTickerBar",
  props: {
    active: { type: String, default: "KOSPI" },
  },
  data() {
    return {
      items: [
        { key: "KOSPI", label: "코스피", sub: "KRX" },
        { key: "NASDAQ", label: "나스닥", sub: "IXIC" },
        { key: "GOLD", label: "금", sub: "XAU" },
        { key: "SP500", label: "S&P500", sub: "SPX" },
        { key: "BTC", label: "비트코인", sub: "BTCUSD" },
      ],
    };
  },
};
</script>

<style scoped>
.ticker {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.chip {
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  min-width: 120px;
  text-align: left;
}
.chip.active {
  border-color: #111827;
}
.name {
  font-weight: 800;
  font-size: 14px;
}
.sub {
  margin-top: 2px;
  color: #6b7280;
  font-size: 12px;
}
</style>