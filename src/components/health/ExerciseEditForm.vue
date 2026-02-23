<template>
  <el-dialog
    :model-value="modelValue"
    title="운동 기록 수정"
    width="520"
    @update:modelValue="(val) => $emit('update:modelValue', val)"
  >
    <el-form v-if="local" label-width="120px">
      <el-form-item label="Date">
        <el-date-picker v-model="local.exerciseDate" type="date" clearable />
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="local.exerciseName" />
      </el-form-item>
      <el-form-item label="Weight (kg)">
        <el-input v-model.number="local.exerciseWeight" />
      </el-form-item>
      <el-form-item label="Repeat">
        <el-input-number v-model="local.exerciseRepeatNumber" :min="1" :max="50" />
      </el-form-item>
      <el-form-item label="Sets">
        <el-input-number v-model="local.exerciseSetNumber" :min="1" :max="50" />
      </el-form-item>
      <el-form-item label="Remark">
        <el-input v-model="local.exerciseRemark" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="close">닫기</el-button>
      <el-button type="primary" @click="update">수정</el-button>
      <el-button type="danger" @click="remove">삭제</el-button>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";

export default {
  name: "ExerciseEditForm",
  props: {
    modelValue: { type: Boolean, default: false },
    record: { type: Object, default: null },
  },
  emits: ["update:modelValue", "updated", "deleted"],
  data() {
    return {
      local: null,
    };
  },
  watch: {
    record: {
      immediate: true,
      handler(val) {
        this.local = val ? { ...val } : null;
      },
    },
  },
  methods: {
    close() {
      this.$emit("update:modelValue", false);
    },
    formatDate(date) {
      const d = new Date(date);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    },
    async update() {
      try {
        const payload = { ...this.local };
        payload.exerciseDate = this.formatDate(payload.exerciseDate);

        await axios.put("/api/exercise/updateExerciseRecord", JSON.stringify(payload), {
          headers: { "Content-Type": "application/json" },
        });

        this.$emit("updated");
        this.close();
      } catch (e) {
        console.error(e);
      }
    },
    async remove() {
      try {
        await ElMessageBox.confirm("정말 삭제 하시겠습니까?", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        });

        await axios.post("/api/exercise/deleteExerciseRecord", JSON.stringify(this.local), {
          headers: { "Content-Type": "application/json" },
        });

        ElMessage({ type: "success", message: "Delete completed" });
        this.$emit("deleted");
        this.close();
      } catch (e) {
        // cancel 포함
        if (e) console.error(e);
      }
    },
  },
};
</script>