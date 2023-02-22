<template>
  <div>
    <div v-for="(item, index) of 100" :key="index">
      {{ $t('hello') }}客户管理 11
    </div>
  </div>
</template>

<script lang="ts" setup></script>
