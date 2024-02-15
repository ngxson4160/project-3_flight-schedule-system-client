import { defineStore } from 'pinia';
import { ElLoading } from 'element-plus';

export const useLoading = defineStore('loading', {
  state: () => {
    const loading = ref<any>(null);
    return {
      loading,
    };
  },
  actions: {
    onLoading() {
      this.loading = ElLoading.service({
        fullscreen: true,
        lock: true,
        text: '',
        background: 'rgba(0, 0, 0, 0.7)',
      });
    },

    closeLoading() {
      setTimeout(() => {
        this.loading.close();
      }, 2000);
    },
  },
});
