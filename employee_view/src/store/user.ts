import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      info: {}
    }
  },
  actions: {
    updateInfo(item) {
      this.info = item
    }
  }
})
