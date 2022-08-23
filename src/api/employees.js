import request from '@/utils/request'

export function getEmployees() {
  return request({
    url: '/sys/user/simple'
  })
}

export function getEmployeesInfoApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}

export function delEmployees(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'DELETE'
  })
}
// 新增员工
export function addEmployeesApi(data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}
// 批量导入员工

export function batchAddEmployeesApi(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
// 读取用户详情的基础信息
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
// 更新用户详情的基础信息
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

// 获取员工岗位信息
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}
