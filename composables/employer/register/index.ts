interface FormSignUp {
  email: string;
  governmentOfficeId: number;
  homepageURL: string;
  firstName: string;
  lastName: string;
  governmentDepartmentName: string;
  phoneNumber: string;
}

export const useEmpRegister = () => {
  const token = ref('');

  const setToken = (data: string) => {
    token.value = data;
  };

  const signUp = async (item: FormSignUp) => {
    return await useBaseFetch('/auth/employers/sign-up', {
      method: 'POST',
      body: {
        email: item.email,
        governmentOfficeId: item.governmentOfficeId,
        homepageURL: item.homepageURL,
        firstName: item.firstName,
        lastName: item.lastName,
        governmentDepartmentName: item.governmentDepartmentName,
        phoneNumber: item.phoneNumber,
      },
    });
  };

  return {
    token,
    setToken,
    signUp,
  };
};
