<template>
  <div>
    基础数据
    <input v-model="text" type="text" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const text = ref('xxx')
  console.log('....')
</script>
<script lang="ts">
  export default {
    // 要写name才能缓存路由
    name: 'BaseData'
  }
</script>
