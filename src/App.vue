<template>
  <div id="app">
    <el-button type="primary">主要按钮</el-button>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style lang="less">

</style>
