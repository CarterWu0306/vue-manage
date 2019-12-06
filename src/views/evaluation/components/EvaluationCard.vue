<template>
  <div class="container">
    <el-card class="box-card">
      <div class="text item">
        店铺评分
      </div>
      <div class="score">
        {{value.toFixed(1)}}
      </div>
      <div class="star" >
        <el-rate
          v-model="value"
          disabled
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
        <div style="font-size: 14px;margin-top: 6px">
          共{{evaluationNumber}}条评价
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
    import { sumEvaluation } from '@/api/evaluation'
    export default {
        name: "EvaluationCard",
        data() {
            return {
                value: 5.0,
                evaluationNumber: 0
            }
        },
        methods: {
            sumEvaluation(){
                sumEvaluation().then(response => {
                    const data = response.data;
                    this.value = data.avgScore;
                    this.evaluationNumber = data.total;
                }).catch()
            }
        },
        mounted() {
            this.sumEvaluation();
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

  .box-card {
    width: 100%;
    height: 170px;
  }

  .container{
    margin: 30px;
  }

  .score{
    font-size: 50px;
    color: #ff9900;
    float: left;
    margin-right: 20px;
  }

  .star{
    float: left;
    margin-top: 5px;
  }
</style>

<style>
  .el-rate__icon {
    font-size: 25px;
  }
</style>
