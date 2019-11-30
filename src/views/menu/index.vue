<template>
  <div>
    <div class="foods">
      <foods :foods="foods" />
    </div>
    <shop-cart :foods="foods" />
  </div>
</template>

<script>
import foods from './components/Foods'
import shopCart from './components/ShopCart'
import { getAllGoodsList } from '@/api/goods'
export default {
  name: 'Index',
  components: { foods, shopCart },
  data() {
    return {
      foods: []
    }
  },
  mounted() {
    this.getAllGoodsList()
  },
  methods: {
    getAllGoodsList() {
      getAllGoodsList().then(response => {
        const data = response.data
        data.forEach((item) => {
          item.goodsNum = 0
        })
        this.foods = data
      })
    }
  }
}
</script>

<style scoped>
  .foods{
    height: 840px;
    overflow-y:auto;
  }
</style>
