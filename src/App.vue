<template>
  <div>
    <!-- 一级路由规则对象的挂载点 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
// 修改elementUI 中message组件的样式
.myBox {
  max-height: 50px !important;
}
</style>
