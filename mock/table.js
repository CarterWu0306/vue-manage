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
    "productName": "特色烤鸭",
    "productLabel": "招牌菜",
    "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
    "productPrice": "20",
    "productDetail": "测试商品详细介绍",
    "productCreateTime": "2019-09-07",
    "productStatus": "已上架",
  },
    {
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已上架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已上架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已下架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已上架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已下架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已上架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已上架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已上架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已下架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已上架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已上架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已上架",
    },{
      "productName": "特色烤鸭",
      "productLabel": "招牌菜",
      "img": "https://aip.bdstatic.com/portal/dist/1566472164929/ai_images/technology/imagerecognition/dish/demo/1.jpg",
      "productPrice": "20",
      "productDetail": "测试商品详细介绍",
      "productCreateTime": "2019-09-07",
      "productStatus": "已上架",
    }]
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
  }
]
