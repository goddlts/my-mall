<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索行 -->
    <el-row class="row">
      <el-col :span="24">
        <el-input placeholder="请输入内容" v-model="searchText" class="searchClass">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 添加按钮 -->
        <el-button @click="addUserDialogFormVisible = true" type="success">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 用户列表，表格 -->
    <el-table
      v-loading="loading"
      border
      stripe
      :data="data"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <!-- 自定义列，时间 -->
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态">
        <!-- 自定义列，用户状态 -->
        <template slot-scope="scope">
          <el-switch
            @change="handleChange(scope.row.mg_state, scope.row.id)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id)" plain size="mini" icon="el-icon-delete"></el-button>
          <el-button type="success" plain size="mini" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户的弹出框 -->
    <el-dialog title="添加用户" :visible.sync="addUserDialogFormVisible">
      <el-form
        label-width="80px"
        label-position="right"
        :model="formData">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="formData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchText: '',
      // 用户列表数据
      data: [],
      loading: false,
      // 分页数据
      pagenum: 1,
      pagesize: 2,
      total: 0,
      // 控制添加用户的对话框的显示和隐藏
      addUserDialogFormVisible: false,
      formData: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      }
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 加载用户列表的数据
    async loadData () {
      // 显示加载提示
      this.loading = true
      // 发请求的时候要在请求头上设置Authorization 值是token
      const token = localStorage.getItem('token')
      this.axios.defaults.headers.common.Authorization = token
      const res = await this.axios.get(`users?query=${this.searchText}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // 请求结束之后要获取，总共有多少条数据
      this.total = res.data.data.total
      // console.log(res.data)
      // 请求结束之后隐藏loading
      this.loading = false
      const { meta: { status, msg } } = res.data
      if (status === 200) {
        this.data = res.data.data.users
      } else {
        this.$message({
          type: 'error',
          message: msg
        })
      }
    },
    // 分页的方法
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.loadData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadData()
      console.log(`当前页: ${val}`)
    },
    // 搜索
    handleSearch () {
      // 把页码设置成1
      this.pagenum = 1
      this.loadData()
    },
    // 状态改变的事件
    async handleChange (state, id) {
      // console.log(state)
      const res = await this.axios.put(`users/${id}/state/${state}`)
      const { meta: { status, msg } } = res.data
      if (status === 200) {
        this.$message({
          type: 'success',
          message: msg
        })
      } else {
        this.$message({
          type: 'error',
          message: msg
        })
      }
    },
    // 删除功能
    async handleDelete (id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 发送请求，删除当前的用户
        const res = await this.axios.delete(`users/${id}`)
        const { meta: { status, msg } } = res.data
        if (status === 200) {
          this.$message({
            type: 'success',
            message: msg
          })
          // 如果当前是最后一页，并且当前只有一条数据 pagenum - 1
          if (this.pagenum > 1 && this.data.length === 1) {
            this.pagenum--
          }
          // 删除成功之后要重新加载数据
          this.loadData()
        } else {
          this.$message({
            type: 'error',
            message: msg
          })
        }
      } catch (err) {
        console.dir(err)
      }
      // this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    }
  }
}
</script>

<style>
.card {
  height: 100%;
}
.searchClass {
  width: 260px;
  margin-right: 20px;
}
.row {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
