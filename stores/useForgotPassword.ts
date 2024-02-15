import { defineStore } from 'pinia';

export const useForgotPassword = defineStore('email', {
  state: () => {
    const email = ref<string>();

    return {
      email,
    };
  },
  actions: {
    setData(newData: string) {
      this.email = newData;
    },
  },
});
