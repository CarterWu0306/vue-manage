import request from '@/utils/request'

export function sumEvaluation() {
  return request({
    url: '/food-evaluation/evaluation/sumEvaluation',
    method: 'get'
  })
}

export function getEvaluationList(param) {
  return request({
    url: '/food-evaluation/evaluation/getEvaluationList',
    method: 'get',
    param
  })
}
