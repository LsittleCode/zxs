import { defineStore } from 'pinia'

interface list {
  path: string
  name: string
}
export const useBreadStore = defineStore('BreadStore', {
  state: () => {
    return {
      breadList: [] as list[]
    }
  },
  actions: {
    updateBreadList(item: list): void {
      if (
        !item.name ||
        item.path == '/dashboard' ||
        this.breadList.findIndex((e) => e.path == item.path) != -1
      ) {
        return
      }
      this.breadList.push(item)
    },
    delBread(path: string) {
      this.breadList = this.breadList.filter((e) => {
        return e.path != path
      })
    }
  }
})
