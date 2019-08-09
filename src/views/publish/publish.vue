<template>
  <el-card>
<div slot="header">
<mytest>发布文章</mytest>
</div>
<el-form label-width="100px" size="small">
<el-form-item label="标题:" style="width: 400px">
<el-input v-model="articleForm.title"></el-input>
</el-form-item>
<el-form-item label="内容:">
富文本
</el-form-item>
<el-form-item label="封面:">
<el-radio-group v-model="articleForm.cover.type">
    <el-radio :label="1">单图</el-radio>
    <el-radio :label="3">三图</el-radio>
    <el-radio :label="0">无图</el-radio>
    <el-radio :label="-1">自动</el-radio>

  </el-radio-group>
  <div class="imgbtn">
    <img src="../../assets/images/default.png">
    </div>
</el-form-item>
<el-form-item label="频道:">
<mychannel v-model="articleForm.channel_id"></mychannel>
</el-form-item>
<el-form-item>
<el-button type="primary">发表</el-button>
<el-button>存入草稿</el-button>
</el-form-item>
</el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        channel_id: null,
        title: '',
        cover: {
          type: 1
        }

      }
    }
  }
}
</script>

<style scoped lang="less">
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
</style>
