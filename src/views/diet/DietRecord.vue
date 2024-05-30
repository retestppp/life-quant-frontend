<template>
  <div class="container">
    <div class="left">
      <h1>Diet Record List</h1>
      <!--      테이블 위 시작-->
      <div class="table-top">
        <div class="top-date-picker-group">
          <div class="top-date-picker" style="width: 80%">
            <!-- Date Range Picker 시작-->
            <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                @change="fetchDietRecords"
            >
            </el-date-picker>
          </div>
          <div class="top-date-picker-button">
            <el-button type="primary" @click="getDietRecordsWithCondition">검색</el-button>
            <el-button type="success" @click="getDietRecordsWithCondition" style="margin-left: 5px">12월 섭취량</el-button>
<!--            <el-button type="success" @click="getDietRecordsWithCondition" style="margin-left: 5px">{{ momentMonth }}월 섭취량</el-button>-->
          </div>
          <!-- Date Range Picker 끝-->
        </div>
        <div class="top-buttons">
          <el-button plain @click="dialogFormVisible = true">등록</el-button>
          <el-button type="primary" @click="analysisDietRecord" style="margin-left: 5px">분석</el-button>
        </div>
        <!--       <el-button type="primary" @click="getDietRecordTrafficLight">신호등</el-button>-->
        <!--        <p>This is a list of diet records.</p>-->
      </div>
      <div>
        나의 식단 현황 상태:
        <!-- <span id="trafficLightText">{{ trafficLight }}</span> -->
        <span id="trafficLightIcon" :class="circleClass"></span>
        <!-- <span id="trafficLightIcon" class="circle green"></span>
        <span id="trafficLightIcon" class="circle yellow"></span>

        <span id="trafficLightIcon" class="circle red"></span> -->
      </div>
      <!--      테이블 위 끝-->

      <!--      테이블 시작-->
      <div>
        <el-table
            ref="multipleTableRef"
            :data="dietRecords"
            style="width: 100%"
            @row-click="selectDietRecord"
        >
          <el-table-column
              v-for="column in dietTable"
              :key="column.valueKey"
              :prop="column.valueKey"
              :label="column.label"
              :width="column.width"
          />
        </el-table>
      </div>
      <!--      테이블 끝-->

      <!--      분석 시작-->
      <div :hidden="analysVisible" class="right">
        <div class="analys-container">
          <el-card v-loading="analysLoading"
                   body-style="height:auto;white-space:pre-wrap;overflow:auto;padding:10px;margin-top:10px">
            <template #header> Analysis Result
              <el-button plain @click="dialogFormVisible = true" class="top-buttons">
                등록
              </el-button>
            </template>
            {{ analysisResult }}
          </el-card>
        </div>
      </div>

      <!--      분석 끝-->
    </div>

    <!--    모달창 시작-->
    <!--    <div class="right">-->
    <el-dialog v-model="dialogFormVisible" title="식단 기록 등록" width="500">
      <el-form label-width="auto">
        <el-form-item label="Date">
          <el-date-picker
              v-model="dietRecord.dietDate"
              type="date"
              placeholder="Pick a date"
              clearable
          />
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="dietRecord.dietName"/>
        </el-form-item>
        <el-form-item label="Meal Type">
          <el-select v-model="dietRecord.dietMealType" placeholder="Select" style="width: 240px">
            <el-option
                v-for="item in mealOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Amount">
          <el-input v-model="dietRecord.dietAmount"/>
        </el-form-item>
        <el-form-item label="Calorie">
          <el-input v-model="dietRecord.dietCal"/>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="dietRecord.dietRemark"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addDietRecord">추가</el-button>
        </div>
      </template>
    </el-dialog>

    <!--    수정 모달 시작-->
    <el-dialog v-model="dialogFormUpdateVisible" title="식단 기록 수정" width="500">
      <el-form label-width="auto">
        <!--        <el-form-item label="ID" disabled="disabled">-->
        <!--          <el-input v-model="selectedRecord.id"/>-->
        <!--        </el-form-item>-->
        <el-form-item label="Date">
          <el-date-picker
              v-model="selectedRecord.dietDate"
              type="date"
              placeholder="Pick a date"
              clearable
          />
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="selectedRecord.dietName"/>
        </el-form-item>
        <el-form-item label="Meal Type">
          <el-select v-model="selectedRecord.dietMealType" placeholder="Select" style="width: 240px">
            <el-option
                v-for="item in mealOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Amount">
          <el-input v-model="selectedRecord.dietAmount"/>
        </el-form-item>
        <el-form-item label="Calorie">
          <el-input v-model="selectedRecord.dietCal"/>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="selectedRecord.dietRemark"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="modifyDietRecord">수정</el-button>
          <el-button @click="deleteDietRecord">삭제</el-button>
        </div>
      </template>
    </el-dialog>
    <!--    모달창 끝-->
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";

const moment = require("moment");

export default {
  data() {
    return {
      momentMonth: moment().month() + 1,
      mealOptions: [
        {
          value: 'M',
          label: '아침',
        },
        {
          value: 'L',
          label: '점심',
        },
        {
          value: 'D',
          label: '저녁',
        },
        {
          value: 'N',
          label: '야식',
        },
      ],
      dialogFormVisible: false,
      dialogFormUpdateVisible: false,
      analysVisible: true,
      analysLoading: true,
      analysisResult: "",
      trafficLight: "일단 초록불",
      circleClass: "circle green",
      dietRecords: [], // Initialize the diet  Records array
      dietTable: [
        {
          label: "Date",
          valueKey: "dietDate",
          fixed: true,
          disabled: true,
          hidden: false
        },
        {
          label: "Food Name",
          valueKey: "dietName",
          fixed: true,
          disabled: true,
          hidden: false
        },
        {
          label: "Meal Type",
          valueKey: "dietMealType",
          fixed: true,
          disabled: true,
          hidden: false
        },
        {
          label: "Amount",
          valueKey: "dietAmount",
          fixed: true,
          disabled: true,
          hidden: false
        },
        {
          label: "Calorie",
          valueKey: "dietCal",
          fixed: true,
          disabled: true,
          hidden: false
        },
        {
          label: "Remark",
          valueKey: "dietRemark",
          fixed: true,
          disabled: true,
          hidden: false
        },
      ],
      dietRecord: {
        dietDate: "",
        dietName: "",
        dietMealType: "",
        dietAmount: 0,
        dietCal: 0,
        dietRemark: "",
      },
      selectedRecord: {
        id: 0,
        dietDate: "",
        dietName: "",
        dietMealType: "",
        dietAmount: 0,
        dietCal: 0,
        dietRemark: "",
      },
      dateRange: ["2024-05-01", "2024-05-31"],
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.getDietRecords();
    },
    fetchDietRecords() {
      // Fetch diet records based on the selected date range
      console.log("Selected Date Range:", this.dateRange);
      // Implement the logic to fetch records based on the dateRange.value
    },
    analysisDietRecord() {
      let prompt = "";
      for (let record of this.dietRecords) {
        prompt += `${record.dietDate}에 ${record.dietName}을(를) ${record.dietAmount}g 만큼 섭취하였습니다. 칼로리는 ${record.dietCal}kcal 입니다.\n`;
      }
      prompt += "이 식단 기록을 분석해 주세요. 친구처럼 친근하게 부탁해요";
      axios
          .get("/api/bot/chat/analysisDiet", {
            params: {prompt},
          })
          .then((response) => {
            this.analysisResult = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    getDietRecords() {
      axios
          .get("/api/diet/getDiets")
          .then((response) => {
            console.log(response.data); // Log the response data for debugging
            this.dietRecords = response.data;
            this.getDietRecordTrafficLight();
          })
          .catch((error) => {
            console.error(error);
          });
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    getDietRecordTrafficLight() {
      if (this.dateRange.length === 2) {
        const [startDate, endDate] = this.dateRange;
        var formattedStartDate = this.formatDate(startDate);
        var formattedEndDate = this.formatDate(endDate);

        console.log("Selected Date Range:", formattedStartDate, formattedEndDate);

        // Now you can use formattedStartDate and formattedEndDate in your axios request or elsewhere
        axios
            .get("/api/diet/getDietRecordTrafficLight", {
              params: {startDate: formattedStartDate, endDate: formattedEndDate, id: 1},
            })
            .then((response) => {
              console.log(response.data); // Log the response data for debugging
              this.trafficLight = response.data;
              this.circleClass = "circle " + response.data;
            })
            .catch((error) => {
              console.error(error);
            });
      } else {
        this.getDietRecords();
      }
    },
    getDietRecordsWithCondition() {
      if (this.dateRange && this.dateRange.length === 2) {
        const [startDate, endDate] = this.dateRange;
        var formattedStartDate = this.formatDate(startDate);
        var formattedEndDate = this.formatDate(endDate);

        console.log("Selected Date Range:", formattedStartDate, formattedEndDate);

        // Now you can use formattedStartDate and formattedEndDate in your axios request or elsewhere
        axios
            .get("/api/diet/getDietsWithDates", {
              params: {startDate: formattedStartDate, endDate: formattedEndDate},
            })
            .then((response) => {
              console.log(response.data); // Log the response data for debugging
              this.dietRecords = response.data;
              this.getDietRecordTrafficLight();
            })
            .catch((error) => {
              console.error(error);
            });
      } else {
        this.getDietRecords();
      }
    },
    addDietRecord() {
      this.dietRecord.dietDate = this.formatDate(this.dietRecord.dietDate);
      alert(this.dietRecord.dietDate);
      axios
          .post("/api/diet/addDietRecord", JSON.stringify(this.dietRecord), {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            this.getDietRecords();
          })
          .catch((error) => {
            console.error(error);
          });

      this.dietRecord = {
        dietDate: "",
        dietName: "",
        dietMealType: "",
        dietAmount: 0,
        dietCal: 0,
        dietRemark: "",
      };

      this.dialogFormVisible = false;
    },
    selectDietRecord(record) {
      this.dialogFormUpdateVisible = true;
      this.selectedRecord = record;
    },
    /*    selectDietRecord(id, record) {
          this.selectedRecord = record;
        },*/
    modifyDietRecord() {
      this.dialogFormUpdateVisible = false;
      axios
          .put("/api/diet/modifyDietRecord", JSON.stringify(this.selectedRecord), {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            this.getDietRecords();
          })
          .catch((error) => {
            console.error(error);
          });
    },
    deleteDietRecord() {
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
                .post("/api/diet/deleteDietRecord", JSON.stringify(this.selectedRecord), {
                  headers: {"Content-Type": "application/json"},
                })
                .then((response) => {
                  console.log(response.data);
                  this.getDietRecords();
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

.analys-container {
  margin-bottom: 20px;
  padding: 10px;
}

.left, .right {
  width: 49% !important;
  margin: 0 20px; /* Add margin between left and right columns */
  padding: 10px;
}

.table-top {
  display: flex;
  justify-content: space-between;
}

.top-date-picker-group {
  display: block;
}

.top-date-picker {
  display: inline;
  padding-right: 5px;
}

.top-date-picker-button {
display: inline;
/*  padding-left: 5px;*/
}

.top-buttons {
  display: inline;
  padding-left: 5px;
}

.el-button+ {
  margin-left: 5px;
}


/*.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.left,
.right {
  width: 45%;
  margin: 0 20px;
  !* Add margin between left and right columns *!
  padding: 10px;
}

.exercise-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.exercise-table th,
.exercise-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.exercise-table th {
  background-color: #f2f2f2;
}

.exercise-table tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.form-container {
  margin-bottom: 20px;
  border: #007bff 1px solid;
  padding: 10px;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-group-id {
  visibility: hidden;
}

.form-group label {
  width: 100px;
  !* Label width *!
  margin-right: 10px;
  text-align: left;
}

.form-group input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

button[type="submit"],
.btn {
  width: 48%;
  margin-right: 4%;
}

button[type="submit"]:last-child,
.btn:last-child {
  margin-right: 0;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

.result-box {
  border: 1px solid #ccc;
  padding: 10px;
  height: auto;
  overflow: auto;
  white-space: pre-wrap;
  text-align: justify;
  background-color: #f9f9f9;
  margin-top: 10px;
}*/
.circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 10px;
}

.red {
  background-color: red;
}

.yellow {
  background-color: yellow;
}

.green {
  background-color: green;
}
</style>

.top-date-picker-button {