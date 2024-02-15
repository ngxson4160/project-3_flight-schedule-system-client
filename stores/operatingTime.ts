import { defineStore } from 'pinia';
import { IResponse } from '~~/utils/interface';
import { IStaff } from './staff';

export interface IOperatingTime {
  id: number | null;
  routeId: string | null;
  startMorning: string | null;
  endMorning: number | null;
  startAfternoon: number | null;
  endAfternoon: string | null;
  date: number | null;
  routeName: string | null;
}

export const useOperatingTimeStore = defineStore('operating-time', {
  state: () => {
    const listHelicopter = ref<IOperatingTime[]>([]);
    return {
      listHelicopter,
    };
  },
  actions: {
    // setListHelicopter(newData: IHelicopter[]) {
    //   this.listHelicopter = newData;
    // },

    async getList(params: object) {
      const { data, error } = await useBaseFetch('/adventure-operating-times', {
        method: 'GET',
        params,
      });
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const operatingTime = response.data as any[];
        for (let index = 0; index < operatingTime.length; index++) {
          operatingTime[index].startMorning = `${splitDate(
            operatingTime[index].startMorning,
          )} ${splitTime(operatingTime[index].startMorning)}`;

          operatingTime[index].endMorning = `${splitDate(
            operatingTime[index].endMorning,
          )} ${splitTime(operatingTime[index].endMorning)}`;

          operatingTime[index].startAfternoon = `${splitDate(
            operatingTime[index].startAfternoon,
          )} ${splitTime(operatingTime[index].startAfternoon)}`;

          operatingTime[index].endAfternoon = `${splitDate(
            operatingTime[index].endAfternoon,
          )} ${splitTime(operatingTime[index].endAfternoon)}`;

          const { data: dataRoute, error: errorRoute } = await useBaseFetch(
            `/routes/${operatingTime[index].routeId}`,
            {},
          );
          if (errorRoute.value?.data) {
            throw errorRoute.value?.data;
          } else {
            const response = dataRoute.value as IResponse;
            const route = response.data;
            operatingTime[index].routeName = route.name;
          }
        }
        console.log(operatingTime);
        return operatingTime;
      }
    },
  },
});
