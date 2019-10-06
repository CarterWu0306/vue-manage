<template>
  <div class="shop-cart">
    <div class="content" @click="handleCreate">
      <div class="shop-cart-div">
        <div class="logo">
          <svg-icon iconClass="shopCart" class="shop-cart-icon"></svg-icon>
        </div>
        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
      </div>
      <div class="price">￥{{totalPrice}}</div>
      <div class="pay">
        <el-button type="primary" class="pay-button" @click="handleCreate">结算</el-button>
      </div>
    </div>
    <el-dialog
      width="25%"
      title="购物车"
      :visible.sync="dialogFormVisible">
      <div class="dialog">
        <span class="shop-cart-empty" v-show="!selectedFoods.length>0">当前购物车为空</span>
        <div class="label" v-for="(food,index) in foods" :key="food.id">
          <span class="food-name" v-show="food.num">{{ food.name }}</span>
          <div style="float: right" v-show="food.num">
            <span class="food-price">￥{{ food.price * food.num }}</span>
            <svg-icon iconClass="decrease" class="button" @click="decreaseFood(index)"></svg-icon>
            <span class="button-count">{{ food.num }}</span>
            <svg-icon iconClass="add" class="button" @click="addFood(index)"></svg-icon>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="backContinue">继续点餐</el-button>
        <el-button type="info" @click="empty">清空</el-button>
        <el-button type="primary">下单</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ShopCart",
  props: {
    foods: Array
  },
  data() {
    return {
      selectedFoods: [],
      fold: true,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  computed: {
    totalCount() {
      let count = 0;
      this.foods.forEach((food) => {
        count += food.num;
      });
      return count;
    },
    totalPrice() {
      let price = 0;
      this.foods.forEach((food) => {
        if (food.num) {
          price += food.price * food.num;
        }
      });
      return price;
    }
  },
  methods: {
    handleCreate () {
      this.selected();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    selected() {
      this.selectedFoods = [];
      this.foods.forEach((food) =>{
        if (food.num){
          this.selectedFoods.push(food)
        }
      })
    },
    addFood(index) {
      this.foods[index].num++
    },
    decreaseFood(index) {
      if (this.foods[index].num>0){
        this.foods[index].num--
      }
    },
    backContinue() {
      this.dialogFormVisible = false
    },
    empty() {
      this.selectedFoods = [];
      this.foods.forEach((food) => {
        food.num = 0
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop-cart{
    .content{
      background-color: #141d27;
      height: 79px;
      .shop-cart-div {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -20px;
        margin: 0 12px;
        padding: 8px;
        width: 99px;
        height: 99px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #20A0FF;

          .shop-cart-icon {
            font-size: 60px;
            margin-top: 10px;
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 20px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price{
        display: inline-block;
        color: #fff;
        margin-top: 15px;
        font-size: 40px;
        font-weight: 700;
      }
      .pay{
        float: right;
        width: 200px;
        height: 79px;
        text-align: center;
        line-height: 79px;
        .pay-button{
          width: 200px;
          height: 79px;
          font-size: 40px;
          font-weight: 700;
        }
      }
    }
    .dialog{
      max-height: 300px;
      overflow-y:auto;
      .shop-cart-empty{
        color: rgba(0, 0, 0, 0.31);
        display: flex;
        justify-content: center;
        font-size: 20px;
        line-height: 40px;
      }
      .label{
        .food-name{
          font-size: 24px;
          font-weight: 600;
          line-height: 40px;
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
          font-size: 24px;
        }
      }
    }
  }
</style>
