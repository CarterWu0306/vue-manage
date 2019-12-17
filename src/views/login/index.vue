<template>
  <div class="pagewrap">
    <div class="main" id="screen" style="height: 969px;">
      <div class="login-page htgl-login">
        <div class="bottom-bg">
          <img src="../../assets/login_image/bottom_bg.png">
        </div>
        <div class="yun-img">
          <div class="yun-list">
            <div class="yun">
              <i class="ico ico-yun1"></i>
              <i class="ico ico-yun2"></i>
              <i class="ico ico-yun3"></i>
              <i class="ico ico-yun4"></i>
              <i class="ico ico-yun5"></i>
            </div>
            <div class="yun">
              <i class="ico ico-yun2"></i>
              <i class="ico ico-yun3"></i>
              <i class="ico ico-yun4"></i>
              <i class="ico ico-yun5"></i>
              <i class="ico ico-yun6"></i>
            </div>
          </div>
        </div>
        <div class="login-block">
          <div class="login-container">
            <div class="login-block">
              <el-form ref="loginForm"
                       :model="loginForm"
                       :rules="loginRules"
                       class="login-form" auto-complete="on" label-position="left">
                <div class="title-container">
                  <h3 class="title">销售管理系统</h3>
                </div>
                <el-form-item prop="username">
                  <span class="svg-container">
                    <svg-icon icon-class="user"/>
                  </span>
                  <el-input style="font-size: 16px"
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="用户名"
                    name="username"
                    type="text"
                    tabindex="1"
                    auto-complete="on">
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                 <span class="svg-container">
                   <svg-icon icon-class="password"></svg-icon>
                 </span>
                  <el-input style="font-size: 16px"
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="密码"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin"></el-input>
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
                 </span>
                </el-form-item>

                <div>
                  <el-button :loading="loading" type="primary" style="width:100%;height:50px;margin-bottom:30px;font-weight: bold;font-size: 18px;"
                             @click.native.prevent="handleLogin">登录
                  </el-button>
                </div>

                <div class="tips" style="font-size: 20px;">
                  测试用户:
                  <span style="margin-right:80px;">帐号: admin</span>
                  <span> 密码: 123123</span>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码必须大于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({path: this.redirect || '/'})
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
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
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>

  @import "../../assets/css/login.css";
  @import "../../assets/css/basic.css";

  $bg: #b3f6ff;
  $dark_gray: #889aa4;
  $light_gray: #ee7893;

  .login-container {

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 240px 35px 0;
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
        font-size: 40px;
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
