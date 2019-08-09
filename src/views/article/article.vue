<template>
<div>
<el-card class="box-card">
  <div slot="header" class="clearfix">
  <mytest>
  内容管理
  </mytest>
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
   <mychannel v-model="resparmas.channel_id"></mychannel>
  </el-form-item>
  <el-form-item label="日期:">
     <el-date-picker
     value-format="yyyy-MM-dd"
      v-model="dataArry"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change=checkdate>
    </el-date-picker>
  </el-form-item>
  <el-form-item>
  <el-button type='primary' @click="search">筛选</el-button>
  </el-form-item>
  </el-form>
</el-card>
  <el-card>
  <div slot='header'>根据筛选条件共查询到 {{total}} 条结果</div>
  <el-table :data="tableData">
      <el-table-column label="封面">
        <template slot-scope="scope">
          <el-image
      style="width: 120px; height: 80px"
      :src="scope.row.cover.images[0]"
      fit="scale-down"
      >
         <div slot="error" class="image-slot">
        <img src="../../assets/images/error.gif" style="width: 120px; height: 80px">
      </div>
      </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.status == 0">草稿</el-tag>
        <el-tag type="info" v-if="scope.row.status == 1">待审核</el-tag>
        <el-tag type="warning" v-if="scope.row.status == 2">审核通过</el-tag>
        <el-tag type="danger" v-if="scope.row.status == 3">审核失败</el-tag>
        <el-tag type="danger" v-if="scope.row.status == 4">已删除</el-tag>
      </template>
      </el-table-column>
       <el-table-column prop="pubdate"  label="发布时间">
      </el-table-column>
       <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain circle @click="edit(scope.row.id)"></el-button>
        <el-button type="danger" icon="el-icon-delete"  plain circle @click="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 30px">
       <el-pagination
  background
  layout="prev, pager, next, total"
  :total="total"
  :page-size="resparmas.per_page"
  :current-page="resparmas.page"
  @current-change="checkoutpage"
  style="margin:0,auto">
</el-pagination>
    </div>

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
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      options: '',
      dataArry: [],
      tableData: [],
      total: 0
    }
  },
  created () {
    this.getArticle()
  },
  methods: {

    edit (id) {
      this.$router.push(`/publish/?id=${id}`)
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`/articles/${id}`)
        this.$message.success('删除文章成功')
        this.getArticle()
      }).catch(() => {

      })
    },
    checkdate (dataArry) {
      // console.log(dataArry)
      if (dataArry) {
        this.resparmas.begin_pubdate = dataArry[0]
        this.resparmas.end_pubdate = dataArry[1]
      } else {
        this.resparmas.begin_pubdate = null
        this.resparmas.end_pubdate = null
      }
    },
    search () {
      this.resparmas.page = 1
      this.getArticle()
    },
    checkoutpage (currentpage) {
      this.resparmas.page = currentpage
      this.getArticle()
    },

    async getArticle () {
      const { data: { data } } = await this.$http.get('/articles', { params: this.resparmas })
      // console.log(data)
      this.tableData = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
  .el-card{
  margin-bottom: 20px;
  }
</style>
