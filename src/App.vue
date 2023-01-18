<template>
  <div>
    <!-- 一级路由规则对象的挂载点 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log(111);
    this.$store.dispatch('getUserInfoAction')
  }
}
</script>

<style lang="less">
div {
  height: 100%;
}
// 修改elementUI 中message组件的样式
.myBox {
  max-height: 50px !important;
}
</style>
