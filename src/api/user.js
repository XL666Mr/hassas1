import request from '@/utils/request'
// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 获取用户基本信息
export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
// 获取用户其他全部信息
export function getOtherInfo(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'GET'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
export function updateUserInfo(data) {
  return request({
    url: '/sys/user/' + data.id,
    method: 'PUT',
    data
  })
}

/** *
 * 给用户分配角色
 * ***/
export function assignRoles(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
