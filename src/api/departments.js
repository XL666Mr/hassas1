import request from '@/utils/request'
// 查询企业的部门列表
export function getDeptsApi() {
  return request({
    url: '/company/department'
  })
}

// 根据ID删除部门
export function delDeptsApi(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

// 新增部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 根据ID查询部门详情
export function getDepartment(id) {
  return request({
    url: '/company/department/' + id
  })
}

// 根据ID查询部门详情
export function editDepartment(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data
  })
}
