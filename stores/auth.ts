import { defineStore } from 'pinia';
import { ERole, EMemberType } from '~~/utils/enum';
import { handleSignIn } from '~~/utils/helper';
import { IResponse } from '~~/utils/interface';
import { useEmployerStore } from '~~/stores/employer';

export interface ISystemLogin {
  email: string;
  password: string;
  role: string | undefined;
}
export interface ISystemData {
  id: number | null;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  memberType?: string;
  currentMotivation?: null | string;
  proxyAdminId?: number | null;
}

export interface FormRegisterEmployer {
  token: string;
  avatar: string;
  background: string;
  aboutUs: string;
  governmentOfficeId: number;
  postcode: string;
  governmentDepartmentName: string;
  numberStaff: number;
  averageAge: number;
  homepageURL: string;
  businessCityId: number;
  businessAddress: string;
  businessContent: string;
  password: string;
  typeGovernmentOffice: string;
  typeGovernmentConvert: string;
  prefecture: number;
}

export const useAuthStore = defineStore('auth', {
  state: (): ISystemData => {
    return {
      id: null,
      email: '',
      firstName: '',
      lastName: '',
      role: '',
      memberType: '',
      currentMotivation: null,
      proxyAdminId: null,
    };
  },
  actions: {
    async systemLogin(body: ISystemLogin) {
      await handleSignIn('auth/sign-in', body);
    },
    setSystemData(systemData: any) {
      this.id = systemData.id;
      this.email = systemData.email;
      this.firstName = systemData?.firstName;
      this.lastName = systemData?.lastName;
      this.role = systemData?.role;
    },

    // async registerEmployer(form: any) {
    //   const { data, error } = await useBaseFetch('/auth/employers/register', {
    //     method: 'POST',
    //     body: {
    //       token: form.token,
    //       avatar: form.avatar,
    //       background: form.background,
    //       aboutUs: form.aboutUs,
    //       postcode: form.postcode,
    //       governmentDepartmentName: form.governmentDepartmentName,
    //       numberStaff: Number(form.numberStaff),
    //       averageAge: Number(form.averageAge),
    //       homepageURL: form.homepageURL,
    //       businessCityId: Number(form.businessCityId),
    //       businessAddress: form.businessAddress,
    //       businessContent: form.businessContent,
    //       password: form.password,
    //     },
    //   });
    //   if (error.value?.data) {
    //     throw error.value?.data;
    //   } else {
    //     const response = data.value as IResponse;
    //     const tokenData = response.data;
    //     if (tokenData) {
    //       return tokenData.token;
    //     }
    //   }
    // },
  },
});
