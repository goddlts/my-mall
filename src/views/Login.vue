<template>
  <div class="login-wrap">
    <el-form label-position="top" class="login-form" :model="form" label-width="80px">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" @click="handleLogin" type="primary">登  录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  methods: {
    handleLogin () {
      this.axios
        .post('login', this.form)
        .then(res => {
          // res =>   { data: { data: {}, meta: { status, msg } } }
          const status = res.data.meta.status
          const msg = res.data.meta.msg
          if (status === 200) {
            // 提示登录成功
            this.$message({
              type: 'success',
              message: msg
            })
            // 跳转到后台的首页
            this.$router.push('/')
            // 记录token
          } else {
            // 提示登录失败
            this.$message({
              type: 'error',
              message: msg
            })
          }
        })
    }
  }
}
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  /* 设置该div中的内容居中显示 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form .login-button {
  width: 100%;
}
</style>
