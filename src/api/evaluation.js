import request from '@/utils/request'

export function sumEvaluation() {
  return request({
    url: '/food-evaluation/evaluation/sumEvaluation',
    method: 'get'
  })
}

