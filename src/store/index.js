import Vue from 'vue'
import Vuex from 'vuex'
// 引入createPersistedState(本地持久存储)
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'' //保存token字符串
  },
  getters: {
  },
  mutations: {
    // 保存token
    updateToken(state,value){
      state.token = value
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[
    createPersistedState() //注入持久化插件
  ]
})

// vuex默认保存在内存中,页面一刷新,就没了,所以要本地存储
