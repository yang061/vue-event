// 封装的是具体的接口方法
// 注意，每个方法只负责一个url地址
import request from '@/utils/request' // 引入自定义axios函数

// 导出接口方法，为了在逻辑页面引入可以调用
export const registerAPI = () => {
  // 原地是一个promise对象
  // return这个promise对象到逻辑页面，去那边对promise对象提取结果
  // 这里先用这个数据测试下, 如果url以http开头会忽略baseURL, axios直接请求此地址
  return request({
    url: '/api/reg',
    method: 'post',
    data: {
      username: 'llidong',
      password: '2224444',
      repassword: '2224444'
    }
  })
}
