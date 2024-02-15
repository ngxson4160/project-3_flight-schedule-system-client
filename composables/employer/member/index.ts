export const useMemberEmployer = () => {
  const getListMember = async (page: number) => {
    try {
      onLoading();
      return await useBaseFetch(
        `employers/profile/members?page=${page}&limit=10`,
        {},
      );
    } catch (error) {
    } finally {
      closeLoading();
    }
  };

  const addMember = async (form: { email: string; memberType: string }) => {
    return await useBaseFetch(`auth/members/invite`, {
      method: 'POST',
      body: {
        email: form.email,
        memberType: form.memberType,
      },
    });
  };

  const removeMember = async (id: number) => {
    try {
      return await useBaseFetch(`employers/profile/members/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {}
  };

  return {
    getListMember,
    removeMember,
    addMember,
  };
};
