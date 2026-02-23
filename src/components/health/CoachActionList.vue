<template>
  <div>
    <div class="title">오늘 추천 행동</div>

    <el-skeleton v-if="loading" rows="4" animated />

    <div v-else class="list">
      <div v-for="(a, idx) in actions" :key="idx" class="item">
        <el-checkbox v-model="done[idx]" />
        <div class="text">
          <div class="t">{{ a.title }}</div>
          <div class="r">{{ a.reason }}</div>
        </div>
        <el-tag size="small" :type="tagType(a.difficulty)">{{ a.difficulty }}</el-tag>
      </div>

      <div v-if="!actions || actions.length === 0" class="empty">
        추천 행동이 없어요. 운동/식단 기록을 먼저 쌓아보세요.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoachActionList",
  props: {
    loading: { type: Boolean, default: false },
    actions: { type: Array, default: () => [] },
  },
  data() {
    return { done: {} };
  },
  methods: {
    tagType(d) {
      if (d === "easy") return "success";
      if (d === "mid") return "warning";
      return "danger";
    },
  },
};
</script>

<style scoped>
.title{ font-weight:900; margin-bottom:10px; }
.list{ display:flex; flex-direction:column; gap:10px; }
.item{
  display:flex; align-items:flex-start; gap:10px;
  padding:12px; border-radius:12px;
  background:#f8f8f8;
}
.text{ flex:1; }
.t{ font-weight:900; }
.r{ font-size:12px; color:#666; margin-top:4px; line-height:1.35; }
.empty{ color:#999; padding:12px; }
</style>