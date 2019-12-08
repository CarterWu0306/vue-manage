<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { sumSalesLatestWeek } from '@/api/home'

const animationDuration = 3600

export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '283px'
      }
    },
    data() {
      return {
        chart: null,
        chartData: [0, 0, 0, 0, 0, 0, 0]
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
        sumSalesLatestWeek(){
            sumSalesLatestWeek().then(response => {
                const data = response.data;
                data.forEach(item =>{
                    const index = item.dayOfWeek;
                    this.chartData[index-1] = item.sum;
                });
                this.initChart();
            }).catch(() => {
            })
        },
        initChart() {
          this.chart = echarts.init(this.$el, 'macarons')

          this.chart.setOption({
            title: {
              text: '本周销售额',
              x: 'right',
              textStyle: {
                fontSize: 20,
                fontWeight: 'bolder',
                color: '#f4516c'
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              top: 10,
              left: '2%',
              right: '2%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
              axisTick: {
                alignWithLabel: true
              }
            }],
            yAxis: [{
              type: 'value',
              minInterval: 1,
              axisTick: {
                show: false
              }
            }],
            series: [{
              name: '销售额',
              type: 'bar',
              color: '#f4516c',
              stack: 'vistors',
              barWidth: '60%',
              data: this.chartData,
              animationDuration
            }]
          })
        }
    },
    mounted() {
        this.sumSalesLatestWeek();
        /*this.$nextTick(() => {
            this.initChart()
        })*/
    },
}
</script>
