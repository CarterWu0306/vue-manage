<template>
  <el-row>
    <el-col :span="6" style="padding: 20px 30px 20px 30px;" v-for="(food,index) in foods" :key="food.id">
      <el-card class="card" :body-style="{ padding: '0px' }">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
        <div class="label">
          <span class="food-name">{{food.name}}</span>
          <span class="food-price">￥{{food.price}}/份</span>
          <div style="float: right">
            <svg-icon iconClass="decrease" class="button" @click="decreaseFood(index)"></svg-icon>
            <span class="button-count">{{food.num}}</span>
            <svg-icon iconClass="add" class="button" @click="addFood(index)"></svg-icon>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Foods",
  props: {
    foods: Array
  },
  methods:{
    addFood(index) {
      this.foods[index].num++
    },
    decreaseFood(index) {
      if (this.foods[index].num>0){
        this.foods[index].num--
      }
    }
  }
}
</script>

<style scoped>
  .card{
    border-radius: 10%;
  }
  .image {
    width: 360px;
    height: 320px;
    display: block;
    overflow:hidden;
  }
  .label{
    padding: 10px 20px 20px 15px;
  }
  .food-name{
    font-size: 24px;
    font-weight: 600;
  }
  .food-price{
    font-size: 24px;
    font-weight: 700;
    color: #ffb980;
  }
  .button {
    font-size: 30px;
  }
  .button-count {
    font-size: 25px;
  }
</style>
