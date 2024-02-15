import { useAuthStore } from '~~/stores/auth';

export const useMemberType = () => {
  const authStore = useAuthStore();
  handleGetProviders();
  const memberType = authStore.metaData?.memberType;
  return memberType;
};
