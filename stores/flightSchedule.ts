import { defineStore } from 'pinia';
import { IResponse } from '~~/utils/interface';
import { IStaff } from './staff';

export interface IHelicopter {
  id: number | null;
  name: string | null;
  description: string | null;
  img: number | null;
  type: number | null;
  engine: string | null;
  speed: number | null;
}

export interface IListResource {
  pilots: IStaff[];
  tourGuides: IStaff[];
  helicopters: IHelicopter[];
}

export const useFlightScheduleStore = defineStore('flight-schedule', {
  state: () => {
    const listHelicopter = ref<IHelicopter[]>([]);
    return {
      listHelicopter,
    };
  },
  actions: {
    // setListHelicopter(newData: IHelicopter[]) {
    //   this.listHelicopter = newData;
    // },

    async getListFlight(params: object) {
      const { data, error } = await useBaseFetch('/flight-schedules', {
        method: 'GET',
        params,
      });
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const resultPromises = data.value?.data.map(async (el: any) => {
          const { data: helicopter } = await useBaseFetch(
            `/helicopters/${el.helicopterId}`,
            {},
          );
          const { data: route } = await useBaseFetch(
            `/routes/${el.routeId}`,
            {},
          );
          const customer = el.user.find(
            (user: any) => user.role === 'CUSTOMER',
          );
          const pilot = el.user.find((user: any) => user.role === 'PILOT');
          const tourGuide = el.user.find(
            (user: any) => user.role === 'TOUR_GUIDE',
          );
          return {
            id: el.id,
            customer: customer
              ? `${customer.firstName} ${customer.lastName}`
              : '',
            route: route.value?.data.name,
            startTime: `${splitDate(el.start)} ${splitTime(el.start)}`,
            endTime: `${splitDate(el.end)} ${splitTime(el.end)}`,
            date: splitDate(el.date),
            helicopter: helicopter.value?.data.name,
            pilot: `${pilot.firstName} ${pilot.lastName}`,
            tourGuide: `${tourGuide.firstName} ${tourGuide.lastName}`,
            price: `${el.price}$`,
            status: convertValueEnum(el.status),
            duration: el.duration,
            type: convertValueEnum(el.type),
          };
        });

        return await Promise.all(resultPromises);
      }
    },

    async getListResourcesAvailable(params: object) {
      const { data, error } = await useBaseFetch(
        '/flight-schedules/get-list-resources-available',
        {
          method: 'GET',
          params,
        },
      );
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const listResource = response.data as IListResource;
        return listResource;
      }
    },

    async createFlightScheduleAdventure(body: object) {
      const { data, error } = await useBaseFetch('/flight-schedules', {
        method: 'POST',
        body: body,
      });
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as any;
        const listResource = response.data as IListResource;
        return { listResource, message: response.message };
      }
    },
  },
});
