import request from '@/utils/request'

export function sumOrder() {
  return request({
    url: '/food-order/order/sumOrder',
    method: 'get'
  })
}

export function sumSales() {
  return request({
    url: '/food-order/order/sumSales',
    method: 'get'
  })
}

export function sumNewUser() {
  return request({
    url: '/food-user/user/sumNewUser',
    method: 'get'
  })
}

export function sumGoods() {
  return request({
    url: '/food-goods/goods/sumGoods',
    method: 'get'
  })
}

export function sumSalesLatestWeek() {
  return request({
    url: '/food-order/order/sumSalesLatestWeek',
    method: 'get'
  })
}

export function sumFlowTime() {
  return request({
    url: '/food-order/order/sumFlowTime',
    method: 'get'
  })
}
