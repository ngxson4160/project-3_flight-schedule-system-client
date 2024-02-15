import { defineStore } from 'pinia';

interface TypeStep2 {
  numberStaff: string;
  averageAge: string;
  homepageURL: string;
  businessCityId: string;
  businessAddress: string;
  businessContent: string;
  postcode: string;
  governmentDepartmentName: string;
  typeGovernmentConvert: string;
  provinId: string;
  citiesName: string;
  governmentName: string;
  provinceName: string;
}

export const useAdminStore = defineStore('adminStore', {
  state: () => {
    const token = ref<string>('');
    const formRegisterStore = ref({
      token: '',
      avatar: '',
      background: '',
      aboutUs: '',
      governmentOfficeId: 1,
      postcode: '',
      governmentDepartmentName: '',
      numberStaff: '',
      averageAge: '',
      homepageURL: '',
      businessCityId: '',
      businessAddress: '',
      businessContent: '',
      password: '',
      typeGovernmentOffice: '',
      typeGovernmentConvert: '',
      prefecture: 0,
      provinId: '',
      citiesName: '',
      governmentName: '',
      provinceName: '',
    });

    const isShowMessage = ref<boolean>(false);

    return {
      token,
      formRegisterStore,

      isShowMessage,
    };
  },
  actions: {
    setTokenEmployer(data: string) {
      this.token = data;
    },
    setIsShowMessage(data: boolean) {
      this.isShowMessage = data;
    },

    setSteps1(data: { avatar: string; background: string; aboutUs: string }) {
      this.formRegisterStore.avatar = data.avatar;
      this.formRegisterStore.background = data.background;
      this.formRegisterStore.aboutUs = data.aboutUs;
    },

    setSteps2(data: TypeStep2) {
      this.formRegisterStore.numberStaff = data.numberStaff;
      this.formRegisterStore.averageAge = data.averageAge;
      this.formRegisterStore.homepageURL = data.homepageURL;
      this.formRegisterStore.businessCityId = data.businessCityId;
      this.formRegisterStore.businessAddress = data.businessAddress;
      this.formRegisterStore.businessContent = data.businessContent;
      this.formRegisterStore.postcode = data.postcode;
      this.formRegisterStore.governmentDepartmentName =
        data.governmentDepartmentName;
      this.formRegisterStore.typeGovernmentConvert = data.typeGovernmentConvert;
      this.formRegisterStore.provinId = data.provinId;
      this.formRegisterStore.citiesName = data.citiesName;
      this.formRegisterStore.governmentName = data.governmentName;
      this.formRegisterStore.provinceName = data.provinceName;
    },
    setSteps3(password: string) {
      this.formRegisterStore.password = password;
    },

    async checkToken(token: string) {
      const { data, error } = await useBaseFetch(`/auth/check-token`, {
        method: 'POST',
        body: { token },
      });
      if (error.value?.data) {
        return error.value?.data;
      } else {
        return data;
      }
    },
  },
});
