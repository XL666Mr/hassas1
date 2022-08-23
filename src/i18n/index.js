import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './message/en'
import zh from './message/zh'
import Cookie from 'js-cookie'

Vue.use(VueI18n)
export const messages = {
  en,
  zh
}
const i18n = new VueI18n({
  locale: Cookie.get('lang') || 'zh',
  messages
})
console.log(i18n)
export default i18n
