<template>
<el-select :value="value" placeholder="请选择" clearable @change="transmit">
<el-option
  v-for="item in options"
  :key="item.id"
  :label="item.name"
  :value="item.id">
</el-option>
</el-select>
</template>

<script>
export default {
  name: 'mychannel',
  props: ['value'],
  data () {
    return {
      options: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('/channels')
      this.options = data.channels
    },
    transmit (value) {
      if (value === '') {
        value = null
      }
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped lang="less">

</style>
