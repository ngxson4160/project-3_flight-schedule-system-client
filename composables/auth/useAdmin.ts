import { ERole } from '~~/utils/enum';
import { useAuthStore } from '~~/stores/auth';

export const useAdmin = () => {
  const authStore = useAuthStore();
  handleGetProviders();
  const adminRoles = ERole.ADMIN;

  return adminRoles === authStore.role;
};
