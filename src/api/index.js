// 封装的是具体的接口方法
// 注意，每个方法只负责一个url地址
import request from '@/utils/request' // 引入自定义axios函数

// 导出接口方法，为了在逻辑页面引入可以调用
/* 函数形参的对象解构赋值方法
 registerAPI(this.form)
 相当于
 registerAPI({
      username: '',
      password: '',
      rePassword: ''
 })
 左侧想用对象的解构赋值(语法)
 ES6规定,key和value变量同名时,可以简写(key即是key也是value变量名)
*/
/**
 * 注册接口
 * @param {*} param0 {username：用户名，password：密码 ，repassword：确认密码}
 * @returns Promise对象
 */
export const registerAPI = ({ username, password, rePassword }) => {
  // 原地是一个promise对象
  // return这个promise对象到逻辑页面，去那边对promise对象提取结果
  // 这里先用这个数据测试下, 如果url以http开头会忽略baseURL, axios直接请求此地址
  return request({
    url: '/api/reg',
    method: 'post',
    // axios 传参params,data
    // params的对象参数名和值, axios源码会把他的参数和值拼接在url?后面给后台(query查询字符串)
    // data的对象参数名和值,axios源码会把参数和值,拼接在请求体里面(对应后台是body参数)
    data: {
      username,
      password,
      repassword: rePassword
    }
  })
}

/** jsDOC
 * 登录接口
 * @param {*} param0 {username:用户名,password:密码} //传入的参数
 * @returns Promise对象
 */
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    },
  })
}

/**
 * 获取用户信息接口
 * @param {*} param0 Authorization
 * @returns Promise对象
 */
export const getUserInfoAPI = (() => {
  return request({
    url: '/my/userinfo',
    // method不写默认为get
    method: 'get',
    // 传参给后台：params（查询字符串query），data（请求体body),headers(请求头)
  })
})

/**
 * 获取侧边栏数据
 * @returns Promise对象
 */
export const getMenuAPI = (() => {
  return request({
    url: '/my/menus',
  })
})