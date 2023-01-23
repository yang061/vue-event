const { defineConfig } = require('@vue/cli-service')
// 需要排除的包对象
let externals = {}
// 判断是否是生产环境
const isProduction = process.env.NODE_ENV === 'production'
// 如何是生产环境，需要执行以下逻辑
if (isProduction) {
  externals = {
    /**
      * externals 对象属性解析：
      * '包名': '在项目中引入的名字'
      * 以 element-ui 举例 我再 main.js 里是以
      * import ELEMENT from 'element-ui'
      * Vue.use(ELEMENT)
      * 这样引入的，所以我的 externals 的属性值应该是 ELEMENT
      * 一定要去main.js设置
    */
    'echarts': 'echarts',
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'dayjs': 'dayjs',
    'element-ui': 'ELEMENT',
    'vue-quill-editor': 'VueQuillEditor',
    'vuex-persistedstate': 'createPersistedState'
  }
}
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

    externals: externals
    // 不需要
    // resolve: {
    //   alias: {
    //     '@': resolve('src')
    //   }
    // }
  }
})

// 我们虽然排除排除了第三方的包
// 但打包dist和开发环境都会使用这套配置，并排除掉第三方
// 生产环境，打包时会以public/index.html 作为模板生成 dist/index.html ，index.html中就有了那些第三方地址cdn，所以效果是ok的
// 开发环境，public/index.html,也有那些cdn地址，所以也能正常运行
// 但是第一次速度有点慢，所以，开发时我想用node_modules
// process.env.NODE_ENV 可以根据环境不同，显示不同值