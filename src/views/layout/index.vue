<template>
  <!-- 主页布局 -->
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左边的图片 -->
      <img src="@/assets/images/logo.png" alt="" />
      <!-- 右边的菜单栏 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262e"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img src="../../assets/images/tx.jpg" alt="" class="pic" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2" @click="quitFn"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <!-- 侧边栏区域 -->
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>Main</el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// 经验:在组件标签上绑定的所有事件(包括原生事件的名字click,input等)
// 都是自定义事件,都需要组件内$emit触发
// 万一组件内不支持这个原生事件名字
// 解决:@事件名.native="method里面的方法名"
// .native给组件内根标签,绑定这个原生事件
export default {
  name: 'my-layout',
  data () {
    return {

    }
  },
  methods: {
    // 退出登录的点击事件
    quitFn () {
      // 为了让用户体验更好,需要确认框
      if (confirm('您要退出吗?')) {
        // 清除vuex
        // 把空字符串传给updateToken
        this.$store.commit('updateToken', '')
        // 清除用户信息
        this.$store.commit('updateUserInfo', '')
        // 强制跳转页面
        this.$router.push('/login')
      }
    }
  },
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
    img {
      height: 100%;
    }
    .el-menu-top {
      position: relative;
    }
  }

  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-aside,
  .el-header {
    background-color: #23262e;
  }

  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
}
// 头像样式
.pic {
  position: absolute;
  right: 120px;
  //   top: 0;

  // 设为圆形
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #fff;
  //   防止挤压变形
  object-fit: cover;
}
</style>