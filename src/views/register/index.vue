<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <my-title />
      <!-- 注册的表单区域 -->
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        :rules="rulesObj"
        :hide-required-asterisk="hideRequired"
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
          <el-link type="info" @click="$router.push('/login')">去登录</el-link>
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
// 引入Title组件
import myTitle from '@/components/Title.vue'
// 引入注册请求api
import { registerAPI } from '@/api'
export default {
  name: 'my-register',
  components: { myTitle },
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
      form: { // 表单数据对象
        username: '', // 用户名
        password: '', // 密码
        rePassword: '' // 确认密码
      },
      hideRequired: true, // 隐藏必填项的红色*
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
      // js兜底校验
      this.$refs.form.validate(async valid => {
        // valid是布尔值
        if (valid) {
          // 通过校验
          console.log(this.form)
          // registerAPI(this.form) // 返回一个promise对象
          // 1.调用注册接口
          // 解构赋值,把axios返回的数据对象data字段对应的值保存在res上
          const { data: res } = await registerAPI(this.form)
          console.log(res)
          // 2.注册失败,提示用户
          if (res.code !== 0) {
            // elementUI在vue的原型链上添加了弹窗提示,$message属性
            // return没有{}必须有,作用:阻止代码往下执行
            return this.$message({
              // 自定义样式
              type: 'error',
              message: res.message,
              customClass: 'myBox',
            })
          }
          // 3.注册成功,提示用户
          this.$message({
            // 自定义样式
            type: 'success',
            message: res.message,
            customClass: 'myBox',
          })
          // 4.跳转到登录页面
          this.$router.push('/login')
        } else {
          console.log('error')
          return false // 阻止默认提交行为(表单下面红色提示会自动出现)
        }
      })
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
    width: 450px;
    height: 320px;
    // 固定定位,实现居中效果
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 35px 10px 0;

    .btn-reg {
      // 修改注册按钮大小
      width: 100%;
    }
  }
}
</style>>
