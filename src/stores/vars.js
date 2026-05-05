import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    chosenUser: '',
    chosenPost: '',
  }),
  actions: {
    setUser(name) {
      this.chosenUser = name
    },
    setPost(value) {
      this.chosenPost = value
    }
  }
})