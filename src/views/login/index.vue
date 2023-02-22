<script lang="ts" setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const login = async () => {
    // 获取权限路由
    try {
      localStorage.setItem('token', '1')
      router.push({
        path: '/systemData/baseData'
      })
    } catch (error) {
      console.log(error)
    }
  }
</script>

<template>
  <a-button type="primary" @click="login">Primary</a-button>
  <div>login</div>
</template>

<style></style>
