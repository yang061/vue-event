const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 影响打包时，index.html引入其他资源的前缀地址
  // ./可以在开发环境和生产环境都可以正常使用
  // 为了严谨
  // 开发环境：'/'
  // 生产环境:'./'
  // node里有个内置的环境变量process.env.NODE_ENV会根据你敲击的命令，来使用不同的值
  // 解决：
  // 如果敲击：npm run serve ,process.env.NODE_ENV的值是'development'
  // 如果敲击：npm run build ,process.env.NODE_ENV的值是'production'
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: name, //不需要

    externals: {
      // 基本格式：
      // '包名' : '在项目中引入的名字'
      'echarts': 'echarts',
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'dayjs': 'dayjs',
      'element-ui': 'ELEMENT',
      'vue-quill-editor': 'VueQuillEditor',
      'vuex-persistedstate': 'createPersistedState'
    },
    // 不需要
    // resolve: {
    //   alias: {
    //     '@': resolve('src')
    //   }
    // }
  }
})
