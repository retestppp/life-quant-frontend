<template>
    <div>
        <BarChart :labels="barLabels" :datasets="barDatasets" :options="barOptions" />
        <LineChart :labels="barLabels" :datasets="barDatasets" :options="barOptions" />
        <LineChart :labels="twoWeekLabels" :datasets="calorieDatasets" :options="barOptions" />
        <BarChart :labels="twoWeekLabels" :datasets="calorieDatasets" :options="barOptions" />
        <MixedChart :chart-data="datacollection" :options="barOptions"></MixedChart>
        <MixedChart :chart-data="caloriePerDayData" :options="options" :line-value="2000" :line-label="'Recommended Calorie'"></MixedChart>
    </div>
</template>

<script>
import BarChart from '@/components/chart/BarChartComponent.vue'
import LineChart from '@/components/chart/LineChartComponent.vue'
import MixedChart from '@/components/chart/MixedChart.vue'
    export default {
        components: {
            BarChart,
            LineChart,
            MixedChart
        },
        data() {
    return {
      caloriePerDayData: {
        datasets: [
          // {
          //   type: 'line',
          //   label: 'Line Dataset',
          //   data: [2000, 2000, 2000, 2000,2000,2000,2000],
          //   borderColor: 'rgba(75, 192, 192, 1)',
          //   borderWidth: 2,
          //   fill: false
          // },
          {
            type: 'bar',
            label: 'Bar Dataset',
            data: [1800, 2500, 2100, 1989],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ],
        labels: this.generateLast7Days()
        // labels: this.generateLast1Month()
      },
      datacollection: {
        datasets: [
          {
            type: 'line',
            label: 'Line Dataset',
            data: [10, 20, 30, 40],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
          },
          {
            type: 'bar',
            label: 'Bar Dataset',
            data: [30, 20, 10, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ],
        labels: ['January', 'February', 'March', 'April']
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      
        twoWeekLabels :  this.generateLast14Days() ,
        calorieDatasets: [{data:[1800,1900,,2000,,2500,2300,1800,1500]}],
        barLabels: [
        '2024-05-01', '2024-05-02', '2024-05-03', '2024-05-04', '2024-05-05',
        '2024-05-06', '2024-05-07', '2024-05-08', '2024-05-09', '2024-05-10',
        '2024-05-11', '2024-05-12', '2024-05-13', '2024-05-14', '2024-05-15',
        '2024-05-16', '2024-05-17', '2024-05-18', '2024-05-19', '2024-05-20',
        '2024-05-21', '2024-05-22', '2024-05-23', '2024-05-24', '2024-05-25',
        '2024-05-26', '2024-05-27', '2024-05-28', '2024-05-29', '2024-05-30',
        '2024-05-31'
      ],
      barDatasets: [
        {
                    label: "밴치프레스 - 세트",
                    data: [3, 4, 3],
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1
                },
                {
                    label: "밴치프레스 - 횟수",
                    data: [15, 12, 10],
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                },
                {
                    label: "밴치프레스 - 중량",
                    data: [10, 20, 15],
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                },
      ],
      barOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Calories'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    }
  },
  methods: {
    generateLast14Days() {
      const dates = [];
      for (let i = 13; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    },
    generateLast7Days() {
      const dates = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    },
    generateLast1Month() {
      const dates = [];
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    }
  },
    }
</script>

<style scoped>

</style>