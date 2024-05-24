<template>
    <div class="container">
        <router-link to="/hello">hello </router-link>
        <div class="left">
            <h1>Diet Record List</h1>
            <p>This is a list of diet records.</p>
            <table>
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
                    <tr v-for="record in dietRecords" :key="record.id"
                        @click="selectDietRecord(record.id, record)">
                        <td>{{ record.dietDate }}</td>
                        <td>{{ record.dietName }}</td>                                           
                        <td>{{ record.dietMealType }}</td>
                        <td>{{ record.dietAmount }}</td>
                        <td>{{ record.dietCal }}</td>
                        <td>{{ record.dietRemark }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="right">
            <div>
                <h2>Add Diet Record</h2>
                <form @submit.prevent="addDietRecord">
                    <label for="date">Date:</label>
                    <input type="date" id="dietDate" v-model="dietRecord.dietDate" required>
                    <br>
                    <label for="name">Name:</label>
                    <input type="text" id="dietName" v-model="dietRecord.dietName" required>
                    <br>
                    <label for="mealType">Meal Type:</label>
                    <input type="text" id="dietMealType" v-model="dietRecord.dietMealType" required>
                    <br>
                    <label for="amount">Amount:</label>
                    <input type="number" id="dietAmount" v-model="dietRecord.dietAmount" required>
                    <br>
                    <label for="cal">Cal:</label>
                    <input type="number" id="dietCal" v-model="dietRecord.dietCal" required>
                    <br>
                    <label for="remark">Remark:</label>
                    <input type="text" id="dietRemark" v-model="dietRecord.dietRemark">
                    <br>
                    <button submit>Add</button>
                </form>
            </div>
            
            <div>
                <h2>Diet Record info</h2>
                <form @submit.prevent="modifyDietRecord">
                    <input disabled type="number" id="id" v-model="selectedRecord.id" required>
                    <br>
                    <label for="date">Date:</label>
                    <input type="date" id="dietDate" v-model="selectedRecord.dietDate" required>
                    <br>
                    <label for="name">Name:</label>
                    <input type="text" id="dietName" v-model="selectedRecord.dietName" required>
                    <br>
                    <label for="weight">Meal Type:</label>
                    <input type="text" id="dietMealType" v-model="selectedRecord.dietMealType" required>
                    <br>
                    <label for="repeats">Amount:</label>
                    <input type="number" id="dietAmount" v-model="selectedRecord.dietAmount" required>
                    <br>
                    <label for="sets">Cal:</label>
                    <input type="number" id="dietCal" v-model="selectedRecord.dietCal" required>
                    <br>
                    <label for="remark">Remark:</label>
                    <input type="text" id="dietRemark" v-model="selectedRecord.dietRemark">
                    <br>
                    <button submit>update</button>
                    <button @click="deleteDietRecord">delete</button>
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
            dietRecords: [], // Initialize the diet  Records array
            dietRecord: {
                // dietDate: '',
                // dietName: '',
                // dietMealType: '',
                // dietAmount: 0,
                // dietCal: 0,
                // dietRemark: ''
                dietDate: '2024-05-05',
                dietName: 'test food1',
                dietMealType: 'M',
                dietAmount: 10,
                dietCal: 110,
                dietRemark: 'test remark1'
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
      // TODO : data를 초기화 시켜줌(검색 조건 유지가 필요할 때는 삭제할 것)
      // 이유 : vue.js는 SPA기반으로 동작하기 때문에 페이지를 이동하더라도 기존 입력된 정보가 그대로 남아 있는 문제가 있음
      this.init();
    },
    mounted() {
        // Fetch diet records from the server and assign them to dietRecords
        // You can use an API call or any other method to retrieve the data
        // For example, using axios:
        // this.getDietRecords();
    },
    methods: {
        init() {
            this.getDietRecords();
        },  
        getDietRecords() {
            // Fetch diet records from the server and assign them to dietRecords
            // You can use an API call or any other method to retrieve the data
            // For example, using axios:
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
            // Add the new diet record to the dietRecords array
            axios.post('/api/diet/addDietRecord', JSON.stringify(this.dietRecord), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                // Handle the response if needed
                if (response) {
                    console.log("response : " + response);   
                    this.getDietRecords();
                }
            })
            .catch(error => {
                console.error(error);
            });
            // Reset the dietRecord object
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
            // Modify the new diet record to the dietRecords array
            axios.put('/api/diet/modifyDietRecord', JSON.stringify(this.selectedRecord), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // Handle the response if needed
                    if (response) {
                        console.log("response : " + response);
                        this.getDietRecords();
                    }
                })
                .catch(error => {
                    console.error(error);
                });          
        }, 
        deleteDietRecord() {
            // Delete the new diet record to the dietRecords array
            // post로 하는 이유 : delete는 body를 지원하지 않음
            axios.post('/api/diet/deleteDietRecord', JSON.stringify(this.selectedRecord), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                // Handle the response if needed
                if (response) {
                    console.log("response : " + response);
                    this.selectDietRecord = {
                        id: 0,
                        dietDate: '',
                        dietName: '',
                        dietMealType: '',
                        dietAmount: 0,
                        dietCal: 0,
                        dietRemark: ''
                    };
                    this.getDietRecords();
                }
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
    width: 50%;
    float: left;
}
.right {
    width: 50%;
    float: right;
}

</style>