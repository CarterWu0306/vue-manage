import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/food-user/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/food-user/user/info',
    method: 'get'
  })
}

/*export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}*/

export function logout() {
  return request({
    url: '/food-user/user/logout',
    method: 'post'
  })
}

export function getUserList(params) {
  return request({
    url: '/food-user/user/getUserList',
    method: 'get',
    params
  })
}
