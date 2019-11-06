import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/goods/selGoodsList',
    method: 'get',
    params
  })
}

export function addGoods(data) {
  return request({
    url: '/goods/addGoods',
    method: 'post',
    data
  })
}

export function updateGoods(data) {
  return request({
    url: '/goods/updateGoods',
    method: 'post',
    data
  })
}

export function changeGoodsStatus(data) {
  return request({
    url: '/goods/changeGoodsStatus',
    method: 'post',
    data
  })
}

export function deleteGoods(params) {
  return request({
    url: '/goods/deleteGoods',
    method: 'get',
    params
  })
}
