import { IResponse } from '~/utils/interface';
import { useEmployerStore } from '~~/stores/employer';
export const employerProfile = () => {
  const employer = ref();
  const employerId = ref();
  const dataProfile = ref();
  const dataStorage = useCookie('auth.system-data');

  if (dataStorage.value) employer.value = handleJWTDecrypt(dataStorage.value);

  employerId.value = employer.value?.id;

  const getProfile = async () => {
    const { dataProfileInRefresh, setDataProfileInRefresh } =
      useEmployerStore();

    if (dataProfileInRefresh && employerId.value === dataProfileInRefresh?.id) {
      return (dataProfile.value = dataProfileInRefresh);
    } else {
      const { data } = await useBaseFetch(`/employers/${employerId.value}`, {
        method: 'GET',
      });
      const dataEmployer = data.value as IResponse;

      if (dataEmployer.data) {
        dataProfile.value = dataEmployer.data;
        setDataProfileInRefresh(dataEmployer.data);

        if (!dataEmployer.data.socialLinks) {
          dataEmployer.data.socialLinks = {
            twitter: '',
            facebook: '',
            instagram: '',
            youTube: '',
            note: '',
          };
        }

        const govermentName = useLocalStorage('governmentName', '');
        govermentName.value = dataEmployer.data?.government?.name;
      } else {
        return (dataProfile.value = []);
      }
      return dataProfile.value;
    }
  };
  return {
    dataProfile,
    getProfile,
    employerId,
  };
};
