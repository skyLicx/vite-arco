<template>
  <div>
    模板分类
    <input v-model="text2" type="text" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const text2 = ref('111')
</script>
<script lang="ts">
  export default {
    name: '模板分类'
  }
</script>
