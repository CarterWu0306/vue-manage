import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/food-goods/goods/selGoodsList',
    method: 'get',
    params
  })
}

export function getAllGoodsList() {
  return request({
    url: '/food-goods/goods/selAllGoodsList',
    method: 'get'
  })
}

export function addGoods(data) {
  return request({
    url: '/food-goods/goods/addGoods',
    method: 'post',
    data
  })
}

export function updateGoods(data) {
  return request({
    url: '/food-goods/goods/updateGoods',
    method: 'post',
    data
  })
}

export function changeGoodsStatus(data) {
  return request({
    url: '/food-goods/goods/changeGoodsStatus',
    method: 'post',
    data
  })
}

export function deleteGoods(params) {
  return request({
    url: '/food-goods/goods/deleteGoods',
    method: 'get',
    params
  })
}
