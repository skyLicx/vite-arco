<template>
  <div class="tab-bar-container">
    <a-affix ref="affixRef" :offset-top="0">
      <div class="tab-bar-box">
        <div class="tab-bar-scroll">
          <div class="tags-wrap">
            <a-tag
              v-for="(tag, index) in tagList"
              :key="tag.fullPath"
              class="tag"
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
        </div>
      </div>
    </a-affix>
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
      if (
        !route.meta?.noAffix &&
        !tagList.value.some((tag) => tag.fullPath === route.fullPath)
      ) {
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
    console.log(active, 'active')
    if (!active) {
      const latest = tagList.value[tagList.value.length - 1]
      router.push({ name: latest.name })
    }
  }
</script>

<style lang="scss" scoped>
  .tab-bar-container {
    background-color: #fff;

    position: relative;
    .tab-bar-box {
      padding: 0 0 0 20px;
      border-bottom: 1px solid #ccc;
      display: flex;
      background-color: #fff;
      .tab-bar-scroll {
        height: 32px;
        flex: 1;
        overflow: hidden;
        .tags-wrap {
          padding: 4px 0;
          white-space: nowrap;
          overflow-x: auto;
          height: 48px;
          .tag {
            margin-right: 6px;
          }
        }
      }
    }
  }
  .link-activated {
    background-color: #a1b3ea;
  }
</style>
