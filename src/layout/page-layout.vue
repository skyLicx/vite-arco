<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="cacheList">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useTabBarStore } from '@/store'

  const tabBarStore = useTabBarStore()
  // 缓存路由列表
  const cacheList = computed(() => tabBarStore.getCacheList)
</script>
