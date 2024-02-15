import { defineStore } from 'pinia';
import { IResponse } from '~~/utils/interface';

export const uploadFileStore = defineStore('upload', {
  actions: {
    async uploadFiles(formData: any) {
      const { data, error } = await useBaseFetch(`/upload`, {
        method: 'POST',
        body: formData,
      });
      if (error.value?.data) {
        return '';
      } else {
        const response = data.value as IResponse;
        const dataUpload = response.data;
        if (dataUpload) {
          return dataUpload;
        }
      }
    },

    async getFileSize(url: string) {
      const { data, error } = await useBaseFetch(
        `/upload/size?link=${url}`,
        {},
      );
      if (error.value?.data) {
        return {
          size: 0,
        };
      } else {
        const response = data.value as IResponse;
        const dataUpload = response.data;
        if (dataUpload) {
          return dataUpload;
        }
      }
    },
  },
});
