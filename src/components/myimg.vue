<template>
<div class="myimg">
<div class="imgbtn" @click="open">
  <img :src="value || defaultimg">
</div>
<el-dialog :visible.sync="dialogVisible" width="750px">
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="素材库" name="image">
    <el-radio-group v-model="reqParams.collect" size="small" @change="checkbtn">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
      <div class="itemlist" >
<div class="itemimg"  :class="{select:imgurl===item.url}" v-for="item in imgs" :key="item.id" @click="imgurl=item.url">
<img :src="item.url">
</div>
<el-pagination
    v-if="total>reqParams.per_page?true:false"
  background
  :page-size="reqParams.per_page"
  :current-page="reqParams.page"
  layout="prev, pager, next"
  :total="total"
  @current-change="checkpage">
</el-pagination>
</div>
    </el-radio-group>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
    <el-upload
  class="avatar-uploader"
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
  name="image"
  :headers="headers"
  :on-success="handleSuccess"
  >
  <img v-if="uploadimageUrl" :src="uploadimageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </el-tab-pane>
  </el-tabs>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confrimImg">确 定</el-button>
  </span>
</el-dialog>
 </div>
</template>

<script>
import stor from '@/stor/stor.js'
import defaultimg from '../assets/images/default.png'
export default {
  name: 'myimg',
  props: ['value'],
  data () {
    return {
      activeName: 'image',
      dialogVisible: false,
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      imgs: [],
      total: 0,
      headers: { Authorization: `Bearer ${stor.getUser().token}` },
      uploadimageUrl: null,
      imgurl: null,
      defaultimg

    }
  },
  methods: {
    open () {
      this.dialogVisible = true
      this.getImages()
      this.activeName = 'image'
      this.imgurl = null
      this.uploadimageUrl = null
    },
    confrimImg () {
      if (this.activeName === 'image') {
        this.$emit('input', this.imgurl)
      } else {
        this.$emit('input', this.uploadimageUrl)
      }
      this.dialogVisible = false
    },
    handleSuccess (res) {
      this.uploadimageUrl = res.data.url
      this.$message.success('上传成功')
    },
    checkbtn () {
      this.reqParams.page = 1
      this.getImages()
    },
    checkpage (newpage) {
      this.reqParams.page = newpage
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('/user/images', { params: this.reqParams })
      this.total = data.total_count
      this.imgs = data.results
    }
  }
}
</script>

<style scoped lang="less">
.myimg{
display: inline-block;
margin-right: 10px;
}
.imgbtn{
width: 160px;
height: 160px;
border: 1px dashed #ccc;
img{
width: 100%;
height: 100%;
display: block;
}
}
.dialog-footer{
display: block;
text-align: center;
}
.itemlist{
margin-top: 10px;
}
.itemimg{
width: 160px;
height: 120px;
position: relative;
border: 1px dashed #ccc;
display: inline-block;
margin-right: 15px;
margin-bottom: 10px;
position: relative;
&.select{
&::after{
content: "";
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0,0,0,0.2) url('../assets/images/selected.png') no-repeat center / 50px 50px;
}
}
img{
width: 100%;
height: 100%;
display: block;
object-fit: contain;
}
}
</style>
