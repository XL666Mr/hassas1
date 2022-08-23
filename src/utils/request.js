import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})
function isTimeOut() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 60 * 60 * 2 * 1000
  return currentTime - tokenTime > timeout
}
//请求拦截器
service.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    if (isTimeOut()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers['Authorization'] = 'Bearer ' + store.state.user.token
    }
  }
  return config
})
//响应拦截器
service.interceptors.response.use(
  (res) => {
    const { data, success, message } = res.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  async (error) => {
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
