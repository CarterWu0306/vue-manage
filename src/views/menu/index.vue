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
export default {
  name: "index",
  components:{ foods, shopCart},
  data() {
    return {
      foods:[
        {
          id: 0,
          name: "汉堡",
          num: 0,
          price: 18
        },
        {
          id: 1,
          name: "可乐",
          num: 0,
          price: 18
        },{
          id: 2,
          name: "汉堡",
          num: 0,
          price: 18
        },
        {
          id: 3,
          name: "可乐",
          num: 0,
          price: 18
        },{
          id: 4,
          name: "汉堡",
          num: 0,
          price: 18
        },
        {
          id: 5,
          name: "可乐",
          num: 0,
          price: 18
        },{
          id: 6,
          name: "汉堡",
          num: 0,
          price: 18
        },
        {
          id: 7,
          name: "可乐",
          num: 0,
          price: 18
        },{
          id: 8,
          name: "汉堡",
          num: 0,
          price: 18
        },
        {
          id: 9,
          name: "可乐",
          num: 0,
          price: 18
        },{
          id: 10,
          name: "汉堡",
          num: 0,
          price: 18
        },
        {
          id: 11,
          name: "可乐",
          num: 0,
          price: 18
        },{
          id: 12,
          name: "汉堡",
          num: 0,
          price: 18
        },
        {
          id: 13,
          name: "可乐",
          num: 0,
          price: 18
        },{
          id: 14,
          name: "汉堡",
          num: 0,
          price: 18
        },
        {
          id: 15,
          name: "可乐",
          num: 0,
          price: 18
        },{
          id: 16,
          name: "汉堡",
          num: 0,
          price: 18
        },
        {
          id: 17,
          name: "可乐",
          num: 0,
          price: 18
        },{
          id: 18,
          name: "汉堡",
          num: 0,
          price: 18
        },
        {
          id: 19,
          name: "可乐",
          num: 0,
          price: 18
        }
      ]
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
