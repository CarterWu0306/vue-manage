<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" :groupData="groupData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chartData="lineChartData" :chartColor="lineChartData.lineChatColor" :chartTitle="lineChartData.title"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import BoxCard from './components/BoxCard'
import { sumOrder, sumSales, sumNewUser, sumGoods } from '@/api/home'

const lineChartData = {
  orders: {
    title: "新增订单量",
    lineChatColor: "#3888fa",
    actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    total: 0
  },
  sales: {
    title: "历史销售额",
    lineChatColor: "#f55e77",
    actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    total: 0
  },
  customers: {
    title: "新增顾客数",
    lineChatColor: "#34bfa3",
    actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    total: 0
  },
  goods: {
    title: "历史商品量",
    lineChatColor: "#ffb980",
    actualData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    total: 0
  }
}

export default {
    name: 'DashboardAdmin',
    components: {
        GithubCorner,
        PanelGroup,
        LineChart,
        RaddarChart,
        PieChart,
        BarChart,
        BoxCard
    },
    data() {
        return {
           lineChartData: lineChartData.orders,
           groupData: lineChartData
        }
    },
    methods: {
        handleSetLineChartData(type) {
            this.lineChartData = lineChartData[type]
        },
        sumOrder() {
            sumOrder().then(response => {
                const data = response.data;
                data.forEach(item =>{
                    const index = item.month;
                    lineChartData.orders.actualData[index-1] = item.sum;
                    lineChartData.orders.total += item.sum;
                })
            }).catch(() => {
            })
        },
        sumSales() {
            sumSales().then(response => {
                const data = response.data;
                data.forEach(item =>{
                    const index = item.month;
                    lineChartData.sales.actualData[index-1] = item.sum;
                    lineChartData.sales.total += item.sum;
                })
            }).catch(() => {
            })
        },
        sumNewUser() {
            sumNewUser().then(response => {
                const data = response.data;
                data.forEach(item =>{
                    const index = item.month;
                    lineChartData.customers.actualData[index-1] = item.sum;
                    lineChartData.customers.total += item.sum;
                })
            }).catch(() => {
            })
        },
        sumGoods() {
            sumGoods().then(response =>{
                const data = response.data;
                var nowYear = (new Date()).getFullYear();
                var nowMonth = (new Date()).getMonth();
                for (var i=0;i<12;i++){
                    data.forEach(item =>{
                        if (item.year<=nowYear&&item.month<=i+1){
                            lineChartData.goods.actualData[i] += item.sum;
                        }
                    })
                }
                lineChartData.goods.total = lineChartData.goods.actualData[11];
            }).catch(() => {
            })
        }
    },
    mounted() {
        this.sumSales();
        this.sumOrder();
        this.sumNewUser();
        this.sumGoods();
    }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px 32px 0px 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
