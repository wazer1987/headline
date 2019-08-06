<template>
<div>
<el-card class="box-card">
  <div slot="header" class="clearfix">
  <mianbao>
  内容管理
  </mianbao>
  </div>
  <el-form label-width="60px" size='small'>
  <el-form-item label="状态: ">

  <el-radio-group v-model="resparmas.status">
    <el-radio :label="null">全部</el-radio>
    <el-radio :label="0">草稿</el-radio>
    <el-radio :label="1">待审核</el-radio>
    <el-radio :label="2">审核通过</el-radio>
    <el-radio :label="3">审核失败</el-radio>
  </el-radio-group>

  </el-form-item>
  <el-form-item label="频道:" style="margin-right: 10px">
   <el-select v-model="resparmas.channel_id" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="日期:">
     <el-date-picker
      v-model="dataArry"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
  <el-button type='primary'>筛选</el-button>
  </el-form-item>
  </el-form>
</el-card>

</div>
</template>

<script>

export default {

  data () {
    return {
      resparmas: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      options: [{ name: 'js', id: 1 }, { name: 'html', id: 3 }, { name: 'css', id: 2 }],
      dataArry: []
    }
  },
  created () {
    this.$http.get('articles').then(res => {
      console.log(res)
    })
  }
}
</script>

<style scoped lang="less">

</style>
