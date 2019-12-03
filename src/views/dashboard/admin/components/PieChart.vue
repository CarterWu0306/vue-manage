<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { sumFlowTime } from '@/api/home'

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
            chartData: [
                { value: 0, name: '早餐' },
                { value: 0, name: '午餐' },
                { value: 0, name: '下午茶' },
                { value: 0, name: '晚餐' },
                { value: 0, name: '宵夜' }
            ]
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
        sumFlowTime() {
            sumFlowTime().then(response => {
                const data = response.data;
                console.log(data)
                data.forEach(item =>{
                    if (item.hourOfDay>=5&&item.hourOfDay<=9){
                        this.chartData[0].value = item.sum;
                    }else if (item.hourOfDay>=10&&item.hourOfDay<=13){
                        this.chartData[1].value = item.sum;
                    }else if (item.hourOfDay>=14&&item.hourOfDay<=16){
                        this.chartData[2].value = item.sum;
                    }else if (item.hourOfDay>=17&&item.hourOfDay<=21){
                        this.chartData[3].value = item.sum;
                    }else{
                        this.chartData[4].value = item.sum;
                    }
                });
                this.initChart()
            }).catch(() => {
            })
        },
        initChart() {
          this.chart = echarts.init(this.$el, 'macarons')

          this.chart.setOption({
            title: {
              text: '客流量时段',
              x: 'right',
              textStyle: {
                fontSize: 20,
                fontWeight: 'bolder',
                color: '#f4516c'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              left: 'center',
              bottom: '10',
              data: ['早餐', '午餐', '下午茶', '晚餐', '宵夜']
            },
            series: [
              {
                name: '客流量',
                type: 'pie',
                roseType: 'radius',
                radius: [15, 95],
                center: ['50%', '42%'],
                data: this.chartData,
                animationEasing: 'cubicInOut',
                animationDuration: 2600
              }
            ]
          })
        }
    },
    mounted() {
        this.sumFlowTime()
    }
}
</script>
