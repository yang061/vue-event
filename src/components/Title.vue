<template>
  <!-- 标题的盒子 -->
  <div class="title-box">{{ title }}</div>
</template>

<script>
export default {
  name: 'my-title',

  data () {
    return {
      title: '后台管理系统'
    }
  }
}
</script>

<style lang="less" scoped>
.title-box {
  height: 50px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  font-weight: 700;
  color: rgb(99, 181, 214);
  // 改变字间距(左右)
  letter-spacing: 2px;
}
</style>
