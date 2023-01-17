import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    //打开默认看到布局页
    path:'/' ,
    component:()=>import('@/views/layout/index')
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

export default router
