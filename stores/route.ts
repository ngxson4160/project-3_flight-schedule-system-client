import { defineStore } from 'pinia';
import { IResponse } from '~~/utils/interface';

export interface IRoute {
  id: Number | null;
  name: string | null;
  locations: Array<{
    coordinates: number[];
    description: string;
  }> | null;
  description: String | null;
  flightLength: number | null;
  duration: number | null;
  type: String | null;
  price: number | null;
}

export const useRouteStore = defineStore('route', {
  state: () => {
    const listRoute = ref<IRoute[]>([]);
    return {
      listRoute,
    };
  },
  actions: {
    setData(newData: IRoute[]) {
      this.listRoute = newData;
    },
    async getListData(params?: any) {
      const { data, error } = await useBaseFetch(`/routes`, { params });
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const listRoute = response.data as IRoute[];

        if (listRoute) this.setData(listRoute);
        return listRoute;
      }
    },
    async getDetail(id: number) {
      const { data, error } = await useBaseFetch(`/routes/${id}`, {});
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const route = response.data as IRoute;
        return route;
      }
    },
    async deleteRoute(id: number) {
      const { data, error } = await useBaseFetch(`/routes/${id}`, {
        method: 'DELETE',
      });
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const route = response.data as IRoute;
        return route;
      }
    },
    async createRoute(body: object) {
      const { data, error } = await useBaseFetch(`/routes`, {
        method: 'POST',
        body,
      });
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const route = response.data as IRoute;
        return route;
      }
    },
  },
});
