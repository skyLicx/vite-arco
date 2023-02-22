<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <keep-alive :include="cacheList">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useTabBarStore } from '@/store'

  const tabBarStore = useTabBarStore()
  // 缓存路由列表
  const cacheList = computed(() => {
    return tabBarStore.getCacheList
  })
</script>
