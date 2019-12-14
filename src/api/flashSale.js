import request from '@/utils/request'

export function getFlashSaleList(params) {
  return request({
    url: '/food-flashsale/flashSale/getFlashSaleList',
    method: 'get',
    params
  })
}

export function addFlashSale(data) {
  return request({
    url: '/food-flashsale/flashSale/addFlashSale',
    method: 'post',
    data
  })
}

export function deleteFlashSale(params) {
  return request({
    url: '/food-flashsale/flashSale/deleteFlashSale',
    method: 'get',
    params
  })
}
