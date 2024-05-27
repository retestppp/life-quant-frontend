<template>
    <div class="container">
        <div class="left">
            <h1>Diet Record List</h1>
            <p>This is a list of diet records.</p>
            <table class="exercise-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Food Name</th>
                        <th>Meal Type</th>
                        <th>Amount</th>
                        <th>Cal</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="record in dietRecords" :key="record.id" @click="selectDietRecord(record.id, record)">
                        <td>{{ record.dietDate }}</td>
                        <td>{{ record.dietName }}</td>
                        <td>{{ record.dietMealType }}</td>
                        <td>{{ record.dietAmount }}</td>
                        <td>{{ record.dietCal }}</td>
                        <td>{{ record.dietRemark }}</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <button class="btn btn-primary" @click="analysisDietRecord">Analyze</button>
            <div>
                <h2>Analysis Result</h2>
                <p>Check the analysis results below:</p>
                <div class="result-box">{{ analysisResult }}</div>
            </div>
        </div>
        <div class="right">
            <div class="form-container">
                <h2>Add Diet Record</h2>
                <form @submit.prevent="addDietRecord">
                    <div class="form-group">
                        <label for="date">Date:</label>
                        <input type="date" id="dietDate" v-model="dietRecord.dietDate" required>
                    </div>
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="dietName" v-model="dietRecord.dietName" required>
                    </div>
                    <div class="form-group">
                        <label for="mealType">Meal Type:</label>
                        <input type="text" id="dietMealType" v-model="dietRecord.dietMealType" required>
                    </div>
                    <div class="form-group">
                        <label for="amount">Amount:</label>
                        <input type="number" id="dietAmount" v-model="dietRecord.dietAmount" required>
                    </div>
                    <div class="form-group">
                        <label for="cal">Cal:</label>
                        <input type="number" id="dietCal" v-model="dietRecord.dietCal" required>
                    </div>
                    <div class="form-group">
                        <label for="remark">Remark:</label>
                        <input type="text" id="dietRemark" v-model="dietRecord.dietRemark">
                    </div>
                    <button class="btn btn-success" type="submit">Add</button>
                </form>
            </div>
            <div class="form-container">
                <h2>Diet Record Info</h2>
                <form @submit.prevent="modifyDietRecord">
                    <div class="form-group-id">
                        <input disabled type="number" id="id" v-model="selectedRecord.id" required>
                    </div>
                    <div class="form-group">
                        <label for="date">Date:</label>
                        <input type="date" id="dietDate" v-model="selectedRecord.dietDate" required>
                    </div>
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="dietName" v-model="selectedRecord.dietName" required>
                    </div>
                    <div class="form-group">
                        <label for="mealType">Meal Type:</label>
                        <input type="text" id="dietMealType" v-model="selectedRecord.dietMealType" required>
                    </div>
                    <div class="form-group">
                        <label for="amount">Amount:</label>
                        <input type="number" id="dietAmount" v-model="selectedRecord.dietAmount" required>
                    </div>
                    <div class="form-group">
                        <label for="cal">Cal:</label>
                        <input type="number" id="dietCal" v-model="selectedRecord.dietCal" required>
                    </div>
                    <div class="form-group">
                        <label for="remark">Remark:</label>
                        <input type="text" id="dietRemark" v-model="selectedRecord.dietRemark">
                    </div>
                    <button class="btn btn-primary" type="submit">Update</button>
                    <button class="btn btn-danger" @click="deleteDietRecord">Delete</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            analysisResult: "",
            dietRecords: [], // Initialize the diet  Records array
            dietRecord: {
                dietDate: '',
                dietName: '',
                dietMealType: '',
                dietAmount: 0,
                dietCal: 0,
                dietRemark: ''
            },
            selectedRecord: {
                id: 0,
                dietDate: '',
                dietName: '',
                dietMealType: '',
                dietAmount: 0,
                dietCal: 0,
                dietRemark: ''
            }
        };
    },
    beforeMount() {
        this.init();
    },
    methods: {
        init() {
            this.getDietRecords();
        },
        analysisDietRecord() {
            let prompt = "";
            for (let record of this.dietRecords) {
                prompt += `${record.dietDate}에 ${record.dietName}을(를) ${record.dietAmount}g 만큼 섭취하였습니다. 칼로리는 ${record.dietCal}kcal 입니다.\n`;
            }
            prompt += "이 식단 기록을 분석해 주세요.";
            axios
                .get("/api/bot/chat/analysisDiet", {
                    params: { prompt },
                })
                .then((response) => {
                    this.analysisResult = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getDietRecords() {
            axios.get('/api/diet/getDiets')
                .then(response => {
                    console.log(response.data); // Log the response data for debugging
                    this.dietRecords = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addDietRecord() {
            axios.post('/api/diet/addDietRecord', JSON.stringify(this.dietRecord), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.getDietRecords();
                })
                .catch(error => {
                    console.error(error);
                });
            this.dietRecord = {
                dietDate: '',
                dietName: '',
                dietMealType: '',
                dietAmount: 0,
                dietCal: 0,
                dietRemark: ''
            };
        },
        selectDietRecord(id, record) {
            this.selectedRecord = record;
        },
        modifyDietRecord() {
            axios.put('/api/diet/modifyDietRecord', JSON.stringify(this.selectedRecord), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.getDietRecords();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        deleteDietRecord() {
            axios.post('/api/diet/deleteDietRecord', JSON.stringify(this.selectedRecord), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.selectedRecord = {
                        id: 0,
                        dietDate: '',
                        dietName: '',
                        dietMealType: '',
                        dietAmount: 0,
                        dietCal: 0,
                        dietRemark: ''
                    };
                    this.getDietRecords();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
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
</style>
