<template>
  <div class="container">
    <!-- 모달 창 -->
    <el-dialog v-model="dialogChartVisible" title="칼로리 차트" width="1000" height="700">
      <MixedChart :key=chartKey :chart-data="caloriePerDayData" :options="chartOptions" :line-value="recommendedCalorie" :line-label="'적정 칼로리 선: '+recommendedCalorie"></MixedChart>
    </el-dialog>
    <div class="left">
      <h1>Diet Record List</h1>
      <!--      테이블 위 시작-->
      <div class="table-top">
        <div class="top-date-picker-group">
          <!-- Date Range Picker 시작-->
          <div class="top-date-picker">
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
            <el-button type="success" @click="openChart" style="margin-left: 5px">{{ momentMonth }}월 섭취량</el-button>
            <!-- <el-button type="success" @click="openChart" style="margin-left: 5px">12월 섭취량</el-button> -->
          </div>
          <!-- Date Range Picker 끝-->
        </div>
        <div class="top-buttons">
          <el-button plain @click="dialogFormVisible = true">등록</el-button>
          <el-button type="primary" @click="analysisDietRecord" style="margin-left: 5px">분석</el-button>
        </div>
      </div>
      <div class="traffic-light">
        나의 식단 현황 상태:
        <!-- <span id="trafficLightText">{{ trafficLight }}</span> -->
        <span id="trafficLightIcon" :class="circleClass"></span>
        <!-- <span id="trafficLightIcon" class="circle green"></span>
        <span id="trafficLightIcon" class="circle yellow"></span>
        <span id="trafficLightIcon" class="circle red"></span> -->
      </div>
      <!--      테이블 시작-->
      <div>
        <el-table
            ref="multipleTableRef"
            :data="dietRecords"
            style="width: 100%"
            @row-click="selectDietRecord"
            max-height="450"
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
    </div>
    <div :hidden="analysVisible" class="right">
      <!--      분석 시작-->
      <div class="analys-container">
        <el-card v-loading="analysLoading"
                 body-style="height:auto;white-space:pre-wrap;overflow:auto;padding:10px;margin-top:10px;text-align:left">
                 <template #header> {{userName}} 님의 식단 분석 결과 </template>
          {{ analysisResult }}
        </el-card>
      </div>
    </div>

    <!--      분석 끝-->

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
          <el-select
              v-model="dietRecord.dietMealType"
              placeholder="Select"
              style="width: 400px">
            <el-option
                v-for="item in mealOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Amount (g)">
          <el-input v-model="dietRecord.dietAmount"/>
        </el-form-item>
        <el-form-item label="Calorie (kcal)">
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
          <el-select
              v-model="selectedRecord.dietMealType"
              placeholder="Select"
              style="width: 400px">
            <el-option
                v-for="item in mealOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Amount (g)">
          <el-input v-model="selectedRecord.dietAmount"/>
        </el-form-item>
        <el-form-item label="Calorie (kcal)">
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
import MixedChart from '@/components/chart/MixedChart.vue'

const moment = require("moment");

export default {
  components: {
    MixedChart
  },
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
          value: 'E',
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
          label: "Amount (g)",
          valueKey: "dietAmount",
          fixed: true,
          disabled: true,
          hidden: false
        },
        {
          label: "Calorie (kcal)",
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
      // dateRange: '',
      userName: "",
      chartKey: 0,
      recommendedCalorie: 0,
      dialogChartVisible:false,
        caloriePerDayData: {
          datasets: [
            {
              type: 'bar',
              label: ' Calories',
              data: [],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ],
  
          labels: [0]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Calories[kcal]'
              },
              min: 0,
              max: 4000
            },
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            }
          }
        }
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.getDietRecords();
      this.getPersonRecords();
    },
    fetchDietRecords() {
      // Fetch diet records based on the selected date range
      console.log("Selected Date Range:", this.dateRange);
      // Implement the logic to fetch records based on the dateRange.value
    },
    analysisDietRecord() {
      this.analysVisible = false;
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
            this.analysLoading = false;
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
        this.selectedRecord.id = record.id;
        this.selectedRecord.dietDate = record.dietDate; 
        this.selectedRecord.dietName = record.dietName;
        this.selectedRecord.dietMealType = record.dietMealType;
        this.selectedRecord.dietAmount = record.dietAmount;
        this.selectedRecord.dietCal = record.dietCal;
        this.selectedRecord.dietRemark = record.dietRemark;
      },
    
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
    getPersonRecords() {
      axios.get('/api/personInfo/getPersonInfos')
          .then(response => {
            this.userName = response.data[0].name;
            this.recommendedCalorie = response.data[0].adjustCal;
          })
          .catch(error => {
            console.error(error);
          });
    },
    getCaloriePerDate() {
        axios
          .get("/api/diet/getDietDateCal")
          .then((response)=> {
            console.log(response)
            this.chartKey+=1
            this.caloriePerDayData.datasets[0].data = response.data.map(calorieData => calorieData.dietCal)
            this.caloriePerDayData.labels = response.data.map(calorieData => calorieData.dietDate)
          })
          .catch((error) => {
            console.error(error);
          });
      },
      openChart() {
        this.chartKey+=1
        this.getCaloriePerDate()
        this.dialogChartVisible = true
      }
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
  margin-bottom: 10px;
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
}

.top-buttons {
  display: inline;
  padding-left: 5px;
}

.el-button+ {
  margin-left: 5px;
}

.traffic-light {
  margin-bottom: 10px;
}
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
