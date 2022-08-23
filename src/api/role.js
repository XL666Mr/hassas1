import request from '@/utils/request'

// 获取角色列表
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}
// 新增角色
export function addRolesApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

// 根据id获取角色详情
export function getRolesInfoApi(id) {
  return request({
    url: '/sys/role/' + id
  })
}

// 分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
