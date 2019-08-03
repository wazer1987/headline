<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png">
     <el-form ref="loginForm" :model="loginForm" :rules="rulesLogin" status-icon>
       <el-form-item prop="mobile">
         <el-input  v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
       </el-form-item>
       <el-form-item prop="code">
         <el-input placeholder="请输入验证码" v-model="loginForm.code" style="width:236px;margin-right:10px"></el-input>
         <el-button>发送验证码</el-button>
       </el-form-item>
       <el-form-item>
         <el-checkbox :value="true">我已经阅读并同意用户条款和隐私内容</el-checkbox>
       </el-form-item>
       <el-form-item>
         <el-button @click="login" type="primary" style="width: 100%">登陆</el-button>
       </el-form-item>
     </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    const servicemobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}/.test(value)) {
        return callback(new Error('手机格式不对'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      rulesLogin: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: servicemobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http
            .post(`http://ttapi.research.itcast.cn/mp/v1_0/authorizations`, this.loginForm)
            .then(result => { this.$router.push({ path: '/' }) })
            .catch(() => {
              this.$alert('请重新输入', '用户名或密码不正确', {
                confirmButtonText: '确定' })
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container{
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .my-card{
   width: 400px;
   height: 350px;
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);
   img{
    width: 200px;
    display: block;
    margin: 0 auto 30px;
  }
}
}
</style>
