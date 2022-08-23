import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import * as filters from '@/filters'
import * as directives from '@/directives'
import components from '@/components'
import Print from 'vue-print-nb'
import i18n from '@/i18n'
// 注册全屏组件
Vue.use(Print)

// 组件的统一注册
Vue.use(components)

// 过滤器的统一注册
for (let key in filters) {
  Vue.filter(key, filters[key])
}
// 自定义指令的统一注册
for (let key in directives) {
  Vue.directive(key, directives[key])
}

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
