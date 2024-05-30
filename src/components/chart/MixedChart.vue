<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Chart as ChartJS } from 'chart.js';

export default {
  name: 'MixedChart',
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    },
    lineValue: {
      type: Number,
      required: true
    },
    lineLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  watch: {
    chartData: {
      handler(newData) {
        if (this.chartInstance) {
          this.chartInstance.data = newData;
          this.chartInstance.update();
        }
      },
      deep: true
    }
  },
  mounted() {

    const drawLinePlugin = {
      id: 'drawLine',
      afterDatasetsDraw: (chart) => {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const yScale = chart.scales['y'];

        const yValue = yScale.getPixelForValue(this.lineValue);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(chartArea.left, yValue);
        ctx.lineTo(chartArea.right, yValue);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'green';
        ctx.stroke();

        if (this.lineLabel) {
          ctx.font = '12px Arial';
          ctx.fillStyle = 'green';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText(this.lineLabel, (chartArea.left + chartArea.right) / 2, yValue - 5);
        }


        ctx.restore();
      }
    };


    this.chartInstance = new ChartJS(this.$refs.canvas, {
      type: 'bar',
      data: this.chartData,
      options: this.options,
      plugins: [drawLinePlugin]
    });
  }
};
</script>
