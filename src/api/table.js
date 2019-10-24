import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/table/list',
    method: 'get',
    data
  })
}

export function addGoods(data) {
  return request({
    url: '/goods/addGoods',
    method: 'post',
    data
  })
}

export function getOrderList(data) {
  return request({
    url: '/table/getOrderList',
    method: 'get',
    data
  })
}

