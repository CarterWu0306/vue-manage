import Mock from 'mockjs'

/*const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})*/
const data = {
  "items": [{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "0",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "0",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  },{
    "goodsName": "特色烤鸭",
    "goodsLabel": "招牌菜",
    "goodsImg": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "goodsPrice": "20",
    "goodsDesc": "测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍测试商品详细介绍",
    "saleTime": "2019-09-07",
    "goodsStatus": "1",
    "goodsStock": 132,
    "saleNum": 66
  }]
}

const orderData = {
  "items": [
    {
      "orderSn": "550E8400-E29B-11D4-A716-446655440000",
      "userId": "10000001",
      "userName": "章潇裕",
      "orderDetails": [
        {
          "goodsName": "特色烤鸭",
          "goodsNum": 2
        },
        {
          "goodsName": "酸菜鱼",
          "goodsNum": 3
        }
      ],
      "totalMoney": 100,
      "realTotalMoney": 80,
      "orderRemarks": "",
      "orderStatus": "1",
      "payStatus": "1",
      "isRefund": "0",
      "isAppraise": "1",
      "orderScore": 100,
      "orderCreateTime": "2019-9-9",
      "orderPayTime": "2019-9-9"
    }
  ]
}

export default [
  {
    url: '/table/list',
    type: 'get',
    response: () => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/table/getOrderList',
    type: 'get',
    response: () => {
      const items = orderData.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/table/uploadGoodsImg',
    type: 'post',
    response: () => {
      return {
        code: 20000
      }
    }
  }
]
