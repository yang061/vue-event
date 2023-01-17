<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title">{{ title }}</div>
      <!-- 注册的表单区域 -->
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        :rules="rulesObj"
        hide-required-asterisk="false"
      >
        <el-form-item label="账号:" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="rePassword">
          <el-input
            type="password"
            v-model="form.rePassword"
            placeholder="再次输入确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerFn" class="btn-reg"
            >注册</el-button
          >
          <el-link type="info">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 经验:
/*
  前端绑定数据对象属性名,可以直接跟要调用的功能接口的参数名一致
  好处:我可以把前端对象(带着同名的属性和前端的值)发给后台,触发简写
*/
export default {
  name: 'my-register',
  data () {
    // 定义校验函数,必须在data里面定义,以确保能够使用this.form
    const checkRePassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        // 如果验证失败,那调用回调函数,抛出一个Error
        callback(new Error('两次输入的密码不一致!!!'))
      } else {
        // 如果验证成功,直接执行回调函数
        callback()
      }
    }
    return {
      title: '后台管理系统',
      form: { // 表单数据对象
        username: '', // 用户名
        password: '', // 密码
        rePassword: '' // 确认密码
      },
      // 表单规则校验对象,里面的规则名字和属性名字一样
      rulesObj: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // pattern:正则匹配,大小写字母加数字,长度限定为1-10个字符,trigger是触发的条件(blur:失去焦点),message:输入错误时提示的信息
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是长度1-10的大小写字母和数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // \S代表非空
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur' }
        ],
        // 自定义
        rePassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }, {
          validator: checkRePassword, trigger: 'blur'
        }, { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur' }]
      }

    }
  },

  methods: {
    // 注册=>点击事件
    registerFn () {

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
    border-radius: 5px;
    width: 410px;
    height: 320px;
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

    .btn-reg {
      // 修改注册按钮大小
      width: 100%;
    }
  }
}
</style>>
