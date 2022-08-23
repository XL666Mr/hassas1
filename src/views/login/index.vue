Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@XL666Mr 
XL666Mr
/
hrsaas
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
hrsaas/src/views/login/index.vue
@XL666Mr
XL666Mr 左侧侧边栏样式完成
Latest commit 913edb5 2 days ago
 History
 1 contributor
198 lines (181 sloc)  4.17 KB

<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="loginForm"
      :rules="loginFormRules"
    >
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="" />
        </h3>
      </div>
      <!-- admin -->
      <el-form-item prop="mobile">
        <i class="el-icon-user-solid svg-container"></i>
        <el-input v-model="loginForm.mobile"> </el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <i class="svg-container"><svg-icon iconClass="password"></svg-icon></i>
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-button
        class="loginBtn"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="login"
        :loading="isLogin"
      >
        登录
      </el-button>

      <div class="tips">
        <span style="margin-right: 20px">账号: admin</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isLogin: false,
      loginForm: {
        mobile: '13800000001',
        password: '123456'
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  watch: {},
  methods: {
    async login() {
      this.isLogin = true
      try {
        await this.$refs.loginForm.validate()
        await this.$store.dispatch('user/getToken', this.loginForm)
        this.$router.push('/')
        this.$message.success('登录成功')
      } catch (error) {
      } finally {
        this.isLogin = true
      }
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #68b0fe;
$cursor: #68b0fe;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
