<template>
    <div class="container">        
        <div class="left">
            <h1>Exercise Record List</h1>
            <p>This is a list of exercise records.</p>
            <table class="exercise-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>Repeats</th>
                        <th>Sets</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="record in exerciseRecords" :key="record.id"
                        @click="selectExerciseRecord(record.id, record)">
                        <td>{{ record.exerciseDate }}</td>
                        <td>{{ record.exerciseName }}</td>
                        <td>{{ record.exerciseWeight }}</td>
                        <td>{{ record.exerciseRepeatNumber }}</td>
                        <td>{{ record.exerciseSetNumber }}</td>
                        <td>{{ record.exerciseRemark }}</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <button class="btn btn-primary" @click="analysisExerciseRecord">분석</button>
            <div>
                <h2>분석 결과</h2>
                <p>분석 결과를 확인하세요</p>
                <div class="result-box">{{ analysisResult }}</div>
             </div>
        </div>
        <div class="right">
            <div class="form-container">
                <h2>Add Exercise Record</h2>
                <form @submit.prevent="addExerciseRecord">
                    <div class="form-group">
                        <label for="date">Date:</label>
                        <input type="date" id="exerciseDate" v-model="exerciseRecord.exerciseDate" required>
                    </div>
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="exerciseName" v-model="exerciseRecord.exerciseName" required>
                    </div>
                    <div class="form-group">
                        <label for="weight">Weight:</label>
                        <input type="number" id="exerciseWeight" v-model="exerciseRecord.exerciseWeight" required>
                    </div>
                    <div class="form-group">
                        <label for="repeats">Repeats:</label>
                        <input type="number" id="exerciseRepeatNumber" v-model="exerciseRecord.exerciseRepeatNumber" required>
                    </div>
                    <div class="form-group">
                        <label for="sets">Sets:</label>
                        <input type="number" id="exerciseSetNumber" v-model="exerciseRecord.exerciseSetNumber" required>
                    </div>
                    <div class="form-group">
                        <label for="remark">Remark:</label>
                        <input type="text" id="exerciseRemark" v-model="exerciseRecord.exerciseRemark">
                    </div>
                    <button class="btn btn-success" type="submit">Add</button>
                </form>
            </div>
            <div class="form-container">
                <h2>Exercise Record Info</h2>
                <form @submit.prevent="modifyExerciseRecord">
                    <div class="form-group-id">
                        <input disabled type="number" id="id" v-model="selectedRecord.id" required>
                    </div>
                    <div class="form-group">
                        <label for="date">Date:</label>
                        <input type="date" id="exerciseDate" v-model="selectedRecord.exerciseDate" required>
                    </div>
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="exerciseName" v-model="selectedRecord.exerciseName" required>
                    </div>
                    <div class="form-group">
                        <label for="weight">Weight:</label>
                        <input type="number" id="exerciseWeight" v-model="selectedRecord.exerciseWeight" required>
                    </div>
                    <div class="form-group">
                        <label for="repeats">Repeats:</label>
                        <input type="number" id="exerciseRepeatNumber" v-model="selectedRecord.exerciseRepeatNumber" required>
                    </div>
                    <div class="form-group">
                        <label for="sets">Sets:</label>
                        <input type="number" id="exerciseSetNumber" v-model="selectedRecord.exerciseSetNumber" required>
                    </div>
                    <div class="form-group">
                        <label for="remark">Remark:</label>
                        <input type="text" id="exerciseRemark" v-model="selectedRecord.exerciseRemark">
                    </div>
                    <button class="btn btn-primary" type="submit">Update</button>
                    <button class="btn btn-danger" @click="deleteExerciseRecord">Delete</button>
                </form>
            </div>     
        </div>
    </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      analysisResult: "",
      exerciseRecords: [], // Initialize the exercise  Records array
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
      let prompt = "";
      for (let record of this.exerciseRecords) {
        prompt += `${record.exerciseDate}에 ${record.exerciseName}을 ${record.exerciseSetNumber}세트 ${record.exerciseRepeatNumber}회씩 하였습니다. 중량은 ${record.exerciseWeight}kg 입니다.\n`;
      }
      prompt += "이 운동 기록을 각 운동별 중량변화와 주기등을 자세하게 분석해 주세요";
      axios
        .get("/api/bot/chat/analysisExercise", {
          params: { prompt },
        })
        .then((response) => {
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
    addExerciseRecord() {
      axios
        .post("/api/exercise/addExerciseRecord", JSON.stringify(this.exerciseRecord), {
          headers: { "Content-Type": "application/json" },
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
    },
    selectExerciseRecord(id, record) {
      this.selectedRecord = record;
    },
    modifyExerciseRecord() {
      axios
        .put("/api/exercise/updateExerciseRecord", JSON.stringify(this.selectedRecord), {
          headers: { "Content-Type": "application/json" },
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
      axios
        .post("/api/exercise/deleteExerciseRecord", JSON.stringify(this.selectedRecord), {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response.data);
          this.getExerciseRecords();
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

.left, .right {
    width: 45% !important;
    margin: 0 20px; /* Add margin between left and right columns */
    padding: 10px;
}


.exercise-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.exercise-table th, .exercise-table td {
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
    border: #007BFF 1px solid;
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
    width: 100px; /* Label width */
    margin-right: 10px;
    text-align: left
}

.form-group input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #4CAF50;
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

button[type="submit"], .btn {
    width: 48%;
    margin-right: 4%;
}

button[type="submit"]:last-child, .btn:last-child {
    margin-right: 0;
}

.btn-primary {
    background-color: #007BFF;
}

.btn-primary:hover {
    background-color: #0069d9;
}

.btn-danger {
    background-color: #DC3545;
}

.btn-danger:hover {
    background-color: #C82333;
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

.nav-link {
    display: inline-block;
    margin-bottom: 20px;
    font-size: 18px;
    color: #007BFF;
    text-decoration: none;
}

.nav-link:hover {
    text-decoration: underline;
}
</style>
