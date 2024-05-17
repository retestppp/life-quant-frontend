<template>
    <div>
        <router-link to="/hello">hello </router-link>
        <h1>Exercise Record List</h1>
        <ul>
            <li v-for="record in exerciseRecords" :key="record.id">
                <div>Date: {{ record.exerciseDate }}</div>
                <div>Name: {{ record.exerciseName }}</div>
                <div>Weight: {{ record.exerciseWeight }}</div>
                <div>Repeats: {{ record.exerciseRepeatNumber }}</div>
                <div>Sets: {{ record.exerciseSetNumber }}</div>
                <div>Remark: {{ record.exerciseRemark }}</div>
                <br>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {    
    data() {
        return {
            exerciseRecords: [] // Initialize the exercise  Records array
        };
    },
    mounted() {
        // Fetch exercise records from the server and assign them to exerciseRecords
        // You can use an API call or any other method to retrieve the data
        // For example, using axios:
        axios.get('/api/exercise/getExercises')
            .then(response => {
                this.exerciseRecords = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
};
</script>