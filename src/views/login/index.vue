<template>
  <!-- 注册页面的整体盒子 -->
  <div class="login-container">
    <!-- 注册的盒子 -->
    <div class="login-box">
      <my-title />
      <!-- 注册的表单区域 -->
      <el-form
        ref="loginForm"
        :model="loginForm"
        label-width="60px"
        :rules="loginRules"
        :hide-required-asterisk="hideRequired"
      >
        <!-- 用户名 -->
        <el-form-item label="账号:" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginFn" class="btn-login"
            >登录</el-button
          >
          <!-- 跳转注册路由 -->
          <el-link type="info" @click="$router.push('/reg')">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import myTitle from '@/components/Title.vue'
// 引入登录api
import { loginAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  components: { myTitle },
  name: 'my-login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      hideRequired: true, //隐藏红*
      // 定义登录规则对象
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是长度1-10的大小写字母和数字', trigger: 'blur' }
        ],
        password: [
          {
            required: true, message: "请输入密码", trigger: 'blur'
          },
          {
            pattern: /^\S{6,15}$/, message: "密码必须是6-15位的非空字符哦!", trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 在组件对象(vc)中生成与mutations对话的方法
    ...mapMutations(['updateToken']),

    // 登录的点击事件 ,js兜底检验,防止不输入也可以登录
    loginFn () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 拿到关联的数据
          console.log(this.loginForm);
          // 调用loginAPI,解构赋值data并重命名为res
          const { data: res } = await loginAPI(this.loginForm)
          // 根据后台返回的信息做判断,给用户提示
          if (res.code !== 0) {
            // 返回失败,写{} 不用写return
            this.$message(
              {
                // 自定义样式
                type: 'error',
                message: res.message,
                customClass: 'myBox',
              }
            )
          } else {
            // 返回成功
            this.$message({
              type: 'success',
              message: res.message,
              customClass: 'myBox',
            })
            // 提交给mutations,把token字符串保存在vuex中
            this.updateToken(res.token)
            // 跳转到layout页面(布局页)
            this.$router.push('/')
          }
        } else {
          return false
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.login-container {
  // 设置背景图
  background: url('../../assets/images/login_bg.jpg') center;
  // 自动铺满整个盒子
  background-size: cover;
  // 高度参考父级,也就是app.vue里面的父级
  height: 100%;
  .login-box {
    background-color: #fff;
    border-radius: 5px;
    width: 410px;
    height: 280px;
    // 固定定位,实现居中效果
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 30px 0 10px;

    .btn-login {
      // 修改注册按钮大小
      width: 100%;
    }
  }
  .el-message {
    height: 40px;
  }
}
</style>>
