// 基于axios 封装网络请求函数
import axios from 'axios'

// axios.create() 创建并导出一个带配置的自定义axios函数(比原axios多了个基地址)
// myAxios请求的时候，地址是baseURL+url,然后去请求后台
export default axios.create({
  // 设置基地址
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})
