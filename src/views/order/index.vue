<template>
  <div class="order-tabs">
    <el-tabs v-model="tabType" style="margin-top:15px;" class="el-tabs">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.id" :label="item.label" :name="item.key">
        <tab-order :tabType="item.key"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import tabOrder from './components/TabOrder'

export default {
  name: "index",
  components: { tabOrder },
  data() {
    return {
      tabMapOptions: [
          {
              id: 1,
              label: '待处理订单',
              key: 'PendingOrders'
          },
          {
              id: 2,
              label: '所有订单',
              key: 'AllOrders'
          }
      ],
      tabType: 'PendingOrders'
    }
  }
}
</script>

<style lang="scss">
  .order-tabs{
    .el-tabs{
      background-color: #ffffff;
      font-size: 20px;
    }
    .el-tabs__nav-scroll {
      padding-left: 40px;
    }
    .el-tabs__item {
      font-size: 16px;
    }
    .el-tabs__active-bar {
      height: 4px;
    }
    .el-tabs__nav-wrap::after {
      background-color:#ffffff;
    }
  }
</style>
