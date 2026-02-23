<template>
  <div class="page">
    <div class="header">
      <div>
        <h2>운동 기록</h2>
        <p class="sub">운동 기록을 저장하고, AI 분석으로 개선 포인트를 확인하세요.</p>
      </div>

      <div class="actions">
        <el-button type="primary" @click="openCreate">등록</el-button>
        <el-button type="success" @click="analyze">분석</el-button>
      </div>
    </div>

    <div class="grid">
      <!-- 왼쪽: 리스트/검색 -->
      <section class="panel">
        <ExerciseList
          ref="exerciseList"
          :rows="exerciseRecords"
          @search="getExerciseRecordsWithCondition"
          @reload="getExerciseRecords"
          @select="onSelect"
        />
      </section>

      <!-- 오른쪽: 분석 -->
      <section class="panel">
        <AiCoachPanel
          title="운동 분석 결과"
          :loading="analysLoading"
          :visible="!analysVisible"
          :user-name="userName"
          :text="analysisResult"
          @close="analysVisible = true"
        />
      </section>
    </div>

    <!-- 등록 모달 -->
    <ExerciseForm v-model="dialogCreateVisible" @saved="onSaved" />

    <!-- 수정/삭제 모달 -->
    <ExerciseEditForm
      v-model="dialogEditVisible"
      :record="selectedRecord"
      @updated="onSaved"
      @deleted="onSaved"
    />
  </div>
</template>

<script>
import axios from "axios";
import ExerciseList from "@/components/health/ExerciseList.vue";
import ExerciseForm from "@/components/health/ExerciseForm.vue";
import ExerciseEditForm from "@/components/health/ExerciseEditForm.vue";
import AiCoachPanel from "@/components/health/AiCoachPanel.vue";

export default {
  name: "ExerciseRecord",
  components: { ExerciseList, ExerciseForm, ExerciseEditForm, AiCoachPanel },
  data() {
    return {
      // user
      userName: "",

      // list data
      exerciseRecords: [],

      // 분석
      analysVisible: true,
      analysLoading: false,
      analysisResult: "",

      // 모달
      dialogCreateVisible: false,
      dialogEditVisible: false,

      // 선택 row
      selectedRecord: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getExerciseRecords();
      this.getPersonRecords();
    },

    openCreate() {
      this.dialogCreateVisible = true;
    },

    onSelect(row) {
      this.selectedRecord = { ...row }; // 안전하게 복사
      this.dialogEditVisible = true;
    },

    onSaved() {
      this.getExerciseRecords();
      // 필요하면 선택 초기화
      // this.selectedRecord = null;
    },

    async analyze() {
      this.analysVisible = false;
      this.analysLoading = true;

      try {
        let prompt = "";
        for (let r of this.exerciseRecords) {
          prompt += `${r.exerciseDate}에 ${r.exerciseName}을 ${r.exerciseSetNumber}세트 ${r.exerciseRepeatNumber}회씩 하였습니다. 중량은 ${r.exerciseWeight}kg 입니다.\n`;
        }
        prompt += "이 운동 기록을 각 운동별 중량변화와 주기등을 자세하게 분석해 주세요 친구처럼 친근하게 부탁해요";

        const res = await axios.get("/api/bot/chat/analysisExercise", { params: { prompt } });
        this.analysisResult = res.data;
      } catch (e) {
        console.error(e);
        this.analysisResult = "분석 중 오류가 발생했어요.";
      } finally {
        this.analysLoading = false;
      }
    },

    async getExerciseRecords() {
      try {
        const res = await axios.get("/api/exercise/getExercises");
        this.exerciseRecords = res.data;
      } catch (e) {
        console.error(e);
      }
    },

    // ✅ ExerciseList에서 startDate/endDate 넘겨주면 여기서 API 호출
    async getExerciseRecordsWithCondition({ startDate, endDate }) {
      try {
        if (!startDate || !endDate) return this.getExerciseRecords();
        const res = await axios.get("/api/exercise/getExercisesWithDates", { params: { startDate, endDate } });
        this.exerciseRecords = res.data;
      } catch (e) {
        console.error(e);
      }
    },

    async getPersonRecords() {
      try {
        const res = await axios.get("/api/personInfo/getPersonInfos");
        this.userName = res.data?.[0]?.name || "사용자";
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