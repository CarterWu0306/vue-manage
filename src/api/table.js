import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getOrderList(params) {
  return request({
    url: '/table/getOrderList',
    method: 'get',
    params
  })
}

