import { defineStore } from 'pinia'

export const useSysStore = defineStore('sysStore', {
  state: () => {
    return {
      isCollapse: localStorage.getItem('isCollapse') == 'false' ? false : true,
      token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
    }
  },
  actions: {
    updateCollapse() {
      this.isCollapse = !this.isCollapse
      this.saveToStorge()
    },
    updateToken(token) {
      this.token = token
      this.tokenSaveToStorage()
    },
    tokenSaveToStorage() {
      localStorage.setItem('token', this.token as string)
    },
    saveToStorge() {
      localStorage.setItem('isCollapse', this.isCollapse as any)
    }
  },
  getters: {}
})
