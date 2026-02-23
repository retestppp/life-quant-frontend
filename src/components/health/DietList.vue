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
      </div>

      <div class="traffic">
        상태:
        <span class="circle" :class="trafficClass"></span>
        <span class="label">{{ trafficClass }}</span>
      </div>
    </div>

    <el-table
      :data="dietRecords"
      style="width: 100%; margin-top: 12px"
      @row-click="selectDietRecord"
      max-height="450"
    >
      <el-table-column prop="dietDate" label="Date" width="130" />
      <el-table-column prop="dietName" label="Food Name" />
      <el-table-column prop="dietMealType" label="Meal" width="90" />
      <el-table-column prop="dietAmount" label="g" width="80" />
      <el-table-column prop="dietCal" label="kcal" width="90" />
      <el-table-column prop="dietRemark" label="Remark" />
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DietList",
  data() {
    return {
      dateRange: [],
      dietRecords: [],
      trafficClass: "green",
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    getRows() {
      return this.dietRecords;
    },
    reload() {
      this.getDietRecords();
    },
    async getDietRecords() {
      try {
        const res = await axios.get("/api/diet/getDiets");
        this.dietRecords = res.data;
        // 필요하면 trafficLight도 여기서 갱신
      } catch (e) {
        console.error(e);
      }
    },
    formatDate(date) {
      const d = new Date(date);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    },
    async search() {
      if (!this.dateRange || this.dateRange.length !== 2) return this.reload();

      const [start, end] = this.dateRange;
      const startDate = this.formatDate(start);
      const endDate = this.formatDate(end);

      try {
        const res = await axios.get("/api/diet/getDietsWithDates", { params: { startDate, endDate } });
        this.dietRecords = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    selectDietRecord(row) {
      this.$emit("select", row);
      this.$emit("update:selected", row);
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
.traffic{ display:flex; align-items:center; gap:8px; color:#333; font-weight:700; }
.circle{
  width:14px; height:14px; border-radius:50%;
  display:inline-block;
}
.circle.green{ background: green; }
.circle.yellow{ background: gold; }
.circle.red{ background: red; }
.label{ font-size:12px; color:#666; }
</style>
