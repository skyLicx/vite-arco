import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  actions: {
    // 重置用户信息
    resetInfo() {
      this.$reset()
    },
    // 退出登录
    logout() {
      this.resetInfo()
    }
  }
})

export default useUserStore
