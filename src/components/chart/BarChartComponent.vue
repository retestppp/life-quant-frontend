<template>
  <div>
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'


export default {
  name: 'BarChart',
  components: {
    Bar
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
