<template>
  <div class="container">
    <div class="left">
      <h1>Person Info List</h1>
      <div align="right">
          <el-button type="primary" @click="analyzePersonRecords" style="margin-left: 5px">분석</el-button>
      </div>
      <div>
        <el-table
            :data="personRecords"
            style="width: 100%"
            @row-click="selectPersonRecord"
            max-height="450"
        >
          <el-table-column
              v-for="column in personTable"
              :key="column.valueKey"
              :prop="column.valueKey"
              :label="column.label"
              :width="column.width"
          />
        </el-table>
      </div>
    </div>
    <div :hidden="analysVisible" class="right">
      <div class="analys-container">
        <el-card
            v-loading="analysLoading"
            body-style="height:auto;white-space:pre-wrap;overflow:auto;padding:10px;margin-top:10px"
        >
          <template #header> {{ userName }} 님의 분석결과 </template>
          {{ analysisResult }}
        </el-card>
      </div>
    </div>
    <!-- 모달 창 -->
    <el-dialog v-model="dialogFormVisible" title="개인정보 수정" width="500">
      <el-form label-width="auto">
        <el-form-item label="id">
          <el-input v-model="selectedRecord.id" />
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="selectedRecord.name" />
        </el-form-item>
        <el-form-item label="Gender">
          <el-select
              v-model="selectedRecord.gender"
              placeholder="Select"
              style="width: 115px"
          >
            <el-option label="Female" value="Female" />
            <el-option label="Male" value="Male" />
            <el-option label="Other" value="Other" />
          </el-select>
        </el-form-item>
        <el-form-item label="Height">
          <el-input v-model="selectedRecord.height" />
        </el-form-item>
        <el-form-item label="Weight">
          <el-input v-model="selectedRecord.weight" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="modifyPersonRecord">수정</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      analysisResult: "",
      analysVisible: true,
      analysLoading: true,
      userName: "",
      personRecords: [], // Initialize the person records array
      personRecord: {
        id: 0,
        name: "",
        gender: "",
        height: 0.0,
        weight: 0.0,
        age: 0,
        adjustCal: 0,
      },
      selectedRecord: {
        id: 0,
        name: "",
        gender: "",
        height: 0.0,
        weight: 0.0,
        age: 0,
        adjustCal: 0,
      },
      personTable: [
        {
          label: "ID",
          valueKey: "id",
          fixed: true,
          disabled: true,
          hidden: false,
        },
        {
          label: "Name",
          valueKey: "name",
          fixed: true,
          disabled: true,
          hidden: false,
        },
        {
          label: "Gender",
          valueKey: "gender",
          fixed: true,
          disabled: true,
          hidden: false,
        },
        {
          label: "Height",
          valueKey: "height",
          fixed: true,
          disabled: true,
          hidden: false,
        },
        {
          label: "weight",
          valueKey: "weight",
          fixed: true,
          disabled: true,
          hidden: false,
        },
        {
          label: "AdjustCal",
          valueKey: "adjustCal",
          fixed: true,
          disabled: true,
          hidden: false,
        },
      ],
      dialogFormVisible: false,
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.getPersonRecords();
    },
    analyzePersonRecords() {
      this.analysVisible = false;
      let prompt = "";
      for (let record of this.personRecords) {
        prompt += `${record.name} (${record.gender}), Height: ${record.height} cm, Weight: ${record.weight} kg, Age: ${record.age}\n`;
      }
      prompt +=
          "이사람의 신체정보를 분석하고 알맞은 운동을 추천해주세요 친구처럼 친근하게 부탁해요";
      axios
          .get("/api/bot/chat/analysisPersonInfo", {
            params: { prompt },
          })
          .then((response) => {
            this.analysLoading = false;
            this.analysisResult = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    getPersonRecords() {
      axios
          .get("/api/personInfo/getPersonInfos")
          .then((response) => {
            console.log(response.data); // Log the response data for debugging
            this.personRecords = response.data;
            this.userName = response.data[0].name;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    addPersonRecord() {
      axios
          .post("/api/personInfo/addPersonInfo", JSON.stringify(this.personRecord), {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            this.getPersonRecords();
          })
          .catch((error) => {
            console.error(error);
          });
      this.personRecord = {
        id: 0,
        name: "",
        gender: "",
        height: 0.0,
        weight: 0.0,
        age: 0,
      };
    },
    selectPersonRecord(record) {
      this.selectedRecord.id = record.id;
      this.selectedRecord.name = record.name;
      this.selectedRecord.age = record.age;
      this.selectedRecord.gender = record.gender;
      this.selectedRecord.height = record.height;
      this.selectedRecord.weight = record.weight;
      this.selectedRecord.adjustCal = record.adjustCal;
      this.dialogFormVisible = true;
    },
    modifyPersonRecord() {
      this.dialogFormVisible = false;
      axios
          .put("/api/personInfo/updatePersonInfo", JSON.stringify(this.selectedRecord), {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            this.getPersonRecords();
          })
          .catch((error) => {
            console.error(error);
          });
    },
    deletePersonRecord() {
      axios
          .post("/api/personInfo/deletePersonInfo", JSON.stringify(this.selectedRecord), {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response.data);
            this.selectedRecord = {
              id: 0,
              name: "",
              gender: "",
              height: 0.0,
              weight: 0.0,
              age: 0,
            };
            this.getPersonRecords();
          })
          .catch((error) => {
            console.error(error);
          });
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

.left,
.right {
  width: 45%;
  margin: 0 20px;
  /* Add margin between left and right columns */
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
  /* Label width */
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
}
.table-top {
  display: flex;
  justify-content: space-between;
}
.top-buttons {
  margin-bottom: 10px;
}

.el-button + {
  margin-left: 5px;
}
</style>