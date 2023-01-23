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

/**
 * 更新用户-基本资料
 * @param {*} param0  { id, nickname：昵称, email：邮箱 }
 * @returns promise对象
 */
export const updateUserInfoAPI = (({ id, nickname, email }) => {
  return request({
    url: '/my/userinfo',
    method: 'put',
    data: {
      id,
      nickname,
      email,
    }
  })
})

/**
 * 更新头像接口
 * @param {*} avatar 头像图片转base64字符串(一个参数没必要解构)
 * @returns promise对象
 */
export const updateUserAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'patch',
    data: {
      avatar //头像图片转base64字符串
    }
  })
}

/**
 * 更新用户密码
 * @param {*} param0  { old_Pwd:旧密码, new_Pwd ：新密码, re_pwd :新密码确认}
 * @returns promise对象
 */
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'patch',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}

/**
 * 获取文章分类列表
 * @returns promise对象
 */
export const getArticleListAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}

/**
 * 增加文章分类列表接口
 * @param {*} param0 { cate_name：分类名字, cate_alias：分类别名 }
 * @returns promise对象
 */
export const addArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'post',
    data: {
      cate_name,
      cate_alias
    }
  })
}

/**
 * 修改文章分类接口
 * @param {*} param0 { id:文章分类id, cate_name：文章分类名字, cate_alias：文章分类别名 }
 * @returns promise对象
 */
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'put',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}

/**
 * 删除文章分类的接口
 * @param {*} param0 id：文章分类id
 * @returns promise对象
 */
export const deleteArtCateAPI = ({ id }) => {
  return request({
    url: '/my/cate/del',
    method: 'delete',
    params: {
      id
    }
  })
}


/**
 * 上传(发布)文章接口
 * @param {*} fd FormData表单对象
 * @returns promise对象
 */
export const UploadArticleAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'post',
    data: fd
  })
}

/**
 * 初始化获取文章列表
 * @param {*} param0 { pagenum: 当前页码数, pagesize: 当前页条数, cate_id: 文章分类id, state: 文章状态 }
 * @returns promise对象
 */
export const initArticleListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}

/**
 * 获取文章详情
 * @param {*} id ：文章id
 * @returns promise对象
 */
export const getArtDetailAPI = (id) => {
  return request({
    url: '/my/article/info',
    params: {
      id
    }
  })
}

/**
 * 删除文章接口
 * @param {*} id 文章id
 * @returns promise对象
 */
export const deleteArtAPI = (id) => {
  return request({
    url: '/my/article/info',
    method: 'delete',
    params: {
      id
    }
  })
}