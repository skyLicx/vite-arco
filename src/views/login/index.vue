<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { usePermissionStore } from '@/store'

  const router = useRouter()
  const appStore = usePermissionStore()
  const login = async () => {
    // 获取权限路由
    try {
      // 跳转到需要的路由
      await appStore.getServerMenuConfig()
      router.push({
        name: '基础数据'
      })
    } catch (error) {
      console.log(error, 'xx')
    }
  }
</script>

<template>
  <a-button type="primary" @click="login">Primary</a-button>
  <div>login</div>
</template>

<style></style>
