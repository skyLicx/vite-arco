<template>
  <div class="navbar">
    <ul>
      <li>
        <a-tooltip :content="$t('language')">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="setDropDownVisible"
          >
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click" @select="changeLocale as any">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption
              v-for="item in locales"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { LOCALE_OPTIONS } from '@/locale'
  import useLocale from '@/hooks/locale'
  import { ref } from 'vue'

  const { changeLocale } = useLocale()
  const locales = [...LOCALE_OPTIONS]

  const triggerBtn = ref()
  const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
    triggerBtn.value.dispatchEvent(event)
  }
</script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 60px;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
    position: relative;
    // position: fixed;
    // top: 0;
    // left: 0;
    // z-index: 100;
    // width: 100%;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }
  .trigger-btn {
    margin-left: 14px;
  }
</style>
