<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img height="60px" src="../assets/logo.png" alt="">
        </el-col>
        <el-col :span="18">
          <div class="title">电商后台管理系统</div>
        </el-col>
        <el-col class="btn" :span="2">
          <el-button>退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #373d41;
}
.header .btn {
  line-height: 60px;
}
.header .title {
  font-size: 24px;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.aside {
  background-color: #333744;
}
.main {
  background-color: #e9eef3;
}

</style>
