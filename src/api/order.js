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

export function completeOrder(data) {
  return request({
    url: '/food-order/order/completeOrder',
    method: 'post',
    data
  })
}

export function deleteOrder(param) {
  return request({
    url: '/food-order/order/deleteOrder',
    method: 'get',
    param
  })
}
