import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.less'
// 让elementUI注册的代码参与打包,才能在页面上运行并注册组件
import '@/elementUI/index'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入dayjs
import dayjs from 'dayjs'
// 在原型上定义一个方法格式化时间
Vue.prototype.$formatDate = (dateObj) => {
  // hh:mm:ss 12小时制，分上午和下午 HH:mm:ss 24小时制
  return dayjs(dateObj).format('YYYY-MM-DD HH:mm:ss')
}

// 全局注册富文本编辑器
Vue.use(VueQuillEditor) //给vc注册一个quillEditor的全局组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
