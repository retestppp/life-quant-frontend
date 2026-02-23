<template>
  <div class="wrap">
    <div class="title">요약 테이블</div>
    <div class="desc">선택된 지수: <b>{{ active }}</b></div>

    <el-table :data="rows" style="width:100%; margin-top: 10px" max-height="360">
      <el-table-column prop="name" label="항목" width="200" />
      <el-table-column prop="value" label="값" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "IndexTable",
  props: {
    active: { type: String, default: "KOSPI" },
  },
  computed: {
    rows() {
      return [
        { name: "지수", value: this.active },
        { name: "설명", value: "여기에 최근가/변동률/기간별 수익률 등을 붙일 예정" },
      ];
    },
  },
};
</script>

<style scoped>
.wrap { display: grid; gap: 6px; }
.title { font-weight: 900; }
.desc { color: #374151; }
</style>