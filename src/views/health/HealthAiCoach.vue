<template>
  <div class="page">
    <div class="header">
      <div>
        <h2>AI 코치</h2>
        <p class="sub">운동/식단 기록을 종합해 오늘의 추천과 피드백을 제공합니다.</p>
      </div>

      <div class="actions">
        <el-button type="primary" @click="refresh" :loading="loading">새로고침</el-button>
        <el-button type="success" @click="analyze" :loading="loading">분석</el-button>
      </div>
    </div>

    <!-- 상단 요약 -->
    <CoachSummaryCards
      :loading="loading"
      :exercise-score="coach.exerciseScore"
      :diet-score="coach.dietScore"
      :summary="coach.summary"
    />

    <div class="grid">
      <!-- 왼쪽: 추천 행동 -->
      <section class="panel">
        <CoachActionList
          :loading="loading"
          :actions="coach.actions"
        />
      </section>

      <!-- 오른쪽: 분석 텍스트 -->
      <section class="panel">
        <AiCoachPanel
          title="코치 피드백"
          :loading="loading"
          :visible="true"
          :user-name="userName"
          :text="coach.weeklySummary?.join('\n') || coach.summary"
        />

        <div v-if="coach.risks?.length" class="risks">
          <div class="risk-title">주의 포인트</div>
          <ul>
            <li v-for="(r,idx) in coach.risks" :key="idx">{{ r }}</li>
          </ul>
        </div>
      </section>
    </div>

    <!-- 아래: 자유 질문 -->
    <section class="panel" style="margin-top:16px;">
      <CoachChatBox />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AiCoachPanel from "@/components/health/AiCoachPanel.vue";
import CoachSummaryCards from "@/components/health/CoachSummaryCards.vue";
import CoachActionList from "@/components/health/CoachActionList.vue";
import CoachChatBox from "@/components/health/CoachChatBox.vue";

export default {
  name: "HealthAiCoach",
  components: { AiCoachPanel, CoachSummaryCards, CoachActionList, CoachChatBox },
  data() {
    return {
      loading: false,
      userName: "사용자",
      exerciseRows: [],
      dietRows: [],
      coach: {
        exerciseScore: 0,
        dietScore: 0,
        summary: "분석을 누르면 코치가 종합 피드백을 생성합니다.",
        actions: [],
        risks: [],
        weeklySummary: []
      },
    };
  },
  async mounted() {
    await this.refresh(); // 처음 들어오면 데이터만 로드
  },
  methods: {
    async refresh() {
      this.loading = true;
      try {
        // 사용자
        const p = await axios.get("/api/personInfo/getPersonInfos");
        this.userName = p.data?.[0]?.name || "사용자";

        // 운동/식단 데이터
        const ex = await axios.get("/api/exercise/getExercises");
        const di = await axios.get("/api/diet/getDiets");
        this.exerciseRows = ex.data || [];
        this.dietRows = di.data || [];
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    // ✅ 여기서는 "임시"로 프롬프트를 만들어 기존 AI API를 호출하는 방식(백엔드 엔드포인트 없어도 됨)
    async analyze() {
      this.loading = true;
      try {
        const exerciseText = this.exerciseRows
          .map(r => `${r.exerciseDate} ${r.exerciseName} ${r.exerciseSetNumber}세트 ${r.exerciseRepeatNumber}회 ${r.exerciseWeight}kg`)
          .join("\n");

        const dietText = this.dietRows
          .map(r => `${r.dietDate} ${r.dietName} ${r.dietAmount}g ${r.dietCal}kcal (${r.dietMealType})`)
          .join("\n");

        const prompt = `
너는 개인 건강 코치야.
아래 입력(운동기록/식단기록/사용자정보)을 바탕으로 반드시 JSON으로만 출력해.

형식:
{
  "exerciseScore": 0,
  "dietScore": 0,
  "summary": "",
  "actions": [{"title":"","reason":"","difficulty":"easy|mid|hard"}],
  "risks": ["", ""],
  "weeklySummary": ["", "", ""]
}

입력:
[사용자] ${this.userName}
[운동기록]
${exerciseText}

[식단기록]
${dietText}
        `.trim();

        // ✅ 백엔드에 "그냥 프롬프트 던지면 답해주는" 엔드포인트가 이미 있으면 그걸 사용
        // 지금은 예시로 customCoach 사용 (광진님 프로젝트에 맞게 경로만 바꾸면 됨)
        const res = await axios.get("/api/bot/chat/customCoach", { params: { prompt } });

        const raw = typeof res.data === "string" ? res.data : JSON.stringify(res.data);

        // JSON만 오게 설계했지만, 가끔 앞뒤 텍스트가 섞이면 파싱 실패할 수 있어서 보정
        const jsonText = raw.trim().startsWith("{")
          ? raw
          : raw.substring(raw.indexOf("{"), raw.lastIndexOf("}") + 1);

        this.coach = JSON.parse(jsonText);
      } catch (e) {
        console.error(e);
        this.coach.summary = "분석 중 오류가 발생했어요. (JSON 파싱/엔드포인트 확인 필요)";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.page { padding: 24px; max-width: 1200px; margin: 0 auto; }
.header { display:flex; justify-content:space-between; align-items:flex-end; gap:16px; margin-bottom:18px; }
.sub { margin: 6px 0 0; color:#666; font-size:13px; }

.actions { display:flex; gap:10px; flex-wrap:wrap; }

.grid { display:grid; grid-template-columns: 1.2fr 0.8fr; gap:16px; margin-top:16px; }
.panel { background:#fff; border-radius:14px; padding:16px; box-shadow:0 6px 18px rgba(0,0,0,0.06); min-height: 220px; }

.risks { margin-top:12px; padding:12px; border-radius:12px; background: #fff7f7; }
.risk-title { font-weight: 800; margin-bottom: 6px; }

@media (max-width: 980px) { .grid { grid-template-columns: 1fr; } }
</style>