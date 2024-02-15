import { defineStore } from 'pinia';
import { IResponse } from '~~/utils/interface';

export interface IHelicopter {
  id: number | null;
  name: string | null;
  description: string | null;
  img: number | null;
  type: number | null;
  engine: string | null;
  speed: number | null;
  capacity: number | null;
}

export const useHelicopterStore = defineStore('helicopter', {
  state: () => {
    const listHelicopter = ref<IHelicopter[]>([]);
    return {
      listHelicopter,
    };
  },
  actions: {
    setListHelicopter(newData: IHelicopter[]) {
      this.listHelicopter = newData;
    },

    async getListHelicopter() {
      const { data, error } = await useBaseFetch(`/helicopters`, {});
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const listHelicopter = response.data as IHelicopter[];

        if (listHelicopter) this.setListHelicopter(listHelicopter);
        return listHelicopter;
      }
    },

    async getDetail(id: number) {
      const { data, error } = await useBaseFetch(`/helicopters/${id}`, {});
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const helicopter = response.data as IHelicopter;
        return helicopter;
      }
    },

    async createHelicopter(body: object) {
      const { data, error } = await useBaseFetch(`/helicopters`, {
        method: 'POST',
        body,
      });
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const route = response.data as IHelicopter;
        return route;
      }
    },

    async deleteHelicopter(id: number) {
      const { data, error } = await useBaseFetch(`/helicopters/${id}`, {
        method: 'DELETE',
      });
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const route = response.data as IHelicopter;
        return route;
      }
    },
  },
});
