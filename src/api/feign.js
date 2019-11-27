import request from '@/utils/request'

export function placeOrderByAdmin(data) {
  return request({
    url: '/food-feign/placeOrder/placeOrderByAdmin',
    method: 'post',
    data
  })
}
