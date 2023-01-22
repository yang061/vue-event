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
              <!-- 因为表单要发给后台，所以提前去看看vue代码绑定的数据是什么，需要什么，发现后台需要分类id（cate_id）,提前存好 -->
              <el-option
                v-for="obj in cateList"
                :label="obj.cate_name"
                :value="obj.cate_id"
                :key="obj.id"
              ></el-option>
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
      <el-table :data="artList" border style="width: 100%">
        <el-table-column prop="title" label="文章标题"> </el-table-column>
        <el-table-column prop="cate_name" label="分类"> </el-table-column>
        <el-table-column prop="pub_date" label="发表时间">
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <span>{{ $formatDate(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column label="操作"> </el-table-column>
      </el-table>
      <!-- 分页区域 -->
    </el-card>
    <!-- 发表文章的 Dialog 对话框 -->
    <el-dialog
      title="发表文章"
      :visible.sync="pubDialogVisible"
      fullscreen
      :before-close="handleClose"
      @close="dialogCloseFn"
    >
      <!-- 发布文章的对话框 -->
      <el-form
        :model="pubForm"
        :rules="pubFormRules"
        ref="pubFormRef"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              v-for="obj in cateList"
              :label="obj.cate_name"
              :value="obj.id"
              :key="obj.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <quill-editor v-model="pubForm.content" @blur="contentChangeFn">
          </quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_img">
          <img
            src="@/assets/images/cover.jpg"
            alt=""
            class="cover-img"
            ref="coverImg"
          />

          <br />
          <input
            type="file"
            style="display: none"
            accept="image/*"
            ref="defaultCoverRef"
            @change="changeCoverFn"
          />
          <el-button type="text" @click="chooseCoverFn"> 选择封面 </el-button>
          <br />

          <el-button type="primary" @click="pubArticleFn('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticleFn('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  
  <script>
import imgSrc from "@/assets/images/cover.jpg"
import { getArticleListAPI, UploadArticleAPI, initArticleListAPI } from '@/api'
// 标签和样式中，引入的图片可以写静态路径(把路径存在vue变量中，再使用是不行的)
// 原因：webpack在分析标签时，如果src的属性是一个相对路径，那它回去帮我们找到相对路径的值一起打包
//在打包的时候会分析文件的大小，小文件->base64字符串再赋给src，大文件->拷贝图片，然后换个路径给src显示

//在vue变量中路径，赋予给标签都会当成普通字符串使用

//，但是在js代码中需要import引入
// webpack会把图片变成一个64位字符串/在打包后的临时地址
// import ImgSrc from "@/assets/images/cover.jpg"
export default {
  name: 'art-list',
  data () {
    return {
      // 查询参数对象
      q: {
        pagenum: 1, //默认那第一页的数据
        pagesize: 2, //当前页需要几条数据（传给后台，后台就返回几个）
        cate_id: '',
        state: ''
      },
      pubDialogVisible: false, // 控制发表文章对话框的显示与隐藏
      // 发布文章表单的数据
      pubForm: {
        title: '', //文章标题
        cate_id: '', //文章分类id
        content: '', //文章内容
        cover_img: '', //封面图片(文件)，
        state: '' //发布状态{已发布，草稿}
      },
      pubFormRules: { // 表单的验证规则对象
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [{ required: true, message: '请选择文章分类', trigger: 'change' }],
        // content对应的是quill-editor富文本编辑器，它不是el提供表单标签
        // el-input等输入框的在blur事件进行校验
        // 下拉菜单，单选框，复选框在change事件上校验
        // quill-editor 2个事件都没有，所以你输入内容也不会走校验
        // 解决方案：自己给quill-editor绑定change事件
        // 在事件处理函数中用el-form组件对象，调用某个校验规则再重新执行
        content: [
          {
            required: true, message: '请输入文章内容', trigger: 'change'
          }
        ],
        cover_img: [
          {
            required: true, message: '请选择封面', trigger: 'blur'
          }
        ]
      },
      cateList: [], //存储文章分类列表
      artList: [], // 文章的列表数据
      total: 0 // 总数据条数
    }
  },
  created () {
    //请求分类数据
    this.getArtCateListFn()
    // 初始化文章列表
    this.getArtListFn()
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

      // 取消了关闭-阻止住, 什么都不干，不让下面代码执行
      if (confirmResult === 'cancel') return
      // 确认关闭
      done() //调用才会放行，让对话框关闭
    },
    // 获取文章分类列表
    async getArtCateListFn () {
      const { data: res } = await getArticleListAPI()
      // 成功-》 存储数据
      if (res.code === 0) {
        this.cateList = res.data
      }
    },
    // 选择封面->点击事件
    chooseCoverFn () {
      this.$refs.defaultCoverRef.click() //模拟默认点击
    },
    // 用户选择了封面文件
    changeCoverFn (e) {
      //e.target 当前选择的表单标签
      const files = e.target.files //获取文件选择的列表
      if (files.length === 0) {
        // 清空cover_img的值,img显示为默认头像
        this.pubForm.cover_img = null
        // 取消时显示默认图片(不写更合理一点)
        // this.$refs.coverImg.setAttribute('src', ImgSrc)
      } else {
        // 用户选择了封面
        this.pubForm.cover_img = files[0]
        // 封面预览，把图片文件显示到img标签里面
        // 转换为64为base字符串
        const url = URL.createObjectURL(files[0])
        this.$refs.coverImg.setAttribute('src', url)
      }
      // 让表单单独校验封面的规则
      this.$refs.pubFormRef.validateField('cover_img')
    },
    //表单内(点击发布/存为草稿) ->点击事件->准备调用后端接口
    pubArticleFn (str) {
      // str:"已发布/草稿"(后端要求的参数值)
      this.pubForm.state = str //保存到发布表单对象上

      // js兜底校验
      this.$refs.pubFormRef.validate(async valid => {
        if (valid) {
          // 通过校验
          let fd = new FormData() //准备一个表单数据对象的容器
          // fd.append('参数名',值)
          fd.append('title', this.pubForm.title)
          fd.append('cate_id', this.pubForm.cate_id)
          fd.append('cover_img', this.pubForm.cover_img)
          fd.append('content', this.pubForm.content)
          fd.append('state', this.pubForm.state)
          // 调用接口
          const { data: res } = await UploadArticleAPI(fd)
          // 发布失败，给用户提示
          if (res.code !== 0) return this.$message.error(res.message)
          // 发布草稿，给用户提示
          this.$message.success(res.message)
          // 关闭对话框
          this.pubDialogVisible = false
          // 刷新文章列表->再次请求文章列表
          this.getArtListFn()
        } else {
          return false //阻止按钮默认提交行为
        }
      })
    },
    // 富文本编辑器内容改变触发此方法
    contentChangeFn () {
      // validateField只校验某个表单字段
      this.$refs.pubFormRef.validateField('content')

    },
    // 发布文章->关闭对话框->清空表单
    dialogCloseFn () {
      this.$refs.pubFormRef.resetFields()
      // 我们需要手动给封面标签img设置一个值，因为它没有受到v-model的影响
      this.$refs.coverImg.setAttribute('src', imgSrc)
    },
    // 获取所有的文章列表
    async getArtListFn () {
      const { data: res } = await initArticleListAPI(this.q)
      // 把获取到的文章列表存取到artList里面(有分页，不是所有数据)
      this.artList = res.data
      // 把文章总数保存
      this.total = res.total
    }
  },


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
img.cover-img {
  width: 400px;
  height: 300px;
  object-fit: cover;
}
::v-deep .ql-editor {
  min-height: 300px;
}
</style>
  