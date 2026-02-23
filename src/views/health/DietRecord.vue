<template>
  <div class="page">
    <div class="header">
      <div>
        <h2>식단 기록</h2>
        <p class="sub">섭취 기록을 저장하고, AI 분석으로 개선 포인트를 확인하세요.</p>
      </div>

      <div class="actions">
        <el-button type="primary" @click="openCreate">등록</el-button>
        <el-button type="success" @click="analyze">분석</el-button>
        <el-button @click="openChart">월 섭취량</el-button>
      </div>
    </div>

    <div class="grid">
      <!-- 왼쪽: 리스트/검색 -->
      <section class="panel">
        <DietList
          ref="dietList"
          @select="onSelect"
          @update:selected="selected = $event"
        />
      </section>

      <!-- 오른쪽: 분석 -->
      <section class="panel">
        <AiCoachPanel
          title="식단 분석 결과"
          :loading="analysLoading"
          :visible="!analysVisible"
          :user-name="userName"
          :text="analysisResult"
          @close="analysVisible = true"
        />
      </section>
    </div>

    <!-- 등록 모달 -->
    <DietForm
      v-model="dialogFormVisible"
      @saved="onSaved"
    />

    <!-- 차트 모달 -->
    <el-dialog v-model="dialogChartVisible" title="칼로리 차트" width="1000">
      <MixedChart
        :key="chartKey"
        :chart-data="caloriePerDayData"
        :options="chartOptions"
        :line-value="recommendedCalorie"
        :line-label="'적정 칼로리 선: ' + recommendedCalorie"
      />
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import DietList from "@/components/health/DietList.vue";
import DietForm from "@/components/health/DietForm.vue";
import AiCoachPanel from "@/components/health/AiCoachPanel.vue";
import MixedChart from "@/components/chart/MixedChart.vue";

const moment = require("moment");

export default {
  name: "DietRecord",
  components: { DietList, DietForm, AiCoachPanel, MixedChart },
  data() {
    return {
      // user
      userName: "",
      recommendedCalorie: 0,

      // 분석
      analysVisible: true,
      analysLoading: false,
      analysisResult: "",

      // 등록 모달
      dialogFormVisible: false,

      // 차트
      momentMonth: moment().month() + 1,
      dialogChartVisible: false,
      chartKey: 0,
      caloriePerDayData: {
        datasets: [{ type: "bar", label: "Calories", data: [] }],
        labels: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: { beginAtZero: true, min: 0, max: 4000, title: { display: true, text: "Calories[kcal]" } },
          x: { title: { display: true, text: "Date" } },
        },
      },

      // 선택된 row(수정/삭제에 사용 가능)
      selected: null,
    };
  },
  mounted() {
    this.getPersonRecords();
  },
  methods: {
    openCreate() {
      this.dialogFormVisible = true;
    },
    onSaved() {
      // 등록 후 리스트 갱신
      this.$refs.dietList?.reload?.();
    },
    onSelect(row) {
      this.selected = row;
    },

    async analyze() {
      this.analysVisible = false;
      this.analysLoading = true;

      try {
        // 리스트 컴포넌트에 있는 데이터 가져오기(없으면 API로 다시 받아도 됨)
        const rows = this.$refs.dietList?.getRows?.() || [];
        let prompt = "";
        for (let r of rows) {
          prompt += `${r.dietDate}에 ${r.dietName}을(를) ${r.dietAmount}g 만큼 섭취. 칼로리 ${r.dietCal}kcal.\n`;
        }
        prompt += "이 식단 기록을 분석해 주세요. 친구처럼 친근하게 부탁해요.";

        const res = await axios.get("/api/bot/chat/analysisDiet", { params: { prompt } });
        this.analysisResult = res.data;
      } catch (e) {
        console.error(e);
        this.analysisResult = "분석 중 오류가 발생했어요.";
      } finally {
        this.analysLoading = false;
      }
    },

    async getPersonRecords() {
      try {
        const res = await axios.get("/api/personInfo/getPersonInfos");
        this.userName = res.data?.[0]?.name || "사용자";
        this.recommendedCalorie = res.data?.[0]?.adjustCal || 0;
      } catch (e) {
        console.error(e);
      }
    },

    async openChart() {
      this.chartKey += 1;
      this.dialogChartVisible = true;
      await this.getCaloriePerDate();
    },

    async getCaloriePerDate() {
      try {
        const res = await axios.get("/api/diet/getDietDateCal");
        this.caloriePerDayData.datasets[0].data = res.data.map((x) => x.dietCal);
        this.caloriePerDayData.labels = res.data.map((x) => x.dietDate);
      } catch (e) {
        console.error(e);
      }
    },
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

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.grid {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 16px;
}

.panel {
  background: #fff;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  min-height: 520px;
}

@media (max-width: 980px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
