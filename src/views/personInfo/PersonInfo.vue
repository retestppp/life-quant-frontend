<template>
    <div class="container">
        <div class="left">
            <h1>Person Info List</h1>
            <p>This is a list of person information records.</p>
            <table class="exercise-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Height (cm)</th>
                        <th>Weight (kg)</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="record in personRecords" :key="record.id" @click="selectPersonRecord(record.id, record)">
                        <td>{{ record.id }}</td>
                        <td>{{ record.name }}</td>
                        <td>{{ record.gender }}</td>
                        <td>{{ record.height }}</td>
                        <td>{{ record.weight }}</td>
                        <td>{{ record.age }}</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <button class="btn btn-primary" @click="analyzePersonRecords">Analyze</button>
            <div>
                <h2>Analysis Result</h2>
                <p>Check the analysis results below:</p>
                <div class="result-box">{{ analysisResult }}</div>
            </div>
        </div>
        <div class="right">
            <div class="form-container">
                <h2>Add Person Info</h2>
                <form @submit.prevent="addPersonRecord">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" v-model="personRecord.name" required>
                    </div>
                    <div class="form-group">
                        <label for="gender">Gender:</label>
                        <input type="text" id="gender" v-model="personRecord.gender" required>
                    </div>
                    <div class="form-group">
                        <label for="height">Height (cm):</label>
                        <input type="number" id="height" v-model="personRecord.height" required>
                    </div>
                    <div class="form-group">
                        <label for="weight">Weight (kg):</label>
                        <input type="number" id="weight" v-model="personRecord.weight" required>
                    </div>
                    <div class="form-group">
                        <label for="age">Age:</label>
                        <input type="number" id="age" v-model="personRecord.age" required>
                    </div>
                    <button class="btn btn-success" type="submit">Add</button>
                </form>
            </div>
            <div class="form-container">
                <h2>Person Info</h2>
                <form @submit.prevent="modifyPersonRecord">
                    <div class="form-group-id">
                        <input disabled type="number" id="id" v-model="selectedRecord.id" required>
                    </div>
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" v-model="selectedRecord.name" required>
                    </div>
                    <div class="form-group">
                        <label for="gender">Gender:</label>
                        <input type="text" id="gender" v-model="selectedRecord.gender" required>
                    </div>
                    <div class="form-group">
                        <label for="height">Height (cm):</label>
                        <input type="number" id="height" v-model="selectedRecord.height" required>
                    </div>
                    <div class="form-group">
                        <label for="weight">Weight (kg):</label>
                        <input type="number" id="weight" v-model="selectedRecord.weight" required>
                    </div>
                    <div class="form-group">
                        <label for="age">Age:</label>
                        <input type="number" id="age" v-model="selectedRecord.age" required>
                    </div>
                    <button class="btn btn-primary" type="submit">Update</button>
                    <button class="btn btn-danger" @click="deletePersonRecord">Delete</button>
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
            personRecords: [], // Initialize the person records array
            personRecord: {
                id: 0,
                name: '',
                gender: '',
                height: 0.0,
                weight: 0.0,
                age: 0
            },
            selectedRecord: {
                id: 0,
                name: '',
                gender: '',
                height: 0.0,
                weight: 0.0,
                age: 0
            }
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
            let prompt = "";
            for (let record of this.personRecords) {
                prompt += `${record.name} (${record.gender}), Height: ${record.height} cm, Weight: ${record.weight} kg, Age: ${record.age}\n`;
            }
            prompt += "이사람의 신체정보를 분석하고 알맞은 운동을 추천해주세요";
            axios
                .get("/api/bot/chat/analysisPersonInfo", {
                    params: { prompt },
                })
                .then((response) => {
                    this.analysisResult = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getPersonRecords() {
            axios.get('/api/personInfo/getPersonInfos')
                .then(response => {
                    console.log(response.data); // Log the response data for debugging
                    this.personRecords = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addPersonRecord() {
            axios.post('/api/personInfo/addPersonInfo', JSON.stringify(this.personRecord), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.getPersonRecords();
                })
                .catch(error => {
                    console.error(error);
                });
            this.personRecord = {
                id: 0,
                name: '',
                gender: '',
                height: 0.0,
                weight: 0.0,
                age: 0
            };
        },
        selectPersonRecord(id, record) {
            this.selectedRecord = record;
        },
        modifyPersonRecord() {
            axios.put('/api/personInfo/updatePersonInfo', JSON.stringify(this.selectedRecord), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.getPersonRecords();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        deletePersonRecord() {
            axios.post('/api/personInfo/deletePersonInfo', JSON.stringify(this.selectedRecord), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.selectedRecord = {
                        id: 0,
                        name: '',
                        gender: '',
                        height: 0.0,
                        weight: 0.0,
                        age: 0
                    };
                    this.getPersonRecords();
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
