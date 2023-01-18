import { getUserInfoAPI } from '@/api'
import Vue from 'vue'
import Vuex from 'vuex'
// 引入createPersistedState(本地持久存储)
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', //保存token字符串
    userInfo: {} // 保存用户信息(是对象有：id，username，nickname，email，user_pic)
  },
  getters: {
  },
  mutations: {
    // 保存token
    updateToken (state, value) {
      state.token = value
    },
    // 把用户信息保存至state里面，需要处理，可以用action
    updateUserInfo (state, value) {
      state.userInfo = value
    }
  },
  actions: {
    // 请求用户信息
    async getUserInfoAction (context) {
      // userInfoAPI不需要传参，所以可以不写value
      const { data: res } = await getUserInfoAPI()
      // 成功就传给mutation加工
      context.commit('updateUserInfo', res.data)
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState() //注入持久化插件
  ]
})

// vuex默认保存在内存中,页面一刷新,就没了,所以要本地存储
