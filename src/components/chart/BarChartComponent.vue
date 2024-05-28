<template>
  
  <Bar :data="data" :options="options" />
</template>

<script>
import { Bar } from 'vue-chartjs';


export default {
  name: 'BarChart',
  data() {
    return {
      data: {
        labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  components: {
    Bar
  },
  mounted() {
    // this.updateChartData();
    // setInterval(this.updateChartData, 3000);
  },
  methods: {
    // updateChartData() {
    //   this.data = chartConfig.randomData();
    // }
  }
};
</script>