<template>
  <div>
    <div class="title">AI에게 질문하기</div>
    <div class="row">
      <el-input v-model="q" placeholder="예: 오늘 운동 루틴 추천해줘" @keyup.enter="ask" />
      <el-button type="primary" @click="ask" :loading="loading">질문</el-button>
    </div>

    <el-card v-if="answer" style="margin-top:12px;" body-style="white-space:pre-wrap;">
      {{ answer }}
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CoachChatBox",
  data() {
    return { q: "", answer: "", loading: false };
  },
  methods: {
    async ask() {
      if (!this.q.trim()) return;
      this.loading = true;
      try {
        const res = await axios.get("/api/bot/chat/customCoach", { params: { prompt: this.q } });
        this.answer = res.data;
      } catch (e) {
        console.error(e);
        this.answer = "답변 중 오류가 발생했어요.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.title{ font-weight:900; margin-bottom:10px; }
.row{ display:flex; gap:10px; }
</style>