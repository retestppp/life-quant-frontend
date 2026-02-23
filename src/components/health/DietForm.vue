<template>
  <el-dialog
    :model-value="modelValue"
    title="식단 기록 등록"
    width="520"
    @update:modelValue="(val) => $emit('update:modelValue', val)"
    >
    <el-form label-width="120px">
      <el-form-item label="Date">
        <el-date-picker v-model="dietRecord.dietDate" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item label="Food Name">
        <el-input v-model="dietRecord.dietName" />
      </el-form-item>
      <el-form-item label="Meal Type">
        <el-select v-model="dietRecord.dietMealType" placeholder="Select" style="width: 100%">
          <el-option v-for="item in mealOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="Amount (g)">
        <el-input v-model.number="dietRecord.dietAmount" />
      </el-form-item>
      <el-form-item label="Calorie (kcal)">
        <el-input v-model.number="dietRecord.dietCal" />
      </el-form-item>
      <el-form-item label="Remark">
        <el-input v-model="dietRecord.dietRemark" />
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
  name: "DietForm",
  props: {
    visible: { type: Boolean, default: false },
  },
  emits: ["update:visible", "saved"],
  data() {
    return {
      mealOptions: [
        { value: "M", label: "아침" },
        { value: "L", label: "점심" },
        { value: "E", label: "저녁" },
        { value: "N", label: "야식" },
      ],
      dietRecord: {
        dietDate: "",
        dietName: "",
        dietMealType: "",
        dietAmount: 0,
        dietCal: 0,
        dietRemark: "",
      },
    };
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
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
        const payload = { ...this.dietRecord };
        payload.dietDate = this.formatDate(payload.dietDate);

        await axios.post("/api/diet/addDietRecord", JSON.stringify(payload), {
          headers: { "Content-Type": "application/json" },
        });

        this.$emit("saved");
        this.close();

        // reset
        this.dietRecord = { dietDate: "", dietName: "", dietMealType: "", dietAmount: 0, dietCal: 0, dietRemark: "" };
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
