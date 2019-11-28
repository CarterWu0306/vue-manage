import request from '@/utils/request'

export function getOrderList(params) {
  return request({
    url: '/food-order/order/getOrderList',
    method: 'get',
    params
  })
}

export function getAllOrders() {
  return request({
    url: '/food-order/order/getAllOrders',
    method: 'get'
  })
}
