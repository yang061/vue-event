<template>
  <div>
    <!-- 内容区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="showPubDialogFn"
          >发表文章</el-button
        >
      </div>

      <!-- 文章表格区域 -->

      <!-- 分页区域 -->
    </el-card>
    <!-- 发表文章的 Dialog 对话框 -->
    <el-dialog
      title="发表文章"
      :visible.sync="pubDialogVisible"
      fullscreen
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  name: 'art-list',
  data () {
    return {
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      pubDialogVisible: false // 控制发表文章对话框的显示与隐藏
    }
  },
  methods: {
    //发布文章-》点击事件(显示dialog对话框)
    showPubDialogFn () {
      this.pubDialogVisible = true
    },
    //发布文章对话框关闭前的回调
    // 注意：自带的3种关闭方式：dialog自带的右上角的x，和按下esc按键，和点击半透明蒙层关闭才会走这里，以及自己设置visible对应变量为false，都会导致关闭前的回调触发

    async handleClose (done) {
      // 询问用户是否确认关闭对话框
      const confirmResult = await this.$confirm('此操作将导致文章信息丢失, 是否继续?', '提示', {
        // 按钮上的文案
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // $confirm内部虽然是一个确认弹窗，但是内部借用了promise语法来管理，点击确定：结果为成功状态，返回'confirm'；点击取消，这个promise对象状态为拒绝状态，返回'cancel'字符串
      // 知识点回顾：
      // 1.await只能用在被async修饰的函数内
      // async修饰：就是在当前函数名左边加async关键字，如果没有函数名，在形参的左边加async
      // 原因：async修饰的函数就是异步函数，如果此函数被调用，会返回一个全新的promise对象，而且本次函数调用由于是异步函数，而外面的同步代码继续执行，而await暂停代码只能暂停async函数内的，等待await后面异步结果
      // 2.await只能拿到**成功的**结果,如果失败内部会向浏览器控制台抛出错误并不会让await继续往下执行代码
      // 3.await后面的promise对象的拒绝状态(错误)如何捕获?
      // 方法1：try{'可能报错的代码'} catch(err){'try括号里面的报错信息'}
      // 方法2：用promise的链式调用，而且在catch里return的非promise拒绝状态的对象值，都会当成成功的结果返回给原地新的promise对象结果

      // 取消了关闭-阻止住, 什么都不干
      if (confirmResult === 'cancel') return
      // 确认关闭
      done() //调用才会放行，让对话框关闭
    }
  }
}



  </script>
  
  <style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
</style>
  