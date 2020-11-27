<template>
  <el-container class="container">
    <!-- 头部 -->
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
      <el-aside class="aside" :width="asideWidth">
        <!-- 侧边栏 -->
        <div @click="handleCollapse" class="collapseBar">{{ collapseText }}</div>
        <el-menu
          :collapse-transition="false"
          unique-opened
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      asideWidth: '200px',
      collapseText: '折叠'
    }
  },
  methods: {
    handleCollapse () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        // 收起
        this.asideWidth = '64px'
        this.collapseText = '展开'
      } else {
        this.asideWidth = '200px'
        this.collapseText = '折叠'
      }
    }
  }
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
.aside .collapseBar {
  background-color: #4a5064;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.2em;
  line-height: 35px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
}
.main {
  background-color: #e9eef3;
}

</style>
