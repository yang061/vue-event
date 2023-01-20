<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
    <!-- 表单 -->
    <el-form
      :model="pwdForm"
      :rules="pwdFormRules"
      ref="pwdFormRef"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePwdFn">修改密码</el-button>
        <el-button @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>


<script>
import { updatePwdAPI } from "@/api";
export default {
  name: 'user-pwd',
  data () {
    // 自定义校验
    // 新密码和旧密码不能一样
    const samePwd = (rules, value, callback) => {
      // value就是校验规则里面的所对应的输入框的值(新密码)
      if (this.pwdForm.old_pwd === value) {
        callback(new Error('新密码和旧密码不能一样'))
      } else {
        callback() //通过校验
      }
    }

    const rePwd = (rules, value, callback) => {
      if (this.pwdForm.new_pwd !== value) {
        callback(new Error('两次的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据对象
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      // 表单的验证规则对象
      pwdFormRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          {
            // 自定义规则
            validator: samePwd, trigger: 'blur'
          }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          {
            // 自定义规则
            validator: rePwd, trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 更新密码->点击事件
    updatePwdFn () {
      // js兜底校验
      this.$refs.pwdFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await updatePwdAPI(this.pwdForm)
          if (res.code !== 0) return this.$message.error(res.message)

          this.$message.success('更新密码成功！！！')
          // 清空数据
          this.$refs.pwdFormRef.resetFields()
          // 重置密码(被动退出)
          // 清空token和更新用户信息
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', {})
          this.$router.push('/login')

        } else {
          return false
        }

      })
    },
    resetFn () {
      // 点击重置表单
      this.$refs.pwdFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
