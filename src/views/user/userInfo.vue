<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <el-form
      :model="userInfo"
      :rules="userInfoRules"
      ref="userFormRef"
      label-width="100px"
    >
      <el-form-item label="登录名称" prop="username">
        <el-input v-model="userInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="userInfo.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- primary主要按钮 -->
        <el-button type="primary" @click="submitFn">提交修改</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'user-info', //个人中心->基本信息
  data () {
    return {
      userInfo: {
        username: this.$store.state.userInfo.username, // 默认值用登录后获取到的用户名
        nickname: '',
        email: ''
      },
      //   用户详情验证规则
      userInfoRules: {
        nickname: [
          { required: true, message: '请输入您的用户昵称', trigger: 'blur' },
          {

            partter: /^\S{1,10}$/, message: '请输入1到10位的非空字符串', trigger: 'blur'
          }
        ],
        email: [
          {
            required: 'true', message: '请输入您的邮箱', trigger: 'blur'
          },
          {
            type: 'email', message: '邮箱格式不正确', trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitFn () {

    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>

