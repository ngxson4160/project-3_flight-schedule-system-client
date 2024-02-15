import { defineStore } from 'pinia';
import { IResponse } from '~~/utils/interface';

export interface IStaff {
  id: Number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  avata: string | null;
  dob: Date | null;
  gender: string | null;
  role: string | null;
}

export const useStaffStore = defineStore('staff', {
  state: () => {
    const listPilot = ref<IStaff[]>([]);
    const listTourGuide = ref<IStaff[]>([]);
    return {
      listPilot,
      listTourGuide,
    };
  },
  actions: {
    setListPilot(newData: IStaff[]) {
      this.listPilot = newData;
    },
    setListTourGuide(newData: IStaff[]) {
      this.listTourGuide = newData;
    },
    async getListPilot() {
      const { data, error } = await useBaseFetch(`users`, {
        query: {
          type: 'PILOT',
        },
      });
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const listPilot = response.data as IStaff[];
        if (listPilot) this.setListPilot(listPilot);
      }
    },
    async getListTourGuide() {
      const { data, error } = await useBaseFetch(`users`, {
        query: {
          type: 'TOUR_GUIDE',
        },
      });
      if (error.value?.data) {
        throw error.value?.data;
      } else {
        const response = data.value as IResponse;
        const listTourGuide = response.data as IStaff[];

        if (listTourGuide) this.setListTourGuide(listTourGuide);
      }
    },
  },
});
