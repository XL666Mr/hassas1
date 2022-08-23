import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTokenTime() {
  Cookies.set('tokenTime', Date.now())
}
export function getTokenTime() {
  return Cookies.get('tokenTime')
}

export function setTokenActive(activeName) {
  Cookies.set('activeName', activeName)
}
export function getTokenActive() {
  return Cookies.get('activeName')
}
