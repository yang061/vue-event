<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title">{{ title }}</div>
      <!-- 注册的表单区域 -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'my-register',
  data () {
    return {
      title: '后台管理系统'

    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  // 设置背景图
  background: url('../../assets/images/login_bg.jpg') center;
  // 自动铺满整个盒子
  background-size: cover;
  // 高度参考父级,也就是app.vue里面的父级
  height: 100%;
  .reg-box {
    background-color: #fff;
    border-radius: 10px;
    width: 400px;
    height: 300px;
    // 固定定位,实现居中效果
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    .title {
      height: 50px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      font-weight: 700;
      color: rgb(99, 181, 214);
      // 改变字间距(左右)
      letter-spacing: 2px;
    }
  }
}
</style>>
