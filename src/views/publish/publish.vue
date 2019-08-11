<template>
  <div class="article-container">
  <el-card>
<div slot="header">
<mytest>{{articleId?'编辑':'发布'}}文章</mytest>
</div>
<el-form label-width="100px" size="small">
<el-form-item label="标题:" style="width: 400px">
<el-input v-model="articleForm.title"></el-input>
</el-form-item>
<el-form-item label="内容:">
<quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
</el-form-item>
<el-form-item label="封面:">
<el-radio-group v-model="articleForm.cover.type" @change="checktype">
    <el-radio :label="1">单图</el-radio>
    <el-radio :label="3">三图</el-radio>
    <el-radio :label="0">无图</el-radio>
    <el-radio :label="-1">自动</el-radio>

  </el-radio-group>
  <div v-if="articleForm.cover.type == 1">
    <myimg v-model="articleForm.cover.images[0]"></myimg>
  </div>
  <div v-if="articleForm.cover.type == 3">
    <myimg v-model="articleForm.cover.images[0]"></myimg>
    <myimg v-model="articleForm.cover.images[1]"></myimg>
    <myimg v-model="articleForm.cover.images[2]"></myimg>
  </div>
</el-form-item>
<el-form-item label="频道:">
<mychannel v-model="articleForm.channel_id"></mychannel>
</el-form-item>
<el-form-item v-if="!articleId">
<el-button type="primary" @click="submit(false)">发表</el-button>
<el-button @click="submit(true)">存入草稿</el-button>
</el-form-item>
<el-form-item v-else>
<el-button type="primary" @click="update(false)">保存</el-button>
<el-button @click="update(true)">存入草稿</el-button>
</el-form-item>
</el-form>
  </el-card>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'

export default {
  data () {
    return {
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      },
      articleForm: {
        channel_id: null,
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }
      },
      articleId: null
    }
  },
  components: {
    quillEditor
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getArticle()
    }
  },
  watch: {
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.articleForm = {
          channel_id: null,
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          }
        }
      }
    }
  },
  methods: {
    async update (draft) {
      await this.$http.put(`/articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '保存成功')
      this.$router.push('/article')
    },
    async getArticle () {
      const { data: { data } } = await this.$http.get('/articles/' + this.articleId)
      this.articleForm = data
    },
    checktype () {
      this.articleForm.cover.images = []
    },
    async submit (draft) {
      await this.$http.post(`/articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang="less">

</style>
