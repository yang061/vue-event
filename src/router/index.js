import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)
const routes = [
  {
    //打开默认看到布局页
    path: '/',
    component: () => import('@/views/layout/index')
  },
  {
    // 注册的路由配置
    path: '/reg',
    /* webpack提供import函数来路由懒加载导入组件
    路由懒加载，就是页面路由路径切换到/reg ，才去加载对应组件代码
      好处：让首页加载文件体积更小，打开更快
    */
    component: () => import('@/views/register/index')
  },
  {
    // 登录的路由配置
    path: '/login',
    // 文件夹默认找index
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token && !store.state.userInfo.username) {
    // 本地有token,并且state里面的userInfo.username不为空，才去请求用户信息，避免重复请求
    store.dispatch('getUserInfoAction')
  }
  next()
})

export default router

// 退出登录，重新登录，只走相关组件的代码（异步dom切换，不会导致所有代码重新执行，app.vue,不执行第二次
// 效果不对，换个效果应该重新请求用户数据
/* 解决：
1.可以在登录页面，登录成功后再发请求去拿到用户信息
2.可以在全局前置路由守卫中，在（路由跳转的时候，判断+获取）
*/
