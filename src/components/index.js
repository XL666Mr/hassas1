import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/Uploading'
import Calendar from '@/components/Calendar'
import FullScreen from '@/components/FullScreen'
import Togglelang from '@/components/Togglelang'
import TagsView from '@/components/TagsView'
// console.log(PageTools) //打印出来是个对象，在index.vue里面添加name属性，log打印对象里面也有对象属性
const components = [
  PageTools,
  UploadExcel,
  UploadImg,
  Calendar,
  FullScreen,
  Togglelang,
  TagsView
]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
