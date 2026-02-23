<template>
  <div>
    <div class="top">
      <div class="left">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
        <el-button type="primary" @click="search" style="margin-left:8px">검색</el-button>
        <el-button @click="$emit('reload')" style="margin-left:8px">전체</el-button>
      </div>
    </div>

    <el-table
      :data="rows"
      style="width: 100%; margin-top: 12px"
      @row-click="(row) => $emit('select', row)"
      max-height="450"
    >
      <el-table-column prop="exerciseDate" label="Date" width="130" />
      <el-table-column prop="exerciseName" label="Name" />
      <el-table-column prop="exerciseWeight" label="Weight(kg)" width="120" />
      <el-table-column prop="exerciseRepeatNumber" label="Repeats" width="110" />
      <el-table-column prop="exerciseSetNumber" label="Sets" width="90" />
      <el-table-column prop="exerciseRemark" label="Remark" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ExerciseList",
  props: {
    rows: { type: Array, default: () => [] },
  },
  data() {
    return {
      dateRange: [],
    };
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    },
    search() {
      if (!this.dateRange || this.dateRange.length !== 2) {
        this.$emit("reload");
        return;
      }
      const [start, end] = this.dateRange;
      this.$emit("search", {
        startDate: this.formatDate(start),
        endDate: this.formatDate(end),
      });
    },
  },
};
</script>

<style scoped>
.top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  flex-wrap:wrap;
}
.left{ display:flex; align-items:center; flex-wrap:wrap; gap:8px; }
</style>