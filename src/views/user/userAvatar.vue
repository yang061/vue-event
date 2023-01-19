<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <!-- 头像文件 -->
    <img
      v-if="!avatar"
      class="the_img"
      src="../../assets/images/avatar.jpg"
      alt=""
    />
    <img v-else class="the_img" :src="avatar" alt="" />
    <!-- 按钮区域 -->
    <div class="btn-box">
      <!-- 过滤掉所有非图片文件 ,隐藏原生按钮因为太丑，把chooseImg绑定打开这个原生按钮-->
      <input
        type="file"
        accept="image/*"
        style="display: none"
        ref="iptRef"
        @change="onFileChange"
      />
      <el-button type="primary" icon="el-icon-plus" @click="chooseImg"
        >选择图片</el-button
      >
      <el-button
        type="success"
        icon="el-icon-upload"
        :disabled="avatar === ''"
        @click="uploadFn"
        >上传头像</el-button
      >
    </div>
  </el-card>
</template>

<script>
import { updateUserAvatarAPI } from '@/api'
export default {
  name: 'user-avatar',
  data () {
    return {
      avatar: '' //保存显示base64位字符串/图片链接
    }
  },
  methods: {
    // 选择图片的点击事件
    chooseImg () {
      // 目的：为了让input[type=file]标签，用js代码控制让他打开，以便选择文件
      // input[type=file]标签为原生标签，样式不好改
      // 解决：移花接木
      //   this.$refs.iptRef获取标签，".lick()"模拟用户行为
      this.$refs.iptRef.click()
    },
    // 选择文件确定了
    onFileChange (e) { //e=>原生事件对象
      const files = (e.target.files) //拿到用户选择的文件数组
      if (files.length === 0) {
        // 说明文件选择刚刚打开了，但用户一个没选
      } else {
        // 说明用户选择了文件(默认选一个，如果想选多个，需要在input标签加原生属性)
        // console.log(files[0])

        // 目标：选择的图片文件，需要到img里面做纯前端的预览
        // img标签的src值
        // * 只能是图片的'链接地址'(外链http://开头，图片文件相对路径)
        // * 或者是图片的base64字符串(而且字符串必须是data：image/png;base64,图片的转base64字符串)
        // 解决方案1：文件=>内存临时地址(这个地址只能是js内存里的，不能发给后台)
        // 语法：URL.createObjectURL(文件)
        // 返回值：内存临时地址
        // this.avatar = URL.createObjectURL(files[0])
        // 解决方案2:文件=> base64字符串（此字符串可以发给后台）
        // 1. 创建 FileReader 对象
        const fr = new FileReader()
        // 2. 调用 readAsDataURL 函数，读取文件内容
        fr.readAsDataURL(files[0]) //传入文件对象开始读
        // 3. 监听 fr 的 onload 事件
        fr.onload = (e) => {
          // 4. onload等待把文件读成base64的字符串后会触发onload事件函数
          // e.target.result的值就是读完的值
          this.avatar = e.target.result //给avatar赋值，实现预览
        }
      }
    },
    // 上传头像
    async uploadFn () {
      const { data: res } = await updateUserAvatarAPI(this.avatar)
      if (res.code !== 0) return this.$message.error(res.message)
      //   头像更新成功
      this.$message.success(res.message)
      //   更新vuex的用户信息
      this.$store.dispatch('getUserInfoAction')
    }
  }
}
</script>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>