<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateShowDialogBtnFn"
          >添加分类</el-button
        >
      </div>
      <!-- 分类数据表格 -->
      <el-table :data="cateList" border style="width: 100%">
        <!-- type是table-column内置属性，你告诉他用index，意思是第一个单元格用索引 -->
        <el-table-column type="index" label="序号" width="100%">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
        <el-table-column label="操作">
          <!-- 作用域插槽：scope对象：{row：行对象} -->
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              @click="updateCateBtnFn(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteCateBtnFn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加文章分类的对话框 
        el-dialog 对话框组件
        title：左上角的标题
        visible：控制对话框是否显示(true->显示/false->不显示)
        visible.sync：组件内检测到对话框关闭(点击蒙层，按esc，按右上角x)，他会回传一个false给右侧的vue变量
        before-close：对话框关闭前的回调，
                     可以在内部用done()关闭弹窗
                     什么都不调用就会阻止对话框关闭

        拓展知识点：.sync 是vue2.3版本新增
                   .sync类似于v-model,可以给子组件实现“双向数据绑定”
        // 复习：v-model如何给子组件实现双向绑定(父组件的Vue变量要传给子组件，子组件传出的值也要自动绑定到父组件的vue变量上)
        // v-model本质：给所在标签绑定：value="vue变量"和@input = "val=> vue变量 = val"
        //vue2里面一个标签只能用一次v-model,vue3里面可以用多次

        //.sync本质：给所在标签绑定：props属性名="vue变量" @update：props属性名="val=>vue变量=val"
        <标签 :visible.sync="vue变量"></标签>
        //运行时如下
        //<标签 :visible="vue变量" @update：visible="val=>vue变量=val"></标签>
        //所以子传父的时候 this.$emit('update：visible',值)
        //vue2里面它可以用多次，vue3把他移除了
    -->
    <!-- 根据isEdit状态不同选择不同的标题 -->
    <el-dialog
      :title="isEdit ? titleList[1] : titleList[0]"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      @close="dialogCloseFn"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArticleListAPI, addArtCateAPI, updateArtCateAPI, deleteArtCateAPI } from '@/api'
export default {
  name: 'art-cate',
  data () {
    return {
      // 文章分类数组
      cateList: [],
      dialogVisible: false, //增加文章分类对话框-出现(true)/隐藏(false)，
      titleList: ['添加文章分类', '修改文章分类', '删除文章分类'],
      addForm: { //添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
      addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      },
      isEdit: false, //true为要编辑的状态，false为要新增的状态
      editId: '' //保存正在编辑的id值
    }
  },
  methods: {
    // 获取文章分类列表
    async getArticleList () {
      const { data: res } = await getArticleListAPI()
      //   console.log(res);
      this.cateList = res.data
    },
    // 控制弹窗显示的方法
    addCateShowDialogBtnFn () {
      this.isEdit = false //改为新增状态
      this.editId = '' //清空编辑的id
      this.dialogVisible = true
    },
    // 对话框确认按钮-> 点击事件->让对话框消失/调用保存文章分类的接口
    confirmFn () {
      //  js兜底校验
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          // 通过校验
          // 当状态为新增状态时isEdit = false
          if (!this.isEdit) {
            const { data: res } = await addArtCateAPI(this.addForm)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          } else {
            // 为修改状态时
            // this.addForm.id = this.editId//把编辑的文章分类id添加到addForm中
            // updateArtCateAPI(this.addForm) 或
            // ...this.addForm把当前对象展开添加进去
            const { data: res } = await updateArtCateAPI({ id: this.editId, ...this.addForm })
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          }
          //   重新请求文章列表，拿到最新数据
          //   生命周期的方法如created、mounted，不会挂载到this上，无法用this.created
          this.getArticleList()
          // 关闭对话框
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    // 取消按钮点击事件
    cancelFn () {
      this.dialogVisible = false
    },
    // 右上角x对应的回调
    handleClose (done) {
      done()
    },
    // 对话框关闭的回调
    dialogCloseFn () {
      // 清空表单
      this.$refs.addRef.resetFields()
    },
    // 修改按钮->点击事件(先做数据回显)
    updateCateBtnFn (obj) {
      // obj就是{id:文章分类id，cate_name：文章分类名字，cate_alias：文章分类别名
      this.isEdit = true //改为编辑状态
      this.editId = obj.id

      this.dialogVisible = true
      //   让el-dialog第一次挂载el-form时，先用addForm空字符串的初始值绑定到内部，后续用于resetFields的重置
      //   所以让真实dom先创建并在内部绑定好初始值
      // 然后再做数据回显
      //   注意：我们给v-model对象赋值时，只是影响当前显示的值，不会影响resetFields复制的初始值
      this.$nextTick(() => {
        // 等真实dom更新完，再数据回填
        // 把当前对象里面的值给dialog表单（数据回填）
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    // 删除文章分类按钮->点击事件
    async deleteCateBtnFn (obj) {
      const { data: res } = await deleteArtCateAPI({ id: obj.id })
      //   删除失败提示
      if (res.code !== 0) return this.$message.error(res.message)
      //   删除成功
      this.$message.success(res.message)
      //   更新页面->重新获取文章分类列表
      this.getArticleList()

    }
  },
  mounted () {
    // 获取文章分类列表
    this.getArticleList()
  }
}

// BUG (el-form和el-dialog和数据回显 同时用有bug)
// 第一次打开网页，先点击修改，再点击新增，发现表单输入框有值
// 原因：点击修改后，关闭对话框时，清空失效
// 具体分析：resetFields有问题，
// 线索：resetFields对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
// 线索：Dialog 的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。因此，如果需要执行 DOM 操作，或通过 ref 获取相应组件，请在 open 事件回调中进行。
// 线索：vue数据改变先执行同步所有，再去更新dom(异步代码)

// 没问题时：第一次打开网页，先点击新增按钮->dialog出现->el-form表单第一次挂载(关联的addForm为空字符串)，el-form表单内绑定了初始值(空字符串)，所以后续调用resetFields时会返回初始值

// 有问题时：第一次打开网页，先点击修改按钮->dialog出现，同步代码把addForm赋当前点击的值->dom更新异步->dialog出现->el-form表单第一次挂载绑定了被点击的值->以后重置就用绑定的带值的重置
</script>

<style lang="less" scoped>
.box-card {
  .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>