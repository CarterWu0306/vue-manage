<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

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

const lineChartData = {
  orders: {
    title: "历史订单量",
    lineChatColor: "#3888fa",
    actualData: [280, 160, 151, 106, 145, 150, 120, 82, 91, 154, 162, 140]
  },
  sales: {
    title: "历史销售额",
    lineChatColor: "#f55e77",
    actualData: [120, 90, 100, 138, 142, 130, 120, 82, 91, 154, 162, 140]
  },
  customers: {
    title: "新增顾客数",
    lineChatColor: "#34bfa3",
    actualData: [120, 82, 91, 154, 162, 140, 120, 82, 91, 154, 162, 140]
  },
  goods: {
    title: "历史商品量",
    lineChatColor: "#ffb980",
    actualData: [120, 82, 91, 154, 162, 140, 120, 82, 91, 154, 162, 140]
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
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
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
