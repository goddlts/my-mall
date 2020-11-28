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
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <!-- 添加按钮 -->
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 用户列表，表格 -->
    <el-table
      border
      stripe
      :data="data"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
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
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchText: '',
      // 用户列表数据
      data: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 加载用户列表的数据
    async loadData () {
      // 发请求的时候要在请求头上设置Authorization 值是token
      const token = localStorage.getItem('token')
      this.axios.defaults.headers.common.Authorization = token
      const res = await this.axios.get('users?pagenum=1&pagesize=10')
      const { meta: { status, msg } } = res.data
      if (status === 200) {
        this.data = res.data.data.users
      } else {
        this.$message({
          type: 'error',
          message: msg
        })
      }
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
