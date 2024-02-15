import { defineStore } from 'pinia';
import { IResponse } from '~~/utils/interface';
import { IStaff } from './staff';

export interface IWorkSchedule {
  id: number | null;
  userId: string | null;
  startTime: string | null;
  endTime: number | null;
  userName: string | null;
  date: string | null;
}

export const useWorkScheduleStore = defineStore('work-schedules', {
  state: () => {
    const listHelicopter = ref<IWorkSchedule[]>([]);
    return {
      listHelicopter,
    };
  },
  actions: {
    // setListHelicopter(newData: IHelicopter[]) {
    //   this.listHelicopter = newData;
    // },

    async getList(params: object) {
      const { data, error } = await useBaseFetch('/work-schedules', {
        method: 'GET',
        params,
      });
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const workSchedule = response.data as any[];
        for (let index = 0; index < workSchedule.length; index++) {
          workSchedule[index].startTime = `${splitDate(
            workSchedule[index].startTime,
          )} ${splitTime(workSchedule[index].startTime)}`;

          workSchedule[index].endTime = `${splitDate(
            workSchedule[index].endTime,
          )} ${splitTime(workSchedule[index].endTime)}`;

          workSchedule[index].date = `${splitDate(workSchedule[index].date)}`;

          const { data: dataRoute, error: errorRoute } = await useBaseFetch(
            `/users/${workSchedule[index].userId}`,
            {},
          );
          if (errorRoute.value?.data) {
            throw errorRoute.value?.data;
          } else {
            const response = dataRoute.value as IResponse;
            const user = response.data;
            workSchedule[index].userName = `${user.firstName} ${user.lastName}`;
          }
        }
        return workSchedule;
      }
    },
  },
});
