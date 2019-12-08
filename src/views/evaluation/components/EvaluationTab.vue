<template>
  <div class="container">
    <div class="text item">
      评价详情
    </div>
    <div class="evaluation-tabs">
      <el-tabs v-model="tabType" style="margin-top:15px;" class="el-tabs">
        <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
          <evaluation-detail :tabType="item.key"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import EvaluationDetail from './EvaluationDetail'
export default {
  name: "EvaluationTab",
  components: {EvaluationDetail},
  data() {
    return {
      tabMapOptions: [
          { label: '未回复评价', key: 'NoReplyEvaluation' },
          { label: '全部评价', key: 'AllEvaluation' }
      ],
      tabType: 'NoReplyEvaluation',
    }
  }
}
</script>

<style scoped>

  .text {
    font-size: 20px;
    font-weight: bolder;
  }

  .item {
    padding: 18px 0;
  }

  .container{
    margin: 30px;
  }
</style>

<style lang="scss">
  .evaluation-tabs{
    .el-tabs{
      background-color: #ffffff;
      font-size: 20px;
    }
    .el-tabs__item {
      font-size: 16px;
    }
    .el-tabs__active-bar {
      height: 4px;
    }
  }
</style>
