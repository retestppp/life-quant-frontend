<template>
    <div class="container">
        <router-link to="/hello">hello </router-link>
        <div class="left">
            <h1>Exercise Record List</h1>
            <p>This is a list of exercise records.</p>
            <table>
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
                    <tr v-for="record in exerciseRecords" :key="record.id">
                        <td>{{ record.exerciseDate }}</td>
                        <td>{{ record.exerciseName }}</td>
                        <td>{{ record.exerciseWeight }}</td>
                        <td>{{ record.exerciseRepeatNumber }}</td>
                        <td>{{ record.exerciseSetNumber }}</td>
                        <td>{{ record.exerciseRemark }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="right">
            <form @submit.prevent="addExerciseRecord">
                <h2>Add Exercise Record</h2>
                <label for="date">Date:</label>
                <input type="date" id="exerciseDate" v-model="exerciseRecord.exerciseDate" required>
                <br>
                <label for="name">Name:</label>
                <input type="text" id="exerciseName" v-model="exerciseRecord.exerciseName" required>
                <br>
                <label for="weight">Weight:</label>
                <input type="number" id="exerciseWeight" v-model="exerciseRecord.exerciseWeight" required>
                <br>
                <label for="repeats">Repeats:</label>
                <input type="number" id="exerciseRepeatNumber" v-model="exerciseRecord.exerciseRepeatNumber" required>
                <br>
                <label for="sets">Sets:</label>
                <input type="number" id="exerciseSetNumber" v-model="exerciseRecord.exerciseSetNumber" required>
                <br>
                <label for="remark">Remark:</label>
                <input type="text" id="exerciseRemark" v-model="exerciseRecord.exerciseRemark">
                <br>
                <button submit>Add</button>
            </form>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {    
    data() {
        return {
            exerciseRecords: [], // Initialize the exercise  Records array
            exerciseRecord: {
                // exerciseDate: '',
                // exerciseName: '',
                // exerciseWeight: 0,
                // exerciseRepeatNumber: 0,
                // exerciseSetNumber: 0,
                // exerciseRemark: ''
                exerciseDate: '2024-05-20',
                exerciseName: '운동11',
                exerciseWeight: 100,
                exerciseRepeatNumber: 15,
                exerciseSetNumber: 4,
                exerciseRemark: '비고11'
            }   
        };
    },
    beforeMount() {
      // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
      // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
      this.init();
    },
    mounted() {
        // Fetch exercise records from the server and assign them to exerciseRecords
        // You can use an API call or any other method to retrieve the data
        // For example, using axios:
        // this.getExerciseRecords();
    },
    methods: {
        init() {
            this.getExerciseRecords();
            console.log("init");
        },  
        addExerciseRecord() {
            // Add the new exercise record to the exerciseRecords array
            // this.exerciseRecords.push(this.exerciseRecord);
            console.log(this.exerciseRecord);
            console.log(JSON.stringify(this.exerciseRecord));
        // axios.post('/api/exercise/addExerciseRecord', JSON.stringify(this.exerciseRecord))
            axios.post('/api/exercise/addExerciseRecord', JSON.stringify(this.exerciseRecord), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                // Handle the response if needed
                if (response) {
                    console.log("response : " + response);   
                    this.getExerciseRecords();
                }
            })
            .catch(error => {
                console.error(error);
            });
            // Reset the exerciseRecord object
            this.exerciseRecord = {
                exerciseDate: '2024-05-20',
                exerciseName: '운동11',
                exerciseWeight: 100,
                exerciseRepeatNumber: 15,
                exerciseSetNumber: 4,
                exerciseRemark: '비고11'
            };
        },
        getExerciseRecords() {
            // Fetch exercise records from the server and assign them to exerciseRecords
            // You can use an API call or any other method to retrieve the data
            // For example, using axios:
            axios.get('/api/exercise/getExercises')
                .then(response => {
                    console.log(response.data); // Log the response data for debugging
                    console.log(this.exerciseRecord);
                    console.log(JSON.stringify(this.exerciseRecord));
                    this.exerciseRecords = response.data;
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
    display: block;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Adjust the height as needed */
}
.left {
    width: 30%;
    float: left;
}
.right {
    width: 70%;
    float: right;
}

</style>