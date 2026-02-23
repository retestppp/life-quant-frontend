<!-- // 나쁜점 피드백 한줄 -->
 <template>
  <section class="card">
    <div class="head">
      <h3>나쁜점 피드백 한 줄</h3>
      <button class="edit" @click="editMode = !editMode">
        {{ editMode ? '완료' : '수정' }}
      </button>
    </div>

    <div v-if="!editMode" class="text">“{{ feedback }}”</div>

    <div v-else class="editor">
      <input v-model="feedback" class="input" placeholder="개선할 점을 한 줄로 적어보세요" />
    </div>
  </section>
</template>

<script>
export default {
  name: "BadFeedbackCard",
  data() {
    return {
      editMode: false,
      feedback: "오늘은 집중력이 분산됐다. 30분 단위로 끊어서 하자.",
    };
  },
};
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  margin-bottom: 16px;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.edit {
  border: 0;
  background: #f0f2f7;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
}
.text { margin-top: 12px; font-size: 14px; font-weight: 700; color: #222; }
.input {
  margin-top: 12px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
}
</style>
