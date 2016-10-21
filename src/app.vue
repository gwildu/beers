<style lang="less">
  @import "style/index.less";
</style>

<template>
  <section id="app">
    
    <gwi-header></gwi-header>
    
    <router-view></router-view>
    
  </section>
</template>

<script>
  import header from 'component_header'
  
  export default {
    components: {
      'gwi-header': header
    }
  }
</script>