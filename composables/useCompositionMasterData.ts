import dayjs from 'dayjs';
import { genders } from '~/utils/enum';
import {
  IJobCategories,
  IJobCategory,
  ICity,
  IProvince,
  IResponse,
} from '~/utils/interface';

export const useCompositionMasterData = () => {
  type formatDataSelect = {
    label: string;
    value: string | number;
  };

  const jobCategories = ref();
  const category = ref<IJobCategory[]>([]);

  const dataGender = computed(() => {
    return Object.entries(genders).map((elem) => ({
      value: +elem[0],
      label: elem[1],
    }));
  });

  const getGenderJa = (gender: string) => {
    return genders[gender] ?? '';
  };

  const getJobCategories = (categories: IJobCategories[], id?: number) => {
    if (id) {
      jobCategories.value = categories
        .find((el: IJobCategories) => el.id === id)
        ?.jobCategories.map((el: IJobCategory) => ({
          label: el.name,
          value: el.id,
        }));

      return jobCategories.value;
    }
    jobCategories.value = categories.map((el: IJobCategories) => ({
      label: el.name,
      value: el.id,
    }));

    return jobCategories.value;
  };

  const getJobById = (
    jobId: number | undefined,
    categories: IJobCategories[],
  ) => {
    category.value = [];

    categories.forEach((el: IJobCategories) => {
      if (el.jobCategories) {
        el.jobCategories.forEach((el: IJobCategory) => {
          category.value.push(el);
        });
      }
    });
    const cate = category.value.find((el: IJobCategory) => el.id === jobId);
    return cate?.name;
  };

  const getJobCategoryById = async (jobId?: number | string) => {
    category.value = [];
    const { data } = await useBaseFetch('/job-categories', {
      method: 'GET',
    });

    const dataCategories = data.value as IResponse;

    const categories = dataCategories.data || [];

    categories.forEach((el: IJobCategories) => {
      el.jobCategories.forEach((el: IJobCategory) => {
        category.value.push(el);
      });
    });
    const cate = category.value.find((el: IJobCategory) => el.id === jobId);
    return cate?.name;
  };

  const getCityNameById = async (cityId: number | string) => {
    const { data } = await useBaseFetch(`/cities`, {
      headers: { 'Content-Type': 'application/json' },
    });

    const dataCities = data.value as IResponse;

    const cities = dataCities.data || [];

    const city = cities.find((el: ICity) => el.id === cityId);
    return city?.name;
  };

  const getProvinceNameByID = async (provinceId: number | string) => {
    const { data } = await useBaseFetch(`/provinces`, {
      method: 'GET',
    });

    const dataProvinces = data.value as IResponse;

    const provinces = dataProvinces.data || [];

    const province = provinces.find((el: IProvince) => el.id === provinceId);
    return province?.name;
  };

  const dataYear = ref<formatDataSelect[]>([]);
  const dataMonths = ref<formatDataSelect[]>([]);
  const dataDays = ref<formatDataSelect[]>([]);

  const getYear = () => {
    dataYear.value = [];
    const currentYear = new Date().getFullYear();
    const max = currentYear;
    let min = currentYear - 100;
    for (min; min <= max; min++) {
      dataYear.value.push({
        label: min.toString(),
        value: min.toString(),
      });
    }
    return dataYear.value.reverse();
  };

  const getMonths = () => {
    dataMonths.value = [];
    for (let i = 1; i <= 12; i++) {
      dataMonths.value.push({
        label: i < 10 ? `0${i.toString()}` : i.toString(),
        value: i < 10 ? `0${i.toString()}` : i.toString(),
      });
    }

    return dataMonths.value;
  };

  const getDays = (year: number, month: number) => {
    dataDays.value = [];
    const lastDayOfMonth: number = new Date(
      Number(new Date(year || dayjs().year(), month || dayjs().month(), 1)) - 1,
    ).getDate();
    for (let i = 1; i <= lastDayOfMonth; i++) {
      dataDays.value.push({
        label: i < 10 ? `0${i.toString()}` : i.toString(),
        value: i < 10 ? `0${i.toString()}` : i.toString(),
      });
    }
    return dataDays.value;
  };

  return {
    dataYear,
    dataMonths,
    dataDays,
    dataGender,
    category,

    getYear,
    getMonths,
    getDays,
    getJobCategories,
    getJobById,
    getJobCategoryById,
    getCityNameById,
    getProvinceNameByID,
    getGenderJa,
  };
};
