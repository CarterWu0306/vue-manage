<template>
  <div class="shop-cart">
    <div class="content" @click="handleCreate">
      <div class="shop-cart-div">
        <div class="logo">
          <svg-icon icon-class="shopCart" class="shop-cart-icon" />
        </div>
        <div v-show="totalCount>0" class="num">{{ totalCount }}</div>
      </div>
      <div class="price">￥{{ totalPrice }}</div>
      <div class="pay">
        <el-button type="primary" class="pay-button" @click="handleCreate">结算</el-button>
      </div>
    </div>

    <el-dialog
      width="25%"
      title="结算"
      :visible.sync="dialogFormVisible"
    >
      <div class="dialog">
        <span v-show="!selectedFoods.length>0" class="shop-cart-empty">当前购物车为空</span>
        <div v-for="(food,index) in foods" :key="food.goodsId" class="label">
          <span v-show="food.num" class="food-name">{{ food.goodsName }}</span>
          <div v-show="food.num" style="float: right">
            <span class="food-price">￥{{ food.goodsPrice * food.num }}</span>
            <svg-icon icon-class="decrease" class="button" @click="decreaseFood(index)" />
            <span class="button-count">{{ food.num }}</span>
            <svg-icon icon-class="add" class="button" @click="addFood(index)" />
          </div>
        </div>
      </div>
      <div v-show="selectedFoods.length>0" class="shop-cart-price">小计￥{{ totalPrice }}元</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="backContinue">继续点餐</el-button>
        <el-button type="info" @click="empty">清空</el-button>
        <el-button type="primary" :loading="loading" @click="placeOrder">下单</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { placeOrderByAdmin } from '@/api/feign'
export default {
  name: 'ShopCart',
  props: {
    foods: Array
  },
  data() {
    return {
      selectedFoods: [],
      fold: true,
      orderForm: {
        userId: '',
        totalMoney: 0.00,
        realTotalMoney: 0.00,
        deductionScore: 0,
        goodsList: []
      },
      loading: false,
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  computed: {
    totalCount() {
      let count = 0
      this.foods.forEach((food) => {
        count += food.num
      })
      return count
    },
    totalPrice() {
      let price = 0
      this.foods.forEach((food) => {
        if (food.num) {
          price += food.goodsPrice * food.num
        }
      })
      if (price === 0) {
        this.selectedFoods = []
      }
      return price
    }
  },
  methods: {
    handleCreate() {
      this.selected()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.orderForm = {
        userId: this.$store.getters.userId,
        totalMoney: this.totalCount().toFixed(2),
        realTotalMoney: this.totalCount().toFixed(2),
        deductionScore: 0,
        goodsList: this.selectedFoods
      }
    },
    selected() {
      this.selectedFoods = []
      this.foods.forEach((food) => {
        if (food.num) {
          this.selectedFoods.push(food)
        }
      })
    },
    addFood(index) {
      this.foods[index].num++
    },
    decreaseFood(index) {
      if (this.foods[index].num > 0) {
        this.foods[index].num--
      }
    },
    backContinue() {
      this.dialogFormVisible = false
    },
    empty() {
      this.selectedFoods = []
      this.foods.forEach((food) => {
        food.num = 0
      })
    },
    placeOrder() {
      this.loading = true
      placeOrderByAdmin(this.orderForm).then(response => {
        this.loading = false
        this.dialogFormVisible = false
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch(() => {
        this.loading = false
      })
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
          user-select: none;
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
        user-select: none;
        display: inline-block;
        color: #fff;
        margin-top: 15px;
        font-size: 40px;
        font-weight: 700;
      }
      .pay{
        user-select: none;
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
        user-select: none;
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
    .shop-cart-price{
      user-select: none;
      font-size: 24px;
      font-weight: 700;
      color: #3888fa;
      float: right;
    }
  }
</style>
