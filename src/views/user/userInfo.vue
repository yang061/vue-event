<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <el-form
      :model="userInfo"
      :rules="userInfoRules"
      ref="userInfoRef"
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
        <el-button @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { updateUserInfoAPI } from '@/api'
export default {
  name: 'user-info', //个人中心->基本信息
  data () {
    return {
      userInfo: {
        username: this.$store.state.userInfo.username, // 默认值用登录后获取到的用户名
        nickname: '',
        email: '',
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
    // 提交修改->点击事件
    submitFn () {
      // js兜底验证
      this.$refs.userInfoRef.validate(async valid => {
        if (valid) {
          // 所有的都通过校验
          //   因为后端接口需要id属性，但userInfo里面没有
          //   所有加一个id属性
          this.userInfo.id = this.$store.state.userInfo.id
          const { data: res } = await updateUserInfoAPI(this.userInfo)
          if (res.code !== 0) return this.$message.error('更新用户信息失败！！！')
          //  更新数据成功，刷新vuex里面的数据
          this.$message.success('更新数据成功！！！')
          this.$store.dispatch('getUserInfoAction')

        } else {
          // 未通过校验
          return false
        }
      })
    },
    resetFn () {
      //   this.userInfo.nickname = ''
      //   this.userInfo.email = ''

      // el-form 提供了一个重置表单（还能重置报错提示）的方法
      this.$refs.userInfoRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>

