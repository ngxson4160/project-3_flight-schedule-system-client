export const useMessageScreen = () => {
  const getApplicantDetail = async (id: number) => {
    try {
      return await useBaseFetch(`employers/profile/applicants/${id}`, {});
    } catch (error) {}
  };

  const getJobDetail = async (id: string) => {
    try {
      return await useBaseFetch(`employers/profile/jobs/${id}`, {});
    } catch (error) {}
  };

  return {
    getApplicantDetail,
    getJobDetail,
  };
};
