<template>
  <el-card>
<mytest>素材管理</mytest>
<div class="btn">
<el-radio-group v-model="reqParams.collect" size="small" @change="checkbtn">
<el-radio-button :label="false">全部</el-radio-button>
<el-radio-button :label="true">收藏</el-radio-button>
</el-radio-group>
<el-button type="success" size="small" @click="open">添加素材</el-button>
<div class="itemlist" >
<div class="itemimg" v-for='item in imgs' :key="item.id">
<img :src="item.url">
<div class="footer" v-show="!reqParams.collect">
<span class="el-icon-star-on" :class="{select: item.is_collected}" @click="checkcllect(item)"></span>
 <span class="el-icon-delete-solid" @click="del(item.id)"></span>
</div>
</div>
</div>
    </div>
    <el-pagination
    v-if="total>10?true:false"
  background
  :page-size="reqParams.per_page"
  :current-page="reqParams.page"
  layout="prev, pager, next"
  :total="total"
  @current-change="checkpage">
</el-pagination>
<el-dialog
  title="上传素材"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <el-upload
  class="avatar-uploader"
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
  name="image"
  :headers="headers"
  :on-success="handleSuccess"
  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
</el-dialog>
  </el-card>
</template>

<script>
import stor from '@/stor/stor.js'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      imgs: [],
      total: '',
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${stor.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`/user/images/${id}`) && this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async checkcllect (item) {
      const { data: { data } } = await this.$http.put(`/user/images/${item.id}`, { collect: !item.is_collected })
      this.$message.success(data.collect ? '收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.page = 1
        this.getImages()
      }, 2000)
    },
    open () {
      this.imageUrl = null
      this.dialogVisible = true
    },
    checkpage (newpage) {
      this.reqParams.page = newpage
      this.getImages()
    },
    checkbtn () {
      this.reqParams.page = 1
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
.btn{
 margin-top: 20px;
.el-button{
float: right;
}
.itemlist{
 margin-top: 20px;}
.itemimg{
width: 160px;
height: 160px;
position: relative;
border: 1px dashed #ccc;
display: inline-block;
margin-right: 50px;
margin-bottom: 20px;
img{
width: 100%;
height: 100%;
display: block;
}
.footer{
position: absolute;
bottom: 0;
left: 0;
width: 100%;
height: 30px;
line-height: 30px;
background-color: rgba(0,0,0,0.5);
color: rgb(255,255,255);
text-align: center;
span{
margin: 0 20px;
&.select{
color: red;
}
}
}
}
}
</style>
