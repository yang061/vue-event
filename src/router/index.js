import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)
const routes = [
  {
    //打开默认看到布局页
    path: '/', //网页打开第一次就是'/'
    redirect: '/home',
    component: () => import('@/views/layout/index'),
    children: [{
      // 侧边栏导航，点击会切换路由地址，路由地址靠数据请求铺设回来的
      // 所以路由规则要配合它保持一致
      // 主页的路由
      path: 'home',
      component: () => import('@/views/home')
    },
    {
      // 个人中心->基本资料
      path: 'user-info',
      component: () => import('@/views/user/userInfo')
    },
    {
      // 个人中心->用户头像
      path: 'user-avatar',
      component: () => import('@/views/user/userAvatar')
    },
    {
      // 个人中心->重置密码
      path: 'user-pwd',
      component: () => import('@/views/user/userPwd')
    }, {
      // 文章管理->文章分类
      path: 'art-cate',
      component: () => import('@/views/article/artCate.vue')
    },
    {
      // 文章管理->文章列表
      path: 'art-list',
      component: () => import('@/views/article/artList.vue')
    }
    ]
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
  },

]

const router = new VueRouter({
  routes
})

// 准备白名单
const whiteList = ['/reg', '/login']

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 登录了
    if (!store.state.userInfo.username) {
      // 本地有token,并且state里面的userInfo.username不为空，才去请求用户信息，避免重复请求
      // 调用actions里方法请求数据
      store.dispatch('getUserInfoAction')
    }
    next() //路由放行
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      // 未登录，是白名单的路由地址，则放行(前置路由守卫不会再触发了，而是再去匹配路由表，让组件挂载)
      next()
    } else {
      // 强制跳转登录页
      next('/login')
    }
  }
})

export default router

// 退出登录，重新登录，只走相关组件的代码（异步dom切换，不会导致所有代码重新执行，app.vue,不执行第二次
// 效果不对，换个效果应该重新请求用户数据
/* 解决：
1.可以在登录页面，登录成功后再发请求去拿到用户信息
2.可以在全局前置路由守卫中，在（路由跳转的时候，判断+获取）
*/
