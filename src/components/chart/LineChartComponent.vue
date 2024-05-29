<template>
    <div>
      <Line :data="chartData" :options="options" />
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  
  
  export default {
    name: 'LineChart',
    components: {
      Line
    },
    props: {
      labels: {
        type: Array,
        required: true
      },
      datasets: {
        type: Array,
        required: true
      },
      options: {
        type: Object,
        required: false,
        default: () => ({
          responsive: true,
          maintainAspectRatio: false
        })
      }
    },
    computed: {
      chartData() {
        return {
          labels: this.labels,
          datasets: this.datasets
        }
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  