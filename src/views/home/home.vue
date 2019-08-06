<template>
<el-container class="wapper">
<el-aside :width="iscollapse?'64px':'200px'">
<div class="logo" :class="{ minilogo: iscollapse }"></div>
<el-menu
    :default-active="$route.path"
     background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="iscollapse"
      :collapse-transition="false"
      router>
      <el-menu-item index="/">
    <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
    <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/img">
    <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
    <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
    <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
    <i class="el-icon-present"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
    <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
      </el-menu>
</el-aside>
<el-container>
<el-header>
<span class="el-icon-s-fold" @click=show></span>
<span class="test">江苏传智播客科技教育有限公司</span>
<el-dropdown class="my-dropdown">
<span class="el-dropdown-link">
<img :src="photo">{{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
</span>
<el-dropdown-menu slot="dropdown">
<el-dropdown-item icon="el-icon-setting" @click.native='setting'>
个人设置</el-dropdown-item>
<el-dropdown-item icon="el-icon-unlock" @click.native='logout'>

退出登录</el-dropdown-item>
</el-dropdown-menu>
</el-dropdown>
</el-header>
<el-main>
<router-view></router-view>
</el-main>
</el-container>
</el-container>

</template>

<script>
import stor from '../../stor/stor.js'
export default {
  data () {
    return {
      iscollapse: false,
      name: '',
      photo: ''
    }
  },
  methods: {
    show () {
      this.iscollapse = !this.iscollapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      stor.removeUser()
      this.$router.push('/login')
    }
  },
  created () {
    this.name = stor.getUser().name
    this.photo = stor.getUser().photo
  }
}
</script>

<style scoped lang="less">
.wapper{
width: 100%;
height: 100%;
position: absolute;
left: 0;
top: 0;
.el-aside{
background-color: #002033;
.logo{
width: 100%;
height: 60px;
background: #002244 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto;
}
.minilogo{
background-image: url(../../assets/images/logo_admin_01.png);
background-size: 36px;
}
.el-menu{
border-right: none;
}
}

.el-header{
border-bottom: 1px solid #ccc;
line-height: 60px;
.el-icon-s-fold{
font-size: 24px;
vertical-align: middle;
}
.test{
vertical-align: middle;
margin-left: 10px;
}
.my-dropdown{
float: right;
.el-dropdown-link{
font-weight: bold;
img{width: 30px;vertical-align: middle;}
span{vertical-align: middle;}
}
}
}
}
</style>
