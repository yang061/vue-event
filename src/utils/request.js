// 基于axios 封装网络请求函数
import axios from 'axios'
import store from '@/store';
import router from '@/router';

// 定义请求基地址
export const baseURL = "http://big-event-vue-api-t.itheima.net"
// axios.create() 创建并导出一个带配置的自定义axios函数(比原axios多了个基地址)
// myAxios请求的时候，地址是baseURL+url,然后去请求后台
const myAxios = axios.create({
  // 设置基地址
  baseURL
})

// 定义请求拦截器
// api里每次调用request都会先走这个请求拦截器
myAxios.interceptors.request.use(
  //请求前触发一次
  function (config) {
    // 返回axios内源码,config配置对象(要请求后台的参数都在这上面)
    // 在请求前会发一次,这个return交给axios源码内,根据配置项发起请求

    // 在发起时统一携带请求头Authorization的token值

    // 判断,有token值才需要设置Authorization,其他不需要(如登录和注册页不需要)
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }
    return config
  },
  function (error) {
    //请求发起前的代码，如果有异常报错，会直接进入这里
    // 返回一个带拒绝状态的promise对象
    //此函数类似于catch函数里面的return
    // 口诀:return非promise对象值,会作为成功的结果,返回给下一个promise对象(axios留在原地)
    // 口诀:return promise对象,这个promise对象状态,会返回给下一个promise对象
    // Promise.reject() 原地留下一个新的promise对象(状态为失败),它是promise的类方法reject()
    return Promise.reject(error)
    // 等同于
    /**
     * return new Promise((resolve,reject)=>{
     * reject(error)
     * })
     */
  }
)

// 定义响应拦截器
myAxios.interceptors.response.use(function (res) {
  // 响应状态码为 2xx或3xx 时触发成功的回调，形参中的 response 是“成功的结果”
  // return 到axios 原地的promise对象，作为成功的结果
  return res
}, function (error) {
  // 响应状态码是 4xx 5xx 时触发失败的回调，形参中的 error 是“失败的结果”
  //  return 到axios 原地的promise对象位置，作为失败拒绝的状态(如果那边用try+catch或者catch函数捕获，可以捕获到我们传递过去的error变量)
  if (error.response.status === 401) {
    //本次响应token过期了
    // 清除vuex里的一切，然后切换到登录页面(被动退出登录状态)
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})

    router.push('/login')
    alert('用户信息已过期')
  }
  return Promise.reject(error)
})


export default myAxios


