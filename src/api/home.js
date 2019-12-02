import request from '@/utils/request'

export function sumNewUser() {
  return request({
    url: '/food-user/user/sumNewUser',
    method: 'get'
  })
}
