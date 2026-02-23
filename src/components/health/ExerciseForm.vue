<template>
  <el-dialog
    :model-value="modelValue"
    title="운동 기록 등록"
    width="520"
    @update:modelValue="(val) => $emit('update:modelValue', val)"
  >
    <el-form label-width="120px">
      <el-form-item label="Date">
        <el-date-picker v-model="form.exerciseDate" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="form.exerciseName" />
      </el-form-item>
      <el-form-item label="Weight (kg)">
        <el-input v-model.number="form.exerciseWeight" />
      </el-form-item>
      <el-form-item label="Repeat">
        <el-input-number v-model="form.exerciseRepeatNumber" :min="1" :max="50" />
      </el-form-item>
      <el-form-item label="Sets">
        <el-input-number v-model="form.exerciseSetNumber" :min="1" :max="50" />
      </el-form-item>
      <el-form-item label="Remark">
        <el-input v-model="form.exerciseRemark" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="close">취소</el-button>
      <el-button type="primary" @click="save">저장</el-button>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "ExerciseForm",
  props: {
    modelValue: { type: Boolean, default: false },
  },
  emits: ["update:modelValue", "saved"],
  data() {
    return {
      form: {
        exerciseDate: "",
        exerciseName: "",
        exerciseWeight: 0,
        exerciseRepeatNumber: 0,
        exerciseSetNumber: 0,
        exerciseRemark: "",
      },
    };
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
    async save() {
      try {
        const payload = { ...this.form };
        payload.exerciseDate = this.formatDate(payload.exerciseDate);

        await axios.post("/api/exercise/addExerciseRecord", JSON.stringify(payload), {
          headers: { "Content-Type": "application/json" },
        });

        this.$emit("saved");
        this.close();

        this.form = {
          exerciseDate: "",
          exerciseName: "",
          exerciseWeight: 0,
          exerciseRepeatNumber: 0,
          exerciseSetNumber: 0,
          exerciseRemark: "",
        };
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>