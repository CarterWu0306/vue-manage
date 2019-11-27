<template>
  <div>
    <div class="foods">
      <foods :foods="foods"></foods>
    </div>
    <shop-cart :foods="foods"></shop-cart>
  </div>
</template>

<script>
import foods from './components/Foods'
import shopCart from './components/ShopCart'
import { getAllGoodsList } from '@/api/goods'
export default {
    name: "index",
    components:{ foods, shopCart},
    data() {
      return {
        foods: []
      }
    },
    methods:{
        getAllGoodsList(){
            getAllGoodsList().then(response => {
                const data = response.data;
                data.forEach((item) => {
                    item.num = 0
                });
                this.foods = data
            })
        }
    },
    mounted() {
        this.getAllGoodsList()
    }
}
</script>

<style scoped>
  .foods{
    height: 840px;
    overflow-y:auto;
  }
</style>
