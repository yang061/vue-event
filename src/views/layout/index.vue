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
      <el-aside width="200px">
        <!-- 侧边栏用户信息 -->
        <div class="user-box">
          <!-- 用户头像 -->
          <img v-if="user_pic" :src="user_pic" alt="" />
          <!-- 用户头像默认显示 -->
          <img v-else src="@/assets/images/logo.png" alt="" />
          <span>欢迎 {{ nickname || username }}</span>
        </div>
        <!-- 侧边栏导航 -->
        <!-- 
          el-menu:导航菜单
            default-active：当前激活菜单的 index（对应el-submenu/el-menu-item的index值，这样菜单才有激活样式）
            @open:sub-menu 展开的回调
            @close:sub-menu 收起的回调
            active-text-color:激活时的文字颜色,哪个index的值和default-active一致，就会被动态设置文字颜色
            router:设置上(默认为false)，是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转

            子标签：
            如果有嵌套，先写el-submenu（里面嵌套template名为title 设置当前展示内容，子用el-menu-item显示）
            如果无嵌套，直接写el-menu-item

            属性没有显示传值，默认为true(背)
             :default-active="$route.path",设置点击的高亮
         -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
          <!-- template是配合vue指令用,不用写key -->
          <template v-for="item in menus">
            <!-- 自定义标签需要key -->
            <el-menu-item
              v-if="!item.children"
              :index="item.indexPath"
              :key="item.index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.indexPath" :key="item.indexPath">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group
                v-for="obj in item.children"
                :key="obj.indexPath"
              >
                <!-- 分组可以在第一行显示组名 -->
                <!-- <template slot="title">分组一</template> -->
                <el-menu-item :index="obj.indexPath">
                  <i :class="obj.icon"></i>
                  {{ obj.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <!-- 二级路由挂载点 -->
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>文章后台管理系统@888888</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenuAPI } from '@/api'
// 经验:在组件标签上绑定的所有事件(包括原生事件的名字click,input等)
// 都是自定义事件,都需要组件内$emit触发
// 万一组件内不支持这个原生事件名字
// 解决:@事件名.native="method里面的方法名"
// .native给组件内根标签,绑定这个原生事件
export default {
  name: 'my-layout',
  data () {
    return {
      menus: [] //保存侧边栏的数据
    }
  },
  computed: {
    // 映射getters,数组写法，{ nickname: 'nickname' }是对象写法
    ...mapGetters(['username', 'nickname', 'user_pic'])
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
    },
    // el-menu回调
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    async getMenuListFn () {
      const { data: res } = await getMenuAPI()
      this.menus = res.data
    }
  },
  created () {
    // 401 token认证过期
    // 组件创建时挂载，一般不写async,请求侧边栏数据
    this.getMenuListFn()
  }
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

  // 侧边栏样式
  .el-aside {
    overflow-y: hidden;
    .user-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70px;
      color: #fff;
      font-size: 14px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      // 文字不可以选择，不能复制
      user-select: none;
      img {
        width: 45px;
        height: 45px;
        margin-right: 15px;
        border-radius: 50%;
        background-color: #fff;
        object-fit: cover;
      }
    }
    .el-submenu,
    .el-menu-item {
      user-select: none;
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
    overflow-y: hidden;
    height: 100%;
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