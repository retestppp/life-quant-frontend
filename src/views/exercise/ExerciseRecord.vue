<template>
  <div class="container">
    <div class="left">
      <h1>Exercise Record List</h1>
      <p>This is a list of exercise records.</p>
      <div>
        <!-- Date Range Picker 시작-->
        <div class="top-date-picker-group">
          <div class="top-date-picker">
            <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                @change="fetchExerciseRecords"
            >
            </el-date-picker>
          </div>
          <div class="top-date-picker-button">
            <el-button type="primary" @click="getExerciseRecordsWithCondition">검색</el-button>
          </div>
        </div>
        <!-- Date Range Picker 끝-->
        <!-- 버튼들 시작-->
        <div class="top-buttons" align="right">
          <el-button plain @click="dialogFormVisible = true">
            등록
          </el-button>
          <!--            <el-button @click="dialogFormUpdateVisible = true">수정</el-button>-->
          <el-button type="primary" @click="analysisExerciseRecord">분석</el-button>
          <!--          <el-button @click="deleteData =true">삭제</el-button>-->
        </div>
        <!-- 버튼들 끝-->
      </div>

      <!-- 테이블 -->
      <div>
        <el-table
            ref="multipleTableRef"
            :data="exerciseRecords"
            style="width: 100%"
            @row-click="selectExerciseRecord"
        >
          <el-table-column
              v-for="column in exerciseTable"
              :key="column.valueKey"
              :prop="column.valueKey"
              :label="column.label"
              :width="column.width"
          />
        </el-table>
      </div>

      <br>
      <!-- 분석 -->
<!--      <el-button type="primary" @click="analysisExerciseRecord">분석</el-button>-->
      <div :hidden="analysVisible">
        <el-card v-loading="analysLoading"
                 body-style="height:auto;white-space:pre-wrap;overflow:auto;padding:10px;margin-top:10px">
          <template #header> 김*진 님의 운동 분석 결과</template>
          {{ analysisResult }}
        </el-card>
      </div>
    </div>

    <!-- 모달 창 -->
    <el-dialog v-model="dialogFormVisible" title="운동 기록 등록" width="500">
      <el-form label-width="auto">
        <el-form-item label="Date">
          <el-date-picker
              v-model="exerciseRecord.exerciseDate"
              type="date"
              placeholder="Pick a date"
              clearable
          />
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="exerciseRecord.exerciseName"/>
        </el-form-item>
        <el-form-item label="Weight(kg)">
          <el-input v-model="exerciseRecord.exerciseWeight"/>
        </el-form-item>
        <el-form-item label="Repeat">
          <el-input-number v-model="exerciseRecord.exerciseRepeatNumber" :min="1" :max="10"
                           @change="handleRepeatNumber"/>
        </el-form-item>
        <el-form-item label="Sets">
          <el-input v-model="exerciseRecord.exerciseSetNumber"/>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="exerciseRecord.exerciseRemark"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addExerciseRecord">추가</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogFormUpdateVisible" title="운동 기록 수정" width="500">
      <el-form label-width="auto">
        <el-form-item label="Date">
          <el-date-picker
              v-model="selectedRecord.exerciseDate"
              type="date"
              placeholder="Pick a date"
              clearable
          />
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="selectedRecord.exerciseName"/>
        </el-form-item>
        <el-form-item label="Weight(kg)">
          <el-input v-model="selectedRecord.exerciseWeight"/>
        </el-form-item>
        <el-form-item label="Repeat">
          <el-input-number v-model="selectedRecord.exerciseRepeatNumber" :min="1" :max="10"
                           @change="handleRepeatNumber"/>
        </el-form-item>
        <el-form-item label="Sets">
          <el-input v-model="selectedRecord.exerciseSetNumber"/>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="selectedRecord.exerciseRemark"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="modifyExerciseRecord">수정</el-button>
          <el-button @click="deleteExerciseRecord">삭제</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  <!--  </div>-->
</template>


<script>
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  data() {
    return {
      // 테이블 위 date picker
      dateRange: '',
      // 폼 여부
      dialogFormVisible: false,
      dialogFormUpdateVisible: false,
      deleteData: false,
      analysVisible: true,
      analysLoading: true,
      // 반복 횟수
      repeatNumber: 0,
      analysisResult: "",
      exerciseRecords: [], // Initialize the exercise  Records array
      exerciseTable: [
        {
          label: "Date",
          valueKey: "exerciseDate",
          fixed: true,
          disabled: true,
          hidden: false
        },
        {
          label: "Name",
          valueKey: "exerciseName",
          fixed: true,
          disabled: true,
          hidden: false
        },
        {
          label: "Weight(kg)",
          valueKey: "exerciseWeight",
          fixed: true,
          disabled: true,
          hidden: false
        },
        {
          label: "Repeats",
          valueKey: "exerciseRepeatNumber",
          fixed: true,
          disabled: true,
          hidden: false
        },
        {
          label: "Sets",
          valueKey: "exerciseSetNumber",
          fixed: true,
          disabled: true,
          hidden: false
        },
        {
          label: "Remark",
          valueKey: "exerciseRemark",
          fixed: true,
          disabled: true,
          hidden: false
        },

      ],
      exerciseRecord: {
        exerciseDate: "",
        exerciseName: "",
        exerciseWeight: 0,
        exerciseRepeatNumber: 0,
        exerciseSetNumber: 0,
        exerciseRemark: "",
      },
      selectedRecord: {
        id: 0,
        exerciseDate: "",
        exerciseName: "",
        exerciseWeight: 0,
        exerciseRepeatNumber: 0,
        exerciseSetNumber: 0,
        exerciseRemark: "",
      },
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.getExerciseRecords();
    },
    analysisExerciseRecord() {
      this.analysVisible = false;
      let prompt = "";
      for (let record of this.exerciseRecords) {
        prompt += `${record.exerciseDate}에 ${record.exerciseName}을 ${record.exerciseSetNumber}세트 ${record.exerciseRepeatNumber}회씩 하였습니다. 중량은 ${record.exerciseWeight}kg 입니다.\n`;
      }
      prompt += "이 운동 기록을 각 운동별 중량변화와 주기등을 자세하게 분석해 주세요 친구처럼 친근하게 부탁해요";
      axios
          .get("/api/bot/chat/analysisExercise", {
            params: {prompt},
          })
          .then((response) => {
            this.analysLoading = false;
            this.analysisResult = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    getExerciseRecords() {
      axios
          .get("/api/exercise/getExercises")
          .then((response) => {
            this.exerciseRecords = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
    },
        getExerciseRecordsWithCondition() {
      if (this.dateRange && this.dateRange.length === 2) {
        const [startDate, endDate] = this.dateRange;
        var formattedStartDate = this.formatDate(startDate);
        var formattedEndDate = this.formatDate(endDate);

        console.log("Selected Date Range:", formattedStartDate, formattedEndDate);

        // Now you can use formattedStartDate and formattedEndDate in your axios request or elsewhere
        axios
          .get("/api/exercise/getExercisesWithDates", {
            params: { startDate: formattedStartDate, endDate: formattedEndDate },
          })
          .then((response) => {
            console.log(response.data); // Log the response data for debugging
            this.exerciseRecords = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.getExerciseRecords();
      }
    },
    addExerciseRecord() {
      this.exerciseRecord.exerciseDate = this.formatDate(this.exerciseRecord.exerciseDate);
      alert(this.exerciseRecord.exerciseDate);
      axios
          .post("/api/exercise/addExerciseRecord", JSON.stringify(this.exerciseRecord), {
            headers: {"Content-Type": "application/json"},
          })
          .then((response) => {
            console.log(response.data);
            this.getExerciseRecords();
          })
          .catch((error) => {
            console.error(error);
          });

      this.exerciseRecord = {
        exerciseDate: "",
        exerciseName: "",
        exerciseWeight: 0,
        exerciseRepeatNumber: 0,
        exerciseSetNumber: 0,
        exerciseRemark: "",
      };

      this.dialogFormVisible = false;
    },
    selectExerciseRecord(record) {
      this.dialogFormUpdateVisible = true;
      this.selectedRecord = record;
    },
    modifyExerciseRecord() {
      this.dialogFormUpdateVisible = false;
      axios
          .put("/api/exercise/updateExerciseRecord", JSON.stringify(this.selectedRecord), {
            headers: {"Content-Type": "application/json"},
          })
          .then((response) => {
            console.log(response.data);
            this.getExerciseRecords();
          })
          .catch((error) => {
            console.error(error);
          });

    },
    deleteExerciseRecord() {
      ElMessageBox.confirm(
          '정말 삭제 하시겠습니까?',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      )
          .then(() => {
            axios
                .post("/api/exercise/deleteExerciseRecord", JSON.stringify(this.selectedRecord), {
                  headers: {"Content-Type": "application/json"},
                })
                .then((response) => {
                  console.log(response.data);
                  this.getExerciseRecords();
                  this.dialogFormUpdateVisible = false;
                })
                .catch((error) => {
                  console.error(error);
                });

            ElMessage({
              type: 'success',
              message: 'Delete completed',
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Delete canceled',
            })
          })
    },
    handleRepeatNumber() {
      this.repeatNumber = this.repeatNumber + 1;
    },

    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
};
</script>
<style>
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.left, .right {
  width: 45% !important;
  margin: 0 20px; /* Add margin between left and right columns */
  padding: 10px;
}

.top-date-picker-group {
  display: block;
  padding-right: 5px;
  float: left;
}

.top-date-picker {
  display: inline;
  padding: 5px;
}

.top-date-picker-button {
  display: inline;
  padding: 5px;
}

.top-buttons {
  display: inline;
  padding-left: 5px;
  float: right;
}

</style>
