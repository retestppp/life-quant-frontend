<template>
  <section class="card">
    <div class="head">
      <h3>좋은 말 한 줄</h3>
      <button class="edit" @click="editMode = !editMode">
        {{ editMode ? '완료' : '수정' }}
      </button>
    </div>

    <div v-if="!editMode" class="text">“{{ quote }}”</div>

    <div v-else class="editor">
      <input v-model="quote" class="input" placeholder="좋은 말 한 줄을 입력하세요" />
    </div>
  </section>
</template>

<script>
export default {
  name: "GoodQuoteCard",
  data() {
    return {
      editMode: false,
      quote: "꾸준함은 재능을 이긴다.",
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
.text { margin-top: 12px; font-size: 16px; font-weight: 700; }
.input {
  margin-top: 12px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
}
</style>
