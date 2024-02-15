import { useUser } from '~~/composables/auth/useUser';
import { useEmployer } from '~~/composables/auth/useEmployer';
import { useAdmin } from '~~/composables/auth/useAdmin';

export default defineNuxtRouteMiddleware(() => {
  if (!process.client) return;
  const cookieSessionAuth = useCookie('auth.session-token').value;
  if (cookieSessionAuth) {
    const isUser = useUser();
    const isEmployer = useEmployer();
    const isAdmin = useAdmin();
    if (isUser)
      setTimeout(() => {
        return navigateTo('/user');
      });

    if (isEmployer)
      setTimeout(() => {
        return navigateTo('/employer');
      });
    if (isAdmin)
      setTimeout(() => {
        return navigateTo('/admin');
      });
  }
  // eslint-disable-next-line no-useless-return
  return;
});
