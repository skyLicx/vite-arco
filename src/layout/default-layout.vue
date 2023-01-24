<template>
  <a-layout class="layout">
    <!-- 侧边栏 -->
    <a-layout-sider
      class="layout-sider"
      breakpoint="xl"
      :collapsed="false"
      :collapsible="true"
      :width="220"
      :hide-trigger="true"
    >
      <div class="menu-wrapper">
        <Menu />
      </div>
    </a-layout-sider>
    <!-- 主体 -->
    <a-layout class="layout-main">
      <!-- 标签栏 -->
      <TabBar />
      <!-- 内容 -->
      <a-layout-content class="layout-content">
        <PageLayout />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import Menu from '@/components/menu/index.vue'
  import TabBar from '@/components/tab-bar/index.vue'
  import PageLayout from './page-layout.vue'
</script>

<style scoped lang="scss">
  .layout {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: aqua;
  }
  .layout-sider {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    &::after {
      position: absolute;
      top: 0;
      right: -1px;
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--color-border);
      content: '';
    }

    > :deep(.arco-layout-sider-children) {
      overflow-y: hidden;
    }
  }

  .menu-wrapper {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    :deep(.arco-menu) {
      ::-webkit-scrollbar {
        width: 12px;
        height: 4px;
      }

      ::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        background-clip: padding-box;
        border-radius: 7px;
        background-color: var(--color-text-4);
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-text-3);
      }
    }
  }

  .layout-main {
    padding-left: 220px;
    min-height: 100vh;
    overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
  .layout-content {
    background-color: rgb(185, 240, 231);
  }
</style>
