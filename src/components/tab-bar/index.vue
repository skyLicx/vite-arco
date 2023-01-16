<template>
  <div>
    <a-tag
      v-for="(tag, index) in tagList"
      :key="tag.fullPath"
      :class="{ 'link-activated': tag.fullPath === $route.fullPath }"
      @click="goto(tag)"
    >
      <span class="tag-link">
        {{ tag.title }}
      </span>
      <span
        class="arco-icon-hover arco-tag-icon-hover arco-icon-hover-size-medium arco-tag-close-btn"
        @click.stop="tagClose(tag, index)"
      >
        <icon-close />
      </span>
    </a-tag>
  </div>
</template>

<script lang="ts" setup>
  import { useTabBarStore } from '@/store'
  import { useRouter } from 'vue-router'
  import { computed, ref, watch } from 'vue'
  import type { TagProps } from '@/store/modules/tab-bar/types'

  const tabBarStore = useTabBarStore()
  const tagList = computed(() => {
    return tabBarStore.getTabList
  })

  const router = useRouter()
  // 当前路由的name
  const currentRouteName = ref('')
  watch(
    // 监听当前路由
    () => router.currentRoute.value,
    (route) => {
      currentRouteName.value = route.name as string
      // 过滤重复标签
      if (!tagList.value.some((tag) => tag.fullPath === route.fullPath)) {
        // 更新标签栏 插入新的标签
        tabBarStore.updateTabList(route)
      }
    },
    {
      immediate: true
    }
  )

  // 路由跳转
  const goto = (tag: TagProps) => {
    router.push({ ...tag })
  }

  // 关闭标签
  const tagClose = (tag: TagProps, idx: number) => {
    tabBarStore.deleteTag(idx, tag)
    // 判断删除的是否是当前选中项
    const active = tabBarStore.tagList.find(
      (e) => e.name === currentRouteName.value
    )
    if (!active) {
      const latest = tagList.value[tagList.value.length - 1]
      router.push({ name: latest.name })
    }
  }
</script>

<style lang="scss" scoped>
  .link-activated {
    background-color: #a1b3ea;
  }
</style>
